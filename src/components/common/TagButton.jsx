const TagButton = ({ 
  children, 
  isSelected = false, 
  onClick, 
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-[37px] py-2 rounded-full border transition-colors ${
        isSelected
          ? 'bg-main text-white border-main'
          : 'bg-white text-gray-5 border-gray-5'
      } ${className}`}
    >
      <span className="text-body1">{children}</span>
    </button>
  );
};

export default TagButton;