import { useQuery } from '@tanstack/react-query';
import {
  fetchBySingleTag,
  fetchByMultiTags,
  fetchSearchResults,
  fetchNearbyToilets,
  fetchAutoComplete,
} from '@/apis/store/storeApi';

// 단일 태그
export const useSingleTag = (tag, options = {}) =>
  useQuery({
    queryKey: ['singleTag', tag],
    queryFn: () => fetchBySingleTag(tag),
    enabled: !!tag,
    ...options,
  });

// 다중 태그
export const useMultiTags = (tags = [], options = {}) =>
  useQuery({
    queryKey: ['multiTags', tags],
    queryFn: () => fetchByMultiTags(tags),
    enabled: tags.length > 0,
    ...options,
  });

// 검색 결과
export const useSearchResults = (params, options = {}) =>
  useQuery({
    queryKey: ['searchResults', params],
    queryFn: () => fetchSearchResults(params),
    enabled: !!params,
    ...options,
  });

// 근처 화장실
export const useNearbyToilets = (coords, options = {}) =>
  useQuery({
    queryKey: ['nearbyToilets', coords],
    queryFn: () => fetchNearbyToilets(coords),
    enabled: !!coords?.lat && !!coords?.lng,
    ...options,
  });

// 자동완성
export const useAutoComplete = (keyword, limit = 8, options = {}) =>
  useQuery({
    queryKey: ['autoComplete', keyword],
    queryFn: () => fetchAutoComplete({ keyword, limit }),
    enabled: !!keyword,
    ...options,
  });
