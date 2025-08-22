import Picture from '@/assets/svg/review/picture.svg?react';

const ImageUpload = ({ onImageUpload }) => {
  return (
    <div className="h-[270px] bg-gray-0 rounded-[10px] cursor-pointer">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
        id="toilet-image-upload"
      />
      <label htmlFor="toilet-image-upload" className="w-full h-full flex items-center justify-center cursor-pointer">
        <div className="flex flex-col items-center gap-4">
          <Picture/>
          <span className="text-body1 text-gray-2">사진 추가하기</span>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;