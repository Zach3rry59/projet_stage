import { Field, ErrorMessage } from "formik";
import { useState } from "react";

const SearchableSelect = ({
  name,
  label,
  options,
  searchPlaceholder,
  optionPlaceholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = [
    { label: "Aucun", value: "" },
    ...(options &&
      options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(searchTerm.toLowerCase())
      )),
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">{label}</label>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={searchPlaceholder}
        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      />
      <Field
        as="select"
        name={name}
        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      >
        <option value="" disabled>
          {optionPlaceholder}
        </option>
        {filteredOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export default SearchableSelect;
