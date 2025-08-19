import PictureIcon from '@/assets/svg/review/picture.svg?react';

const ImageUpload = ({ uploadedImages, onImageUpload }) => {
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
        {uploadedImages.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-5">
            {uploadedImages.map(image => (
              <div key={image.id} className="w-[100px] h-[100px] rounded-[10px] overflow-hidden">
                <img 
                  src={image.url} 
                  alt="uploaded" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-[104px] h-[104px] rounded-[10px] flex items-center justify-center">
              <PictureIcon className="w-[104px] h-[104px]" />
            </div>
            <span className="text-heading3-regular text-gray-2">사진 추가하기</span>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUpload;