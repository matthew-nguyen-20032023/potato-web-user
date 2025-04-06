import { useEffect, useState } from "react";
import { FaAngleUp, FaAngleDown, FaCheck } from "react-icons/fa";

const SingleSelect = ({
  title,
  options,
  onChange,
  value,
}: {
  title: string;
  options: { value: string; label: string; id: number }[];
  onChange: (selectedValue: number) => void;
  value?: string;
}) => {
  const [selected, setSelected] = useState<string>(title);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (value) {
      const option = options.find((option) => option.value === value);
      if (option) toggleOption(option);
    }
  }, [value]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const toggleOption = (option: { value: string; id: number }) => {
    setSelected(option.value);
    onChange(option.id);
    toggleDropdown();
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full secondary-color">
      {/* Button */}
      <button
        type="button"
        className="relative py-3 ps-4 pe-9 flex gap-x-2 w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-md"
        onClick={toggleDropdown}
      >
        <span>{selected ? selected : title}</span>
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          {isOpen ? (
            <FaAngleUp size={16} className="text-gray-500" />
          ) : (
            <FaAngleDown size={16} className="text-gray-500" />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute z-10 left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-t-lg w-full p-2 border-b border-gray-200 outline-none text-md bg-white"
        />

        {/* Options List */}
        <div className="max-h-48 overflow-y-auto scroll-container">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="py-2 px-4 flex justify-between items-center text-md secondary-color cursor-pointer hover:bg-gray-100"
                onClick={() => toggleOption(option)}
              >
                <span>{option.label}</span>
                {selected.includes(option.value) && (
                  <FaCheck size={14} className="text-green-600" />
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 px-4 py-2">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleSelect;
