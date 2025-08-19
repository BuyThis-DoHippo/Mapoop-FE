// components/review/ReviewForm.jsx
import ImageUpload from './ImageUpload';

const ReviewForm = ({ 
  title, 
  content, 
  uploadedImages,
  onTitleChange, 
  onContentChange, 
  onImageUpload 
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
      <div className="h-[270px] bg-gray-0 rounded-[10px] flex items-start">
        <textarea
          value={content}
          onChange={(e) => onContentChange && onContentChange(e.target.value)}
          placeholder="리뷰 내용을 작성해주세요"
          className="w-full h-full bg-transparent border-none outline-none px-[63px] pt-[33px] pb-[33px] resize-none text-heading3-regular text-gray-10 placeholder-gray-2"
        />
      </div>

      {/* Image Upload */}
      <ImageUpload 
        uploadedImages={uploadedImages}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default ReviewForm;