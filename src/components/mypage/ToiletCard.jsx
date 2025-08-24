import ArrowIcon from '@/assets/svg/arrow.svg?react';
import { useNavigate } from 'react-router-dom';

const ToiletCard = ({ toilet }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start px-14 py-12 bg-white">
      {/* 왼쪽: 화장실 정보 */}
      <div>
        <div className="flex items-center gap-[16px] mb-2">
          <h3 className="text-heading3-bold text-gray-10">{toilet.name}</h3>
          <ArrowIcon className="w-4 h-4 text-gray-10" />
        </div>
        <p className="text-body1 text-gray-5 mb-1">{toilet.address}</p>
        <p className="text-body2 text-gray-5">등록일 {toilet.date}</p>
      </div>

      {/* 오른쪽 버튼 */}
      <button
        onClick={() => navigate(`/edit-toilet/${toilet.id}`)}
        className="px-6 py-2 rounded-[10px] border text-body2 flex items-center justify-center whitespace-nowrap
          bg-gray-0 text-gray-4 border-gray-4 hover:bg-gray-1"
      >
        수정하기
      </button>
    </div>
  );
};

export default ToiletCard;
