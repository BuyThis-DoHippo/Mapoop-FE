import UserProfile from '@/components/mypage/UserProfile';

const ProfileManagement = () => {
  return (
    <div className="w-full">
      {/* 제목 */}
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">
        프로필 관리
      </h2>

      {/* 프로필 카드 */}
      <UserProfile name="OOO" reviewCount={3} toiletCount={3} />

      {/* 회원정보 섹션 */}
      <div className="mt-[60px]">
        <h3 className="text-heading3-bold text-gray-10 mb-6">회원정보</h3>

        <table className="w-[893px] border border-gray-2">
          <tbody>
            <tr className="border-b border-gray-2">
              <td className="w-[142px] h-[48px] bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                사용자 이름
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">OOO</td>
            </tr>
            <tr className="border-b border-gray-2">
              <td className="bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                닉네임
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">동글이</td>
            </tr>
            <tr>
              <td className="bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                로그인 정보
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">
                카카오 로그인(OOOOOO@이메일주소)
              </td>
            </tr>
          </tbody>
        </table>

        {/* 프로필 수정 버튼 */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 rounded-[10px] border border-main-2 bg-main-3 text-main-2 text-body2">
            프로필 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
