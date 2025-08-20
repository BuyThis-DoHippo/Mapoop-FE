import { useState } from 'react';
import ChatbotToilet from '@/assets/svg/chatbotToilet.svg?react';

export default function AiChatbot({ onClose }) {
  const [input, setInput] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[rgba(0,0,0,0.3)]">
      {/* 메인 대화창 */}
      <div className="w-[649px] h-screen bg-white shadow-[-11px_4px_18px_rgba(0,0,0,0.25)] rounded-tl-[20px] rounded-br-[20px] flex flex-col">
        {/* 헤더 */}
        <header className="flex items-center justify-center w-full h-[81px] bg-[#EFEFEF] relative">
          <h1 className="text-[24px] font-normal leading-[36px] text-[#0085B7]">
            MAPOOP 챗봇
          </h1>
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </header>

        {/* 대화 영역 */}
        <div className="flex-1 px-6 py-6 overflow-y-auto space-y-6">
          {/* 챗봇 메시지 */}
          <div className="flex items-start gap-2">
            <ChatbotToilet className="w-[46px] h-[46px] rounded-full bg-[#00AEEF] p-2" />
            <div>
              <p className="text-[16px] font-bold text-black mb-2">
                MAPOOP 챗봇
              </p>
              <div className="flex flex-col gap-[16px]">
                {/* 첫 번째 박스 */}
                <div className="bg-[#0085B7] text-white text-[16px] px-6 py-4 rounded-[20px_20px_20px_0] max-w-[420px]">
                  안녕하세요 마포구 화장실 안내 서비스 Mapoop의 챗봇입니다.
                </div>

                {/* 두 번째 박스 */}
                <div className="bg-[#0085B7] text-white text-[16px] px-6 py-4 rounded-[20px_20px_20px_0] max-w-[420px]">
                  어떤 서비스를 도와드릴까요?
                </div>
              </div>

              {/* 칩 버튼 */}
              <div className="flex gap-[15px] mt-3">
                <button className="px-8 py-2 border border-[#0085B7] rounded-full text-[#0085B7] text-[16px] bg-white hover:bg-[#EBFAFF]">
                  가장 가까운 화장실
                </button>
                <button className="px-8 py-2 border border-[#0085B7] rounded-full text-[#0085B7] text-[16px] bg-white hover:bg-[#EBFAFF]">
                  가장 평점 좋은 화장실
                </button>
              </div>
            </div>
          </div>

          {/* 사용자 메시지 */}
          <div className="flex justify-end">
            <div className="bg-[#DBDBDB] text-[#4B4B4B] text-[16px] px-6 py-3 rounded-[20px_20px_0_20px] max-w-[300px]">
              가장 가까운 화장실
            </div>
          </div>

          {/* 챗봇 응답 */}
          <div className="flex items-start gap-2">
            <ChatbotToilet className="w-[46px] h-[46px] rounded-full bg-[#00AEEF] p-2" />
            <div>
              <p className="text-[16px] font-bold text-black mb-2">
                MAPOOP 챗봇
              </p>
              <div className="bg-[#0085B7] text-white text-[16px] px-6 py-4 rounded-[20px_20px_20px_0] max-w-[420px]">
                현재 회원님의 위치에서 제일 가까운 화장실은
                <br />
                레드로드 R6 개방화장실입니다.
                <br />
                회원님의 위치에서부터 약 230m 거리에 위치했습니다.
              </div>
            </div>
          </div>
        </div>

        {/* 입력창 (하단 고정) */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="내용을 입력해주세요"
            className="flex-1 h-[46px] rounded-[10px] bg-[#EBFAFF] px-[27px] text-[16px] text-[#4B4B4B] placeholder:text-[#4B4B4B] outline-none"
          />
          <button className="w-[134px] h-[46px] rounded-[10px] bg-[#00AEEF] text-white font-bold text-[16px]">
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
