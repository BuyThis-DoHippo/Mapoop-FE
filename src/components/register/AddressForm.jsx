const AddressForm = ({ formData, onInputChange }) => {
  return (
    <div className="flex flex-col items-start gap-8 p-10 self-stretch rounded-[10px] border border-gray-2 bg-white">
      {/* 주소 입력 */}
      <div className="flex flex-col gap-4 w-full">
        <div className="text-body1 text-gray-10">주소 등록</div>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="주소를 입력해주세요"
          className="w-full h-[54px] px-6 py-4 rounded-[10px] border border-gray-3 bg-white text-body2 placeholder-gray-4 outline-none focus:border-main transition-colors"
        />
      </div>

      {/* 층수, 호수 입력 */}
      <div className="w-full">
        <div className="text-body1 text-gray-8 mb-4">층수</div>
        <input
          type="text"
          value={formData.floor ?? ''}
          onChange={(e) => onInputChange('floor', e.target.value)}
          placeholder="층수를 입력해주세요 (예: 1, B1)"
          className="w-full h-[54px] px-6 py-4 rounded-[10px] border border-gray-3 bg-white text-body2 placeholder-gray-4 outline-none focus:border-main transition-colors"
        />
      </div>
    </div>
  );
};

export default AddressForm;
