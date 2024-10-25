// src/components/SelectField.js

// const SelectField = ({ label, options, ...props }) => {
//   return (
//     <div className="mb-4">
//       <label className="block mb-1">{label}</label>
//       <select className="border rounded p-2 w-full" {...props}>
//         <option value="">Select...</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SelectField;
import React, { forwardRef } from 'react';

const SelectField = forwardRef(({ label, options, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
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

