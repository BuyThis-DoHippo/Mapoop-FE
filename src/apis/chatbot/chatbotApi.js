import axiosInstance from '@/apis/instance';

// 질문하기
export const askChatbot = async (question) => {
  return axiosInstance.post('/api/chatbot/ask', { question });
};

// 대화 내역 조회
export const getChatHistory = async (page = 1, size = 20) => {
  return axiosInstance.get('/api/chatbot/history', { params: { page, size } });
};

// 대화 삭제
export const deleteChat = async (chatId) => {
  return axiosInstance.delete(`/api/chatbot/${chatId}`);
};
