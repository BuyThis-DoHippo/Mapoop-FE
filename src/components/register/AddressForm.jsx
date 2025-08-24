const AddressForm = ({ formData, onInputChange }) => {
  return (
    <div className="flex flex-col items-start gap-8 p-10 self-stretch rounded-[10px] border border-gray-2 bg-white">
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

      <div className="w-full">
        <div className="text-body1 text-gray-8 mb-4">세부주소</div>
        <input
          type="text"
          value={formData.detailAddress}
          onChange={(e) => onInputChange('detailAddress', e.target.value)}
          placeholder="층수, 호수를 입력해주세요"
          className="w-full h-[54px] px-6 py-4 rounded-[10px] border border-gray-3 bg-white text-body2 placeholder-gray-4 outline-none focus:border-main transition-colors"
        />
      </div>
    </div>
  );
};

export default AddressForm;