// components/review/ReviewForm.jsx
import ImageUpload from './ImageUpload';

const ReviewForm = ({ 
  title, 
  content, 
  uploadedImages,
  onTitleChange, 
  onContentChange, 
  onImageUpload,
  onImageRemove
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title Input */}
      <div className="h-[75px] bg-gray-0 rounded-[10px] flex items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange && onTitleChange(e.target.value)}
          placeholder="제목을 작성해주세요"
          className="w-full h-full bg-transparent border-none outline-none px-[61px] text-heading3-regular text-gray-10 placeholder-gray-2"
        />
      </div>

      {/* Content Textarea */}
      <div className={`bg-gray-0 rounded-[10px] relative ${
        uploadedImages.length > 0 ? 'h-[556px]' : 'h-[270px]'
      }`}>
        {/* Textarea */}
        <textarea
          value={content}
          onChange={(e) => onContentChange && onContentChange(e.target.value)}
          placeholder="리뷰 내용을 작성해주세요"
          className={`w-full bg-transparent border-none outline-none px-[63px] resize-none text-heading3-regular text-gray-10 placeholder-gray-2 ${
            uploadedImages.length > 0 ? 'pt-[33px] pb-4 flex-shrink-0 h-[260px]' : 'h-full pt-[33px] pb-[33px]'
          }`}
        />
        
        {/* 업로드된 이미지들 */}
        {uploadedImages.length > 0 && (
          <div className="flex-1 pl-5 pr-4 absolute bottom-[33px] flex flex-wrap gap-4 overflow-auto">
            {uploadedImages.map(image => (
              <div key={image.id} className="relative">
                <div className="w-[208px] h-[245px] rounded-[10px] overflow-hidden">
                  <img 
                    src={image.url} 
                    alt="uploaded" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* X 버튼 */}
                <button
                  onClick={() => onImageRemove && onImageRemove(image.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white text-sm hover:bg-opacity-70 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Upload */}
      <ImageUpload 
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default ReviewForm;