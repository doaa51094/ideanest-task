
import React, { forwardRef } from 'react';

const TextField = forwardRef(({ label, inputProps,...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium pb-2">{label}</label>
      <input ref={ref} {...inputProps} {...props} className="border rounded p-2 w-full"/>
    </div>
  );
});

export default TextField;
