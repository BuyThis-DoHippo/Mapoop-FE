import ToiletCard from '@/components/mypage/ToiletCard';
import { useMyToilets } from '@/hooks/mypage/useToiletApi';

const ToiletManagement = () => {
  const { data, isLoading, isError } = useMyToilets();

  if (isLoading) return <p>내 화장실 불러오는 중...</p>;
  if (isError) return <p>내 화장실 불러오기 실패</p>;

  const toilets = data?.data?.toilets || [];

  return (
    <div className="w-full">
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">
        등록한 화장실 관리
      </h2>

      <div className="divide-y divide-gray-2 border-t border-b border-gray-2">
        {toilets.length > 0 ? (
          toilets.map((toilet) => (
            <ToiletCard key={toilet.id} toilet={toilet} onSave={() => {}} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-heading3-regular text-gray-5 mb-4">
              등록한 화장실이 없습니다.
            </p>
            <p className="text-body1 text-gray-5">
              첫 번째 화장실을 등록해보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToiletManagement;
