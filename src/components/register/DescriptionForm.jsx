const DescriptionForm = ({ formData, onInputChange, onImageRemove }) => {
  return (
    <>
      {/* 장소 설명 입력 */}
      <div className={`bg-gray-0 rounded-[10px] relative ${
        formData.images.length > 0 ? 'h-[556px]' : 'h-[270px]'
      }`}>
        {/* Textarea */}
        <textarea
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="장소 설명을 작성해주세요"
          className={`w-full bg-transparent border-none outline-none px-4 lg:px-[61px] resize-none text-heading3-regular text-gray-10 placeholder-gray-2 ${
            formData.images.length > 0 ? 'pt-[33px] pb-4 flex-shrink-0 h-[260px]' : 'h-full pt-[33px] pb-[33px]'
          }`}
        />
        
        {/* 업로드된 이미지들 */}
        {formData.images.length > 0 && (
        <div className="flex-1 pl-5 pr-4 absolute bottom-[33px] flex flex-wrap gap-4 overflow-auto">
          {formData.images.map(image => (
            <div key={image.imageId} className="relative">
              <div className="w-[208px] h-[245px] rounded-[10px] overflow-hidden">
                <img 
                  src={image.url} 
                  alt="uploaded" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* X 버튼 */}
              <button
                onClick={() => onImageRemove(image.imageId)}
                className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white text-sm hover:bg-opacity-70 transition-opacity"
              >
                ×
              </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 특수사항 입력 */}
      <div className="bg-gray-0 rounded-[10px]">
        <textarea
          value={formData.specialNotes}
          onChange={(e) => onInputChange('specialNotes', e.target.value)}
          placeholder="화장실 특수사항을 작성해주세요(비밀번호, 기타사항)"
          className="w-full h-[96px] bg-transparent border-none outline-none px-4 lg:px-[61px] py-[33px] resize-none text-heading3-regular text-gray-10 placeholder-gray-2"
        />
      </div>
    </>
  );
};

export default DescriptionForm;