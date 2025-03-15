/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FiChevronUp } from 'react-icons/fi';
// import { GoAlert } from 'react-icons/go';

type Props = {
  className?: string;
  options: string[];
  initialOption?: string | null;
  onSelect: (selectedOption: string) => void;
  placeholder?: string;
  searchEnabled?: boolean;
  isDisable?: boolean;
  isReset?: boolean;
  isError?: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

const SelectMulti = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    className,
    placeholder,
    options,
    initialOption,
    isOpen,
    searchEnabled = false,
    onToggle,
    onSelect,
    isDisable,
    isError,
    isReset,
  } = props;

  useEffect(() => {
    if (initialOption) setSelectedOption(initialOption);
  }, [initialOption]);

  useEffect(() => {
    if (isReset) {
      setSelectedOption(initialOption || null);
    }
  }, [isReset, initialOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    onToggle();
  };

  const handleOpen = () => {
    if (!isDisable) {
      onToggle();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter(
    (option) => option.toLowerCase().startsWith(searchTerm.toLowerCase())
    /*
    option.toLowerCase().includes(searchTerm.toLowerCase())
    */
  );

  // ---

  const optionSelectedStyle = selectedOption ? 'option-selected' : '';
  const emptyStyle = filteredOptions.length ? '' : 'empty';
  const openStyle = isOpen ? 'open' : '';

  // console.log('initialOption:', initialOption);
  // console.log('options:', options);

  return (
    <div className={`default-select ${className} ${openStyle} ${emptyStyle}`}>
      {!isDisable && options.length ? (
        <>
          <div
            className={`default-select-selected ${optionSelectedStyle}`}
            onClick={handleOpen}
          >
            <span>{selectedOption || placeholder}</span>
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {isOpen && searchEnabled && (
            <div className="default-select-dropdown">
              <input
                type="text"
                className="default-select-search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          )}

          {isOpen && (
            <ul className="default-select-option-list">
              {filteredOptions.map((option) => (
                <li
                  key={option}
                  className="default-select-option-list-item"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}

          {isError && (
            // <GoAlert size={25} className="default-select-error-icon" />
            <span
              style={{
                position: 'absolute',
                left: 0,
                bottom: '-1rem',
                fontSize: 10,
                color: 'red',
              }}
              className={'error-message'}
            >
              {`${placeholder} is required`}
            </span>
          )}
        </>
      ) : (
        <span className={'default-select-selected-disable'}>
          {initialOption ? initialOption : placeholder}
        </span>
      )}
    </div>
  );
};

export default SelectMulti;
