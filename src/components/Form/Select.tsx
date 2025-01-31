/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FiChevronUp } from 'react-icons/fi';
import { GoAlert } from 'react-icons/go';

type Props = {
  className?: string;
  options: string[];
  initialOption?: string | null;
  onSelect: (selectedOption: string) => void;
  placeholder?: string;
  isDisable?: boolean;
  isReset?: boolean;
  isError?: boolean;
};

const Select = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { className, placeholder, options, initialOption } = props;
  const { onSelect, isDisable, isError, isReset } = props;

  useEffect(() => {
    if (initialOption) setSelectedOption(initialOption);
  }, [initialOption]);

  useEffect(() => {
    if (initialOption || initialOption === null) {
      setSelectedOption(initialOption);
    }
  }, [isReset]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleOpen = () => !isDisable && setIsOpen((prev) => !prev);

  // ---

  const optionSelectedStyle = selectedOption ? 'option-selected' : '';

  return (
    <div className={`default-select ${className}`}>
      {!isDisable ? (
        <>
          <div
            className={`default-select-selected ${optionSelectedStyle}`}
            onClick={handleOpen}
          >
            <span>{selectedOption || placeholder}</span>
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {isOpen && (
            <ul className={'default-select-option-list'}>
              {options.map((option) => (
                <li
                  key={option}
                  className={'default-select-option-list-item'}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
          {isError && (
            <GoAlert size={25} className={'default-select-error-icon'} />
          )}
        </>
      ) : (
        <span className={'default-select-selected-disable'}>{placeholder}</span>
      )}
    </div>
  );
};

export default Select;
