const TypeSelector = ({ formData, onInputChange }) => {
  return (
    <div className="w-full flex items-center gap-2 p-10 rounded-[10px] border border-gray-2 bg-white">
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="public"
            checked={formData.type === 'public'}
            onChange={(e) => onInputChange('type', e.target.value)}
            className="w-5 h-5 text-main"
          />
          <span className="text-body1 text-gray-10">공공</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="private"
            checked={formData.type === 'private'}
            onChange={(e) => onInputChange('type', e.target.value)}
            className="w-5 h-5 text-main"
          />
          <span className="text-body1 text-gray-10">민간</span>
        </label>
      </div>
    </div>
  );
};

export default TypeSelector;