import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  askChatbot,
  getChatHistory,
  deleteChat,
} from '@/apis/chatbot/chatbotApi';

// 대화 내역 조회 query
export const useChatHistory = (page = 1, size = 20) => {
  return useQuery({
    queryKey: ['chatHistory', page, size],
    queryFn: () => getChatHistory(page, size),
    select: (res) => res.data?.data?.conversations || [],
    staleTime: 60 * 1000,
  });
};

// 질문 mutation
export const useAskChatbot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (question) => askChatbot(question),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
    },
  });
};

// 삭제 mutation
export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatId) => deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
    },
  });
};
