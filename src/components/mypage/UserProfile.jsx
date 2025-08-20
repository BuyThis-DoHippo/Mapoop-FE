import ProfileIcon from '@/assets/svg/userprofile/profile.svg?react';

const UserProfile = ({ name = 'OOO', reviewCount = 3, toiletCount = 3 }) => {
  return (
    <div className="w-[888px] p-10 bg-white border border-gray-2 rounded-[10px] flex items-center gap-[64px]">
      {/* 프로필 아이콘 */}
      <ProfileIcon className="w-[85px] h-[85px] rounded-full" />

      {/* 텍스트 영역 */}
      <div>
        <h3 className="text-heading3-bold text-gray-10">{name}님의 스페이스</h3>
        <div className="flex gap-6 mt-[24px]">
          <p className="text-heading3-regular text-gray-10">
            작성한 리뷰 {reviewCount}개
          </p>
          <p className="text-heading3-regular text-gray-10">
            등록한 화장실 {toiletCount}개
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
