import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/svg/arrow.svg?react';

const ToiletCard = ({ toilet }) => {
  const navigate = useNavigate();

  const handleToiletClick = () => {
    navigate(`/toilet-detail/${toilet.id}`);
  };

  return (
    <div className="flex justify-between items-start px-14 py-12 bg-white">
      {/* 왼쪽: 화장실 정보 */}
      <div>
        <button
          onClick={handleToiletClick}
          className="flex items-center gap-[16px] mb-2 text-heading3-bold text-gray-10 hover:text-main transition-colors cursor-pointer"
        >
          {toilet.name}
          <ArrowIcon className="w-4 h-4 text-gray-10" />
        </button>
        <p className="text-body1 text-gray-5 mb-1">{toilet.address}</p>
        <p className="text-body2 text-gray-5">등록일 {toilet.date}</p>
      </div>

      {/* 오른쪽: 정보 수정 버튼 */}
      <button className="px-6 py-2 rounded-[10px] border border-gray-4 bg-gray-0 text-gray-4 text-body2">
        정보 수정
      </button>
    </div>
  );
};

export default ToiletCard;
