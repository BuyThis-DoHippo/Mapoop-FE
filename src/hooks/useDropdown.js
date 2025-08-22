import { useState, useEffect, useRef } from 'react';

export const useDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    startHour: false,
    startMinute: false,
    endHour: false,
    endMinute: false
  });

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen({
          startHour: false,
          startMinute: false,
          endHour: false,
          endMinute: false
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (timeType) => {
    setDropdownOpen(prev => {
      const newState = {
        startHour: false,
        startMinute: false,
        endHour: false,
        endMinute: false
      };
      newState[timeType] = !prev[timeType];
      return newState;
    });
  };

  const closeAllDropdowns = () => {
    setDropdownOpen({
      startHour: false,
      startMinute: false,
      endHour: false,
      endMinute: false
    });
  };

  return {
    dropdownOpen,
    dropdownRef,
    toggleDropdown,
    closeAllDropdowns
  };
};