import React from "react";

const CheckboxInput = ({ label, name, value, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      <label htmlFor={value} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
