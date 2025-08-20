import { useState } from 'react';
import UserProfile from '@/components/mypage/UserProfile';

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('OOO');
  const [nickname, setNickname] = useState('동글이');
  const [loginInfo] = useState('카카오 로그인(OOOOOO@이메일주소)');

  const handleSave = () => {
    // 실제 저장 로직 (API 요청 등) 추가 가능
    console.log('저장됨:', { username, nickname });
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-heading3-bold text-gray-10 mt-[95px] mb-[47px]">
        프로필 관리
      </h2>

      <UserProfile name={username} reviewCount={3} toiletCount={3} />

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
                {isEditing ? (
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-3 rounded px-2 py-1"
                  />
                ) : (
                  username
                )}
              </td>
            </tr>

            {/* 닉네임 */}
            <tr className="border-b border-gray-2">
              <td className="bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                닉네임
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">
                {isEditing ? (
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="border border-gray-3 rounded px-2 py-1"
                  />
                ) : (
                  nickname
                )}
              </td>
            </tr>

            {/* 로그인 정보 (수정 불가) */}
            <tr>
              <td className="bg-gray-0 px-6 py-4 text-body2-bold text-gray-10">
                로그인 정보
              </td>
              <td className="px-6 py-4 text-body2 text-gray-10">{loginInfo}</td>
            </tr>
          </tbody>
        </table>

        {/* 버튼 */}
        <div className="flex justify-end mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-[10px] border border-main-2 bg-main-3 text-main-2 text-body2"
            >
              저장
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded-[10px] border border-main-2 bg-main-3 text-main-2 text-body2"
            >
              프로필 수정
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
