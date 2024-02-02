import React, { useEffect, useState } from "react";

interface CheckBoxProps {
  onCheckChange: (check: string) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ onCheckChange }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    onCheckChange(isChecked ? "관광지" : "음식점");
  }, [isChecked, onCheckChange]);

  return (
    <div className="flex flex=row">
      <label className="flex items-center cursor-pointer">
        <div className="flex items-center justify-center w-6 h-6 mr-2 border border-solid rounded-full">
          {isChecked && (
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          )}
        </div>
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onChange={handleToggle}
        />
        관광지
      </label>
      <label className="flex items-center ml-6 cursor-pointer">
        <div className="flex items-center justify-center w-6 h-6 mr-2 border border-solid rounded-full">
          {!isChecked && (
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          )}
        </div>
        <input
          type="checkbox"
          className="hidden"
          checked={!isChecked}
          onChange={() => setIsChecked(false)}
        />
        음식점
      </label>
    </div>
  );
};

export default CheckBox;
