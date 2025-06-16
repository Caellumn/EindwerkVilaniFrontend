"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
}

export const CustomSelect = ({
  value,
  onChange,
  options,
  className,
  placeholder = "Selecteer...",
  disabled = false,
  error = false,
  id,
  name,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* Select button */}
      <button
        type="button"
        id={id}
        onClick={handleToggle}
        disabled={disabled}
        style={{ touchAction: "manipulation" }}
        className={cn(
          "w-full border rounded-lg px-4 py-3 text-base text-left flex items-center justify-between relative z-10 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#a5673f]",
          error
            ? "border-red-500"
            : "border-[#a5673f]/30 hover:border-[#a5673f]",
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-[#5a3d2b] cursor-pointer",
          isOpen && "border-[#a5673f] ring-2 ring-[#a5673f]",
          className
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={cn("block truncate", !selectedOption && "text-gray-500")}
        >
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200 text-[#a5673f] flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#a5673f]/30 rounded-lg shadow-lg z-[9999] max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                "w-full px-4 py-3 text-left text-base transition-colors duration-150",
                "hover:bg-[#a5673f]/10 focus:bg-[#a5673f]/10 focus:outline-none",
                option.value === value
                  ? "bg-[#a5673f]/10 text-[#a5673f] font-medium"
                  : "text-[#5a3d2b]"
              )}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
