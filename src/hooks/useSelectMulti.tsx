import { useState } from 'react';

const useSelectMulti = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleOpenDropdown = (id: string | null) => setOpenDropdownId(id);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return { openDropdownId, handleOpenDropdown, toggleDropdown };
};

export default useSelectMulti;
