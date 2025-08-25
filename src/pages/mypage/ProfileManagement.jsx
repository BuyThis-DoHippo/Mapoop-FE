import UserProfile from '@/components/mypage/UserProfile';
import { useMyProfile } from '@/hooks/mypage/useProfileApi';
import { useQuery } from '@tanstack/react-query';
import { getMyToilets, getUserReviews } from '@/apis/mypage/profileApi';

const ProfileManagement = () => {
  const { data: profileData, isLoading, isError } = useMyProfile();

  // 내 화장실 목록 조회
  const {
    data: toiletData,
    isLoading: toiletLoading,
    isError: toiletError,
  } = useQuery({
    queryKey: ['myToilets'],
    queryFn: getMyToilets,
  });

  const profile = profileData?.data;
  const toiletCount = toiletData?.data?.totalCount || 0;

  // 내가 작성한 리뷰 개수 조회 (profile이 있어야 실행)
  const {
    data: reviewData,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useQuery({
    queryKey: ['userReviews', profile?.id],
    queryFn: () => getUserReviews(profile?.id, 1, 1),
    enabled: !!profile?.id,
  });

  // 상태 처리
  if (isLoading || toiletLoading || reviewLoading) {
    return <p>로딩 중...</p>;
  }
  if (isError || toiletError || reviewError) {
    return <p>내 정보 불러오기 실패</p>;
  }

  const reviewCount = reviewData?.data?.totalElements || 0;

  return (
    <div className="w-full">
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">
        프로필 관리
      </h2>

      <UserProfile
        name={profile?.name}
        reviewCount={reviewCount}
        toiletCount={toiletCount}
      />

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

            {/* 로그인 정보 */}
            <tr>
              <td className="bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                로그인 정보
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">
                {profile?.kakaoId
                  ? `카카오 로그인 (${profile?.email})`
                  : `구글 로그인 (${profile?.email})`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileManagement;
