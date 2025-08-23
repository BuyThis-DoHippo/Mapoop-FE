import { useEffect, useRef, useState } from 'react';
import { useEmergencyToilets } from '@/hooks/map/useMapApi';

export default function MapContainer({ coords }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isMapReady, setIsMapReady] = useState(false);

  // 긴급 화장실 데이터 조회
  const params = coords ? {
    lat: coords.lat,
    lng: coords.lng
  } : null;

  const { data: toilets = [] } = useEmergencyToilets(params || {}, {
    enabled: !!params,
  });

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

      // 사용자 위치가 있으면 해당 위치로, 없으면 홍대입구역으로
      const center = coords 
        ? new window.kakao.maps.LatLng(coords.lat, coords.lng)
        : new window.kakao.maps.LatLng(37.5563, 126.9236);

      const options = {
        center: center,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;
      setIsMapReady(true);
      console.log('긴급 찾기 카카오맵 초기화 완료');

      // 사용자 위치 마커 추가
      if (coords) {
        addUserLocationMarker(map, coords);
      }
    }
  }, [coords]);

  // 사용자 위치 마커 추가
  const addUserLocationMarker = (map, location) => {
    const userPosition = new window.kakao.maps.LatLng(location.lat, location.lng);
    
    // 사용자 위치 마커 (빨간색, 크기 키움)
    const userMarker = new window.kakao.maps.Marker({
      position: userPosition,
      title: '현재 위치',
      image: new window.kakao.maps.MarkerImage(
        'data:image/svg+xml;base64,' + btoa(`
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="12" fill="#FF4444" stroke="white" stroke-width="3"/>
            <circle cx="18" cy="18" r="5" fill="white"/>
          </svg>
        `),
        new window.kakao.maps.Size(36, 36),
        { offset: new window.kakao.maps.Point(18, 18) }
      )
    });

    userMarker.setMap(map);
  };

  // 화장실 마커 업데이트
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !toilets || toilets.length === 0) return;

    // 기존 마커들 제거 (사용자 위치 마커 제외)
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // 화장실 마커들 추가
    toilets.forEach((toilet, index) => {
      try {
        const position = new window.kakao.maps.LatLng(
          toilet.latitude, 
          toilet.longitude
        );

        // 화장실 마커 생성 (긴급 찾기용 - 순서 표시)
        const marker = new window.kakao.maps.Marker({
          position: position,
          title: toilet.name,
          image: new window.kakao.maps.MarkerImage(
            'data:image/svg+xml;base64,' + btoa(`
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 40 16 40S32 28 32 16C32 7.16 24.84 0 16 0Z" fill="${toilet.type === 'PUBLIC' ? '#1FC37A' : '#FFB005'}"/>
                <circle cx="16" cy="16" r="8" fill="white"/>
                <text x="16" y="20" text-anchor="middle" font-size="10" font-weight="bold" fill="${toilet.type === 'PUBLIC' ? '#1FC37A' : '#FFB005'}">${index + 1}</text>
              </svg>
            `),
            new window.kakao.maps.Size(32, 40),
            { offset: new window.kakao.maps.Point(16, 40) }
          )
        });

        // 지도에 마커 표시
        marker.setMap(mapRef.current);
        markersRef.current.push(marker);

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="padding:10px; width:220px;">
              <h4 style="margin:0 0 5px 0; font-weight:bold; color:#333;">${index + 1}. ${toilet.name}</h4>
              <p style="margin:0 0 3px 0; font-size:12px; color:#666;">${toilet.address || '주소 정보 없음'}</p>
              <div style="display:flex; align-items:center; gap:8px; margin:5px 0;">
                <span style="color:#0085B7; font-weight:bold;">★ ${toilet.rating || 0}</span>
                <span style="background:#${toilet.type === 'PUBLIC' ? '1FC37A' : 'FFB005'}; color:white; padding:2px 6px; border-radius:10px; font-size:11px;">
                  ${toilet.type === 'PUBLIC' ? '공공' : '민간'}
                </span>
              </div>
              ${toilet.distance ? `<p style="margin:2px 0 0 0; font-size:11px; color:#888;">거리: ${toilet.distance}m</p>` : ''}
              ${toilet.isOpenNow !== undefined ? 
                `<p style="margin:2px 0 0 0; font-size:11px; color:${toilet.isOpenNow ? '#22C55E' : '#EF4444'};">
                  ${toilet.isOpenNow ? '운영 중' : '운영 종료'}
                </p>` : ''}
            </div>
          `
        });

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(mapRef.current, marker);
        });

        // 마커 더블클릭 시 상세 페이지 이동
        window.kakao.maps.event.addListener(marker, 'dblclick', () => {
          window.location.href = `/toilet-detail/${toilet.toiletId}`;
        });

      } catch (error) {
        console.error('마커 생성 실패:', error, toilet);
      }
    });

    console.log(`긴급 찾기: ${toilets.length}개의 화장실 마커가 표시되었습니다.`);
  }, [isMapReady, toilets]);

  return (
    <div className="relative w-[795px] h-[1282px]">
      <div id="map" className="w-full h-full">
        {/* 카카오맵 스크립트로 로드되는 부분 */}
      </div>
      
      {/* 긴급 찾기 안내 */}
      <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg px-4 py-3 max-w-[200px]">
        <div className="text-sm">
          <h4 className="font-bold text-red-600 mb-2">긴급 찾기</h4>
          <p className="text-gray-700 text-xs mb-2">가장 가까운 화장실 {toilets.length}개</p>
          <div className="text-xs text-gray-500">
            <p>🔴 현재 위치</p>
            <p>📍 화장실 (번호순)</p>
          </div>
        </div>
      </div>

      {/* 로딩 상태 */}
      {!coords && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-main border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600">위치를 확인하는 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}