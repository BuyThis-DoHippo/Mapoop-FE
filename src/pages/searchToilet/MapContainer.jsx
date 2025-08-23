import { useEffect, useRef, useState } from 'react';
import { useMapMarkers } from '@/hooks/map/useMapApi';

export default function MapContainer({ filters = {} }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isMapReady, setIsMapReady] = useState(false);
  
  // API로 마커 데이터 조회
  const { data: markers, isLoading, error } = useMapMarkers(filters);

  // 카카오맵 초기화
  useEffect(() => {
    // 이미 로드된 경우 다시 불러오지 않음
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    // 스크립트 태그 생성
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=211e0345de882006dea58a648ef58c88&autoload=false`;
    script.async = true;

    script.onload = () => {
      // SDK 로드 후 맵 초기화
      window.kakao.maps.load(initMap);
    };

    document.head.appendChild(script);

    function initMap() {
      const container = document.getElementById('map');
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;
      setIsMapReady(true);
      console.log('카카오맵 초기화 완료');
    }
  }, []);

  // 마커 업데이트
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !markers) return;

    // 기존 마커들 제거
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // 새 마커들 추가
    markers.forEach(markerData => {
      try {
        const position = new window.kakao.maps.LatLng(
          markerData.latitude, 
          markerData.longitude
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: position,
          title: markerData.name
        });

        // 지도에 마커 표시
        marker.setMap(mapRef.current);
        markersRef.current.push(marker);

        // 인포윈도우 생성 (클릭시 화장실 정보 표시)
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="padding:10px; width:200px;">
              <h4 style="margin:0 0 5px 0; font-weight:bold;">${markerData.name}</h4>
              <p style="margin:0; font-size:12px; color:#666;">${markerData.address || '주소 정보 없음'}</p>
              <p style="margin:5px 0 0 0; font-size:12px;">
                <span style="color:#0085B7;">★ ${markerData.rating || 0}</span>
                <span style="margin-left:10px; background:#${markerData.type === 'PUBLIC' ? '1FC37A' : 'FFB005'}; color:white; padding:2px 6px; border-radius:10px; font-size:11px;">
                  ${markerData.type === 'PUBLIC' ? '공공' : '민간'}
                </span>
              </p>
            </div>
          `
        });

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(mapRef.current, marker);
        });

      } catch (error) {
        console.error('마커 생성 실패:', error, markerData);
      }
    });

    console.log(`${markers.length}개의 마커가 표시되었습니다.`);
  }, [isMapReady, markers]);

  if (error) {
    return (
      <div className="w-[795px] h-[1282px] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-2">지도 데이터를 불러올 수 없습니다</p>
          <p className="text-sm text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[795px] h-[1282px]">
      <div id="map" className="w-full h-full">
        {/* 카카오맵 스크립트로 로드되는 부분 */}
      </div>
      
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-main border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600">화장실 정보를 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* 마커 개수 표시 */}
      {markers && (
        <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg px-3 py-2">
          <span className="text-sm text-gray-700">
            화장실 {markers.length}개
          </span>
        </div>
      )}
    </div>
  );
}