import UserProfile from '@/components/mypage/UserProfile';
import { useMyProfile } from '@/hooks/mypage/useProfileApi';

const ProfileManagement = () => {
  const { data, isLoading, isError } = useMyProfile();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>내 정보 불러오기 실패</p>;

  const profile = data?.data; // API response 구조에 맞춰서

  return (
    <div className="w-full">
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">
        프로필 관리
      </h2>

      <UserProfile name={profile?.name} reviewCount={3} toiletCount={3} />

      <div className="mt-[60px]">
        <h3 className="text-heading3-bold text-gray-10 mb-6">회원정보</h3>

        <table className="w-[893px] border border-gray-2">
          <tbody>
            {/* 사용자 이름 */}
            <tr className="border-b border-gray-2">
              <td className="w-[142px] h-[48px] bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                사용자 이름
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">
                {profile?.name}
              </td>
            </tr>

            {/* 이메일 */}
            <tr className="border-b border-gray-2">
              <td className="bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                이메일
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">
                {profile?.email}
              </td>
            </tr>

            {/* 로그인 정보 (카카오/구글 등) */}
            <tr>
              <td className="bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                로그인 정보
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">
                카카오 로그인 ({profile?.email})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileManagement;
