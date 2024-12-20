import React, { useState } from "react";
import { IconSelectArrow } from "./icons";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SelectMonth = ({ value, onChange }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const options = [
    { label: "Mes", value: "month" },
    { label: "Semana", value: "week" }
  ];

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionClick = (option: { label: string; value: string }) => {
    onChange(option.value);
    setShowMenu(false);
  };

  const getDisplay = () => {
    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : "Seleccionar";
  };

  return (
    <div className="max-h-16 w-36 relative select-none">
      <div onClick={handleInputClick} className="h-16 rounded-xl border-[3px] border-secondaryBlue-500 text-secondaryBlue-500 text-lg text-center focus-visible:border-secondaryBlue-500 font-medium flex justify-center items-center gap-2">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className={`${showMenu ? "transform rotate-180" : ""}`}>
            <IconSelectArrow size={32} color="#004784" />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="absolute bg-white border-[3px] border-secondaryBlue-500 rounded-xl h-16 w-full justify-items-center content-center">
          {options.map(option => (
            <div key={option.value} onClick={() => handleOptionClick(option)} className={`w-full text-center text-blue-500 hover:bg-blue-600 hover:text-white ${value === option.value ? "font-bold" : ""}`}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectMonth;
