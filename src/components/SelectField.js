
import React, { forwardRef } from 'react';

const SelectField = forwardRef(({ label, options, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium pb-2">{label}</label>
      <select ref={ref} {...props} className="border rounded p-2 w-full">
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectField;

