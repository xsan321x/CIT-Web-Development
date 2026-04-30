import { useState } from 'react';
import { CATEGORIES } from '../services/seedData';

const CategorySelect = ({ value, onChange }) => {
  const predefined = CATEGORIES.filter(c => c !== 'Custom');

  // Use local state to track whether "Custom" was explicitly selected
  // Initialize: if the loaded value is not in predefined list (and not empty), it's custom
  const [isCustomMode, setIsCustomMode] = useState(
    value !== '' && !predefined.includes(value)
  );

  const selectValue = isCustomMode ? 'Custom' : value;

  const handleSelectChange = (e) => {
    if (e.target.value === 'Custom') {
      setIsCustomMode(true);
      onChange(''); // clear so user can type
    } else {
      setIsCustomMode(false);
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectValue}
        onChange={handleSelectChange}
        className="w-full bg-slate-700/60 border border-slate-600 text-white rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
      >
        <option value="">Select a category...</option>
        {predefined.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
        <option value="Custom">✏️ Custom Category</option>
      </select>

      {isCustomMode && (
        <div className="fade-in">
          <input
            type="text"
            placeholder="Type your custom category..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
            className="w-full bg-slate-700/60 border border-indigo-500/60 text-white rounded-xl px-4 py-3 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
