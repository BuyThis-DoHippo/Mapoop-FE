import { useState } from 'react';
import ArrowIcon from '@/assets/svg/arrow.svg?react';

const ToiletCard = ({ toilet, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(toilet.name);
  const [address, setAddress] = useState(toilet.address);

  const handleSaveClick = () => {
    onSave(toilet.id, { name, address }); // 상위 업데이트
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-start px-14 py-12 bg-white">
      {/* 왼쪽: 화장실 정보 */}
      <div>
        {isEditing ? (
          <div className="flex flex-col gap-2 mb-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border border-gray-3 rounded-md text-body2 text-gray-10 w-[300px]"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-3 py-2 border border-gray-3 rounded-md text-body2 text-gray-10 w-[500px]"
            />
            <p className="text-body2 text-gray-5">등록일 {toilet.date}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-[16px] mb-2">
              <h3 className="text-heading3-bold text-gray-10">{toilet.name}</h3>
              <ArrowIcon className="w-4 h-4 text-gray-10" />
            </div>
            <p className="text-body1 text-gray-5 mb-1">{toilet.address}</p>
            <p className="text-body2 text-gray-5">등록일 {toilet.date}</p>
          </>
        )}
      </div>

      {/* 오른쪽 버튼 (수정하기 ↔ 저장하기) */}
      <button
        onClick={isEditing ? handleSaveClick : () => setIsEditing(true)}
        className={`px-6 py-2 rounded-[10px] border text-body2 flex items-center justify-center whitespace-nowrap
          ${
            isEditing
              ? 'bg-main text-white border-main hover:bg-main-2'
              : 'bg-gray-0 text-gray-4 border-gray-4 hover:bg-gray-1'
          }`}
      >
        {isEditing ? '저장하기' : '수정하기'}
      </button>
    </div>
  );
};

export default ToiletCard;
