import { useState } from 'react';
import { mockMyToilets as initialToilets } from '@/mocks/mockMyToilets';
import ToiletCard from '@/components/mypage/ToiletCard';

const ToiletManagement = () => {
  const [toilets, setToilets] = useState(initialToilets);

  // 저장 시 리스트 업데이트
  const handleSave = (id, updatedData) => {
    setToilets((prev) =>
      prev.map((toilet) =>
        toilet.id === id ? { ...toilet, ...updatedData } : toilet
      )
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">
        등록한 화장실 관리
      </h2>

      <div className="divide-y divide-gray-2 border-t border-b border-gray-2">
        {toilets.map((toilet) => (
          <ToiletCard key={toilet.id} toilet={toilet} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
};

export default ToiletManagement;
