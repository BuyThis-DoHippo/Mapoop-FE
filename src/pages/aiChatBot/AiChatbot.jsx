import { useEffect, useState } from 'react';
import ChatbotToilet from '@/assets/svg/chatbotToilet.svg?react';
import {
  askChatbot,
  getChatHistory,
  deleteChat,
} from '@/apis/chatbot/chatbotApi';

export default function AiChatbot({ onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '안녕하세요 마포구 화장실 안내 서비스 Mapoop의 챗봇입니다.',
    },
    { sender: 'bot', text: '어떤 서비스를 도와드릴까요?' },
  ]);

  // 대화 내역 조회
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log('[Chatbot] 대화 내역 조회 요청...');
        const res = await getChatHistory(1, 20);

        if (res.data?.statusCode === 200) {
          const conversations = res.data.data.conversations || [];
          if (conversations.length > 0) {
            const history = conversations.flatMap((c) => [
              { id: c.id, sender: 'user', text: c.question },
              { id: c.id, sender: 'bot', text: c.answer },
            ]);
            // 웰컴 메시지 유지 + history 이어붙이기
            setMessages((prev) => [...prev, ...history]);
          }
        } else {
          console.warn('[Chatbot] 대화 내역 조회 실패:', res.data);
        }
      } catch (err) {
        console.error('[Chatbot] 대화 내역 조회 에러:', err);
      }
    };
    fetchHistory();
  }, []);

  // 질문하기 (수정됨)
  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');

    try {
      const res = await askChatbot(userText);
      if (res.data?.statusCode === 200) {
        const { id, answer } = res.data.data;
        setMessages((prev) => [
          ...prev,
          { id, sender: 'user', text: userText },
          { id, sender: 'bot', text: answer },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: `오류: ${res.data?.message || '알 수 없는 오류'}`,
          },
        ]);
      }
    } catch (err) {
      console.error('[Chatbot] 질문 에러:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '서버와 연결할 수 없어요.' },
      ]);
    }
  };

  // 삭제
  const handleDelete = async (chatId) => {
    try {
      const res = await deleteChat(chatId);
      if (res.data?.statusCode === 200) {
        setMessages((prev) => prev.filter((m) => m.id !== chatId));
      } else {
        console.warn('[Chatbot] 삭제 실패:', res.data);
      }
    } catch (err) {
      console.error('[Chatbot] 삭제 에러:', err);
    }
  };

  // 칩 버튼 클릭
  const handleChipClick = (text) => {
    setInput(text);
    handleSend();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[rgba(0,0,0,0.3)] font-pretendard"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[649px] h-screen bg-white shadow-[-11px_4px_18px_rgba(0,0,0,0.25)] 
                    rounded-tl-[20px] rounded-br-[20px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <header className="flex items-center justify-center w-full h-[60px] md:h-[81px] bg-gray-0 relative">
          <h1 className="text-heading3-regular text-main-2">MAPOOP 챗봇</h1>
        </header>

        {/* 대화 영역 */}
        <div className="flex-1 px-4 py-4 md:px-6 md:py-6 overflow-y-auto space-y-6 scrollbar-hide">
          {messages.map((msg, i) =>
            msg.sender === 'bot' ? (
              <div key={i} className="flex items-start gap-2">
                <ChatbotToilet className="w-9 h-9 md:w-[46px] md:h-[46px] rounded-full bg-main p-2 shrink-0" />
                <div className="max-w-[80%] md:max-w-[420px]">
                  <p className="text-sm md:text-body2-bold text-gray-9 mb-1 md:mb-2">
                    MAPOOP 챗봇
                  </p>
                  <div className="bg-main-2 text-white text-sm md:text-body2 px-4 py-3 md:px-6 md:py-4 rounded-[20px_20px_20px_0] break-words">
                    {msg.text}
                  </div>

                  {/* 두 번째 bot 메시지 밑에 칩 버튼 */}
                  {i === 1 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <button
                        onClick={() =>
                          handleChipClick('가장 가까운 화장실을 찾아줘')
                        }
                        className="px-4 md:px-8 py-2 border border-main-2 rounded-full 
                                   text-main-2 text-sm md:text-body2 bg-white hover:bg-main-3"
                      >
                        가장 가까운 화장실
                      </button>
                      <button
                        onClick={() =>
                          handleChipClick('가장 평점 좋은 화장실 알려줘')
                        }
                        className="px-4 md:px-8 py-2 border border-main-2 rounded-full 
                                   text-main-2 text-sm md:text-body2 bg-white hover:bg-main-3"
                      >
                        가장 평점 좋은 화장실
                      </button>
                    </div>
                  )}

                  {/* 삭제 버튼 (API 응답 메시지일 때만) */}
                  {msg.id && (
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="mt-2 text-xs text-red-500 hover:underline"
                    >
                      이 대화 삭제
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div className="bg-gray-1 text-gray-6 text-sm md:text-body2 px-4 md:px-6 py-2 md:py-3 rounded-[20px_20px_0_20px] max-w-[70%] md:max-w-[300px] break-words">
                  {msg.text}
                </div>
              </div>
            )
          )}
        </div>

        {/* 입력 영역 */}
        <div className="flex items-center w-full px-4 pb-5 gap-3 md:px-[40px] md:pb-[37px] md:gap-[24px]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="내용을 입력해주세요"
            className="flex-1 h-12 md:h-[62px] px-4 md:px-[27px] rounded-[10px] 
                       bg-main-3 text-gray-6 text-sm md:text-body2 outline-none break-words"
          />
          <button
            onClick={handleSend}
            className="shrink-0 w-[90px] h-12 md:w-[134px] md:h-[62px] rounded-[10px] 
                       bg-main text-white text-sm md:text-body2-bold flex items-center justify-center"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
