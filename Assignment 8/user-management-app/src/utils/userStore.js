import axios from 'axios';

const USERS_API_URL = 'https://dummyjson.com/users';
const STORAGE_KEY = 'user-management-local-state';
const DEFAULT_LOCAL_STATE = {
  cachedUsers: [],
  addedUsers: [],
  updatedUsers: {},
  deletedUserIds: [],
  lastLocalId: 1000,
};

const normalizeId = (value) => Number(value);

const normalizeDraft = (user) => ({
  firstName: user.firstName?.trim() ?? '',
  lastName: user.lastName?.trim() ?? '',
  email: user.email?.trim() ?? '',
  phone: user.phone?.trim() ?? '',
});

const normalizeUser = (user) => ({
  id: normalizeId(user.id),
  ...normalizeDraft(user),
});

const sanitizeLocalState = (state) => ({
  cachedUsers: Array.isArray(state?.cachedUsers) ? state.cachedUsers.map(normalizeUser) : [],
  addedUsers: Array.isArray(state?.addedUsers) ? state.addedUsers.map(normalizeUser) : [],
  updatedUsers:
    state?.updatedUsers && typeof state.updatedUsers === 'object'
      ? Object.fromEntries(
          Object.entries(state.updatedUsers).map(([id, user]) => [normalizeId(id), normalizeUser({ id, ...user })]),
        )
      : {},
  deletedUserIds: Array.isArray(state?.deletedUserIds)
    ? state.deletedUserIds.map(normalizeId).filter(Number.isFinite)
    : [],
  lastLocalId: Number.isFinite(Number(state?.lastLocalId))
    ? Number(state.lastLocalId)
    : DEFAULT_LOCAL_STATE.lastLocalId,
});

const readLocalState = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCAL_STATE;
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);

    if (!rawState) {
      return DEFAULT_LOCAL_STATE;
    }

    return sanitizeLocalState(JSON.parse(rawState));
  } catch {
    return DEFAULT_LOCAL_STATE;
  }
};

const writeLocalState = (state) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeLocalState(state)));
};

const mergeUsers = (apiUsers, localState) => {
  const deletedIds = new Set(localState.deletedUserIds);

  const mergedApiUsers = apiUsers
    .map(normalizeUser)
    .filter((user) => !deletedIds.has(user.id))
    .map((user) => {
      const updatedUser = localState.updatedUsers[user.id];

      return updatedUser ? { ...user, ...updatedUser } : user;
    });

  const localUsers = localState.addedUsers.filter((user) => !deletedIds.has(user.id));

  return [...localUsers, ...mergedApiUsers];
};

const writeCachedUsers = (users, localState = readLocalState()) => {
  writeLocalState({
    ...localState,
    cachedUsers: users.map(normalizeUser),
  });
};

const upsertCachedUser = (user, localState = readLocalState()) => {
  const normalizedUser = normalizeUser(user);
  const nextCachedUsers = localState.cachedUsers.filter(
    (cachedUser) => cachedUser.id !== normalizedUser.id,
  );

  nextCachedUsers.push(normalizedUser);

  writeLocalState({
    ...localState,
    cachedUsers: nextCachedUsers,
  });
};

export async function listUsers() {
  const localState = readLocalState();
  try {
    const response = await axios.get(`${USERS_API_URL}?limit=100`);
    const apiUsers = (response.data.users ?? []).map(normalizeUser);
    writeCachedUsers(apiUsers, localState);

    return mergeUsers(apiUsers, {
      ...localState,
      cachedUsers: apiUsers,
    });
  } catch (error) {
    if (localState.cachedUsers.length > 0) {
      return mergeUsers(localState.cachedUsers, localState);
    }

    throw error;
  }
}

export async function getUser(id) {
  const numericId = normalizeId(id);
  const localState = readLocalState();

  if (localState.deletedUserIds.includes(numericId)) {
    return null;
  }

  const localUser = localState.addedUsers.find((user) => user.id === numericId);

  if (localUser) {
    return localUser;
  }

  const cachedUser = localState.cachedUsers.find((user) => user.id === numericId);

  try {
    const response = await axios.get(`${USERS_API_URL}/${numericId}`);
    const remoteUser = normalizeUser(response.data);
    const updatedUser = localState.updatedUsers[numericId];
    upsertCachedUser(remoteUser, localState);

    return updatedUser ? { ...remoteUser, ...updatedUser } : remoteUser;
  } catch (error) {
    if (cachedUser) {
      const updatedUser = localState.updatedUsers[numericId];

      return updatedUser ? { ...cachedUser, ...updatedUser } : cachedUser;
    }

    const updatedUser = localState.updatedUsers[numericId];

    if (updatedUser) {
      return updatedUser;
    }

    throw error;
  }
}

export async function createUser(userData) {
  const payload = normalizeDraft(userData);
  const localState = readLocalState();
  const nextId = localState.lastLocalId + 1;
  const createdUser = {
    id: nextId,
    ...payload,
  };

  writeLocalState({
    ...localState,
    addedUsers: [createdUser, ...localState.addedUsers],
    lastLocalId: nextId,
  });

  try {
    await axios.post(`${USERS_API_URL}/add`, payload);
  } catch {
    // The dummy API is not persistent, so the local UI stays authoritative.
  }

  return createdUser;
}

export async function updateUser(id, userData) {
  const numericId = normalizeId(id);
  const payload = normalizeDraft(userData);
  const localState = readLocalState();
  const addedUserIndex = localState.addedUsers.findIndex((user) => user.id === numericId);

  if (addedUserIndex >= 0) {
    const nextAddedUsers = [...localState.addedUsers];
    nextAddedUsers[addedUserIndex] = {
      ...nextAddedUsers[addedUserIndex],
      ...payload,
    };

    writeLocalState({
      ...localState,
      addedUsers: nextAddedUsers,
    });

    try {
      await axios.put(`${USERS_API_URL}/${numericId}`, payload);
    } catch {
      // Keep the local record updated even if the demo endpoint fails.
    }

    return nextAddedUsers[addedUserIndex];
  }

  const updatedUser = {
    ...(localState.cachedUsers.find((user) => user.id === numericId) ?? {}),
    ...(localState.updatedUsers[numericId] ?? { id: numericId }),
    ...payload,
  };

  writeLocalState({
    ...localState,
    updatedUsers: {
      ...localState.updatedUsers,
      [numericId]: updatedUser,
    },
  });

  try {
    await axios.put(`${USERS_API_URL}/${numericId}`, payload);
  } catch {
    // Keep the local record updated even if the demo endpoint fails.
  }

  return updatedUser;
}

export async function deleteUser(id) {
  const numericId = normalizeId(id);
  const localState = readLocalState();
  const wasLocalUser = localState.addedUsers.some((user) => user.id === numericId);

  const nextAddedUsers = localState.addedUsers.filter((user) => user.id !== numericId);
  const nextCachedUsers = localState.cachedUsers.filter((user) => user.id !== numericId);
  const nextUpdatedUsers = { ...localState.updatedUsers };

  delete nextUpdatedUsers[numericId];

  writeLocalState({
    ...localState,
    cachedUsers: nextCachedUsers,
    addedUsers: nextAddedUsers,
    updatedUsers: nextUpdatedUsers,
    deletedUserIds: wasLocalUser
      ? localState.deletedUserIds
      : Array.from(new Set([...localState.deletedUserIds, numericId])),
  });

  try {
    await axios.delete(`${USERS_API_URL}/${numericId}`);
  } catch {
    // Keep the local delete in place even if the demo endpoint fails.
  }
}
