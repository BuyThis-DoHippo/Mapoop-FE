import PictureIcon from '@/assets/svg/review/picture.svg?react';

const ImageUpload = ({ onImageUpload }) => {
  const handleImageChange = (event) => {
    if (onImageUpload) {
      onImageUpload(event);
    }
  };

  return (
    <div className="h-[270px] bg-gray-0 rounded-[10px] cursor-pointer">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="w-full h-full flex items-center justify-center cursor-pointer">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[104px] h-[104px] rounded-[10px] flex items-center justify-center">
            <PictureIcon className="w-[104px] h-[104px]" />
          </div>
          <span className="text-heading3-regular text-gray-2">이미지는 최대 3개까지 첨부가 가능합니다</span>
        </div>
      </label>
    </div>
  );
}

export default ImageUpload;