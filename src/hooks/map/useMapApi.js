import { useQuery } from '@tanstack/react-query';
import { getMapMarkers, getNearbyToilets, getEmergencyToilets } from '@/apis/map/mapApi';

/**
 * 화장실 마커 데이터를 조회하는 useQuery 훅
 */
export const useMapMarkers = (filters = {}) => {
  return useQuery({
    queryKey: ['mapMarkers', filters],
    queryFn: () => getMapMarkers(filters),
    staleTime: 5 * 60 * 1000, // 5분
    select: (data) => data.data?.markers || [], // 실제 마커 배열만 선택하여 반환
    onError: (error) => {
      console.error('마커 데이터 조회 실패:', error);
    },
  });
};

/**
 * 가까운 화장실 목록을 조회하는 useQuery 훅 (홈 페이지용)
 */
export const useNearbyToilets = (params = {}) => {
  return useQuery({
    queryKey: ['nearbyToilets', params],
    queryFn: () => getNearbyToilets(params),
    staleTime: 3 * 60 * 1000, // 3분
    select: (data) => data.data?.toilets || [], // 실제 화장실 배열만 선택하여 반환
    onError: (error) => {
      console.error('가까운 화장실 조회 실패:', error);
    },
  });
};

/**
 * 긴급 찾기 - 가장 가까운 화장실 목록을 조회하는 useQuery 훅
 */
export const useEmergencyToilets = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['emergencyToilets', params],
    queryFn: () => getEmergencyToilets(params),
    staleTime: 2 * 60 * 1000, // 2분 (긴급용이므로 더 자주 갱신)
    select: (data) => data.data?.toilets || [], // 실제 화장실 배열만 선택하여 반환
    onError: (error) => {
      console.error('긴급 화장실 조회 실패:', error);
    },
    ...options, // 추가 옵션 (enabled 등)
  });
};