import { useState } from 'react';
import ToiletCard from '@/components/mypage/ToiletCard';
import { mockMyToilets } from '@/mocks/mockMyToilets';

const ToiletManagement = () => {
  const [toilets, setToilets] = useState(mockMyToilets);
  const [editingId, setEditingId] = useState(null);

  const handleSave = (id, updatedData) => {
    setToilets((prev) =>
      prev.map((toilet) =>
        toilet.id === id ? { ...toilet, ...updatedData } : toilet
      )
    );
    setEditingId(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">
        등록한 화장실 관리
      </h2>

      <div className="divide-y divide-gray-2 border-t border-b border-gray-2">
        {toilets.map((toilet) => (
          <ToiletCard
            key={toilet.id}
            toilet={toilet}
            isEditing={editingId === toilet.id}
            onEdit={() => setEditingId(toilet.id)}
            onSave={(updatedData) => handleSave(toilet.id, updatedData)}
            onCancel={() => setEditingId(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToiletManagement;
