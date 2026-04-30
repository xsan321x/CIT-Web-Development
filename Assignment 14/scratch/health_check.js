const http = require('http');

const check = (path, method = 'GET') => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5001,
      path: path,
      method: method,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data.length > 100 ? data.substring(0, 100) + '...' : data
        });
      });
    });

    req.on('error', (err) => {
      resolve({ status: 'ERROR', data: err.message });
    });

    req.end();
  });
};

async function run() {
  console.log('--- BACKEND HEALTH CHECK ---');
  const root = await check('/');
  console.log('Root (/):', root.status, root.data);

  const products = await check('/api/products?limit=100');
  console.log('Products API:', products.status, products.data);

  const users = await check('/api/users');
  console.log('Users API (Expected 401):', users.status, users.data);
}

run();
