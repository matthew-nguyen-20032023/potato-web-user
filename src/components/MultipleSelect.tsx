import { useState } from "react";
import { FaAngleUp, FaAngleDown, FaCheck } from "react-icons/fa";

const MultiSelect = ({
  title,
  options,
  onChange,
  className = "",
}: {
  title: string;
  options: { value: string; label: string; id: number }[];
  onChange: (selectedValues: string) => void;
  className?: string;
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const toggleOption = (value: string) => {
    const updateSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setSelected(updateSelected);
    onChange(
      updateSelected
        .map((e) => {
          const option = options.find((o) => o.value === e);
          return option ? option.id.toString() : "";
        })
        .join(",")
    );
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={"relative w-full max-w-sm secondary-color m-1 " + className}
    >
      {/* Button */}
      <button
        type="button"
        className={
          "flex items-center gap-x-2 w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-[1.5vh] " +
          className
        }
        onClick={toggleDropdown}
      >
        <span>{selected.length > 0 ? selected.join(", ") : title}</span>
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
          className={
            "rounded-t-lg w-full p-2 border-b border-gray-200 outline-none text-[1.5vh] bg-white " +
            className
          }
        />

        {/* Options List */}
        <div className="max-h-48 overflow-y-auto scroll-container">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="py-2 px-4 flex justify-between items-center text-[1.5vh] secondary-color cursor-pointer hover:bg-gray-100"
                onClick={() => toggleOption(option.value)}
              >
                <span>{option.label}</span>
                {selected.includes(option.value) && (
                  <FaCheck size={14} className="text-green-600" />
                )}
              </div>
            ))
          ) : (
            <p className="text-[1.5vh] text-gray-500 px-4 py-2">
              No results found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
