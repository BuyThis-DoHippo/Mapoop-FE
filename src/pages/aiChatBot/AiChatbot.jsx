import { useState } from 'react';
import ChatbotToilet from '@/assets/svg/chatbotToilet.svg?react';

export default function AiChatbot({ onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '안녕하세요 마포구 화장실 안내 서비스 Mapoop의 챗봇입니다.',
    },
    { sender: 'bot', text: '어떤 서비스를 도와드릴까요?' },
  ]);

  // 사용자 입력 전송
  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      {
        sender: 'bot',
        text: '현재 회원님의 위치에서 제일 가까운 화장실은 레드로드 R6 개방화장실입니다. 회원님의 위치에서부터 약 230m 거리에 위치했습니다.',
      },
    ]);

    setInput('');
  };

  // 칩 버튼 클릭
  const handleChipClick = (text) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text },
      {
        sender: 'bot',
        text: '현재 회원님의 위치에서 제일 가까운 화장실은 레드로드 R6 개방화장실입니다. 회원님의 위치에서부터 약 230m 거리에 위치했습니다.',
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[rgba(0,0,0,0.3)]">
      {/* 메인 대화창 */}
      <div className="w-[649px] h-screen bg-white shadow-[-11px_4px_18px_rgba(0,0,0,0.25)] rounded-tl-[20px] rounded-br-[20px] flex flex-col">
        {/* 헤더 */}
        <header className="flex items-center justify-center w-full h-[81px] bg-[#EFEFEF] relative">
          <h1 className="text-[24px] font-normal leading-[36px] text-[#0085B7]">
            MAPOOP 챗봇
          </h1>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </header>

        {/* 대화 영역 */}
        <div className="flex-1 px-6 py-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) =>
            msg.sender === 'bot' ? (
              <div key={i} className="flex items-start gap-2">
                <ChatbotToilet className="w-[46px] h-[46px] rounded-full bg-[#00AEEF] p-2" />
                <div>
                  <p className="text-[16px] font-bold text-black mb-2">
                    MAPOOP 챗봇
                  </p>
                  <div className="bg-[#0085B7] text-white text-[16px] px-6 py-4 rounded-[20px_20px_20px_0] max-w-[420px]">
                    {msg.text}
                  </div>
                  {/* 두 번째 챗봇 메시지 뒤에 칩 노출 */}
                  {i === 1 && (
                    <div className="flex gap-[15px] mt-3">
                      <button
                        onClick={() => handleChipClick('가장 가까운 화장실')}
                        className="px-8 py-2 border border-[#0085B7] rounded-full text-[#0085B7] text-[16px] bg-white hover:bg-[#EBFAFF]"
                      >
                        가장 가까운 화장실
                      </button>
                      <button
                        onClick={() => handleChipClick('가장 평점 좋은 화장실')}
                        className="px-8 py-2 border border-[#0085B7] rounded-full text-[#0085B7] text-[16px] bg-white hover:bg-[#EBFAFF]"
                      >
                        가장 평점 좋은 화장실
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div className="bg-[#DBDBDB] text-[#4B4B4B] text-[16px] px-6 py-3 rounded-[20px_20px_0_20px] max-w-[300px]">
                  {msg.text}
                </div>
              </div>
            )
          )}
        </div>

        {/* 입력 영역 */}
        <div className="flex items-center w-full px-[40px] pb-[37px] gap-[24px]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="내용을 입력해주세요"
            className="w-[413px] h-[62px] px-[27px] py-[19px] rounded-[10px] 
               bg-[#EBFAFF] text-gray-700 text-[16px] outline-none"
          />

          <button
            onClick={handleSend}
            className="w-[134px] h-[62px] rounded-[10px] bg-[#00AEEF] text-white text-[16px] font-medium
               flex items-center justify-center"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
