import { useEffect, useRef, useState } from 'react';
import { useMapMarkers } from '@/hooks/map/useMapApi';
import { getCurrentLocation, requestLocationWithPermission } from '@/utils/locationUtils';

export default function MapContainer({ filters = {} }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  
  // 위치 정보를 포함한 필터 생성
  const apiFiltersWithLocation = {
    ...filters,
    ...(userLocation && {
      lat: userLocation.latitude,
      lng: userLocation.longitude
    })
  };
  
  // API로 마커 데이터 조회
  const { data: markers, isLoading, error } = useMapMarkers(apiFiltersWithLocation);

  // 사용자 위치 가져오기
  useEffect(() => {
    requestLocationWithPermission(
      (location) => {
        setUserLocation(location);
        console.log('지도용 사용자 위치 설정:', location);
      },
      (error) => {
        console.warn('위치 조회 실패, 기본 위치 사용:', error.message);
      }
    );
  }, []);

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

      // 사용자 위치가 있으면 해당 위치로, 없으면 기본 위치(홍대입구역)로 지도 중심 설정
      const center = userLocation 
        ? new window.kakao.maps.LatLng(userLocation.latitude, userLocation.longitude)
        : new window.kakao.maps.LatLng(37.5563, 126.9236);

      const options = {
        center: center,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;
      setIsMapReady(true);
      console.log('카카오맵 초기화 완료');

      // 사용자 위치 마커 추가
      if (userLocation) {
        addUserLocationMarker(map, userLocation);
      }
    }
  }, [userLocation]);

  // 사용자 위치 마커 추가
  const addUserLocationMarker = (map, location) => {
    const userPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
    
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

  // 커스텀 화장실 마커 생성
  const createToiletMarker = (markerData, position) => {
    const markerContent = document.createElement('div');
    markerContent.style.cssText = `
      position: relative;
      width: 48.308px;
      height: 48.308px;
      transform: rotate(45deg);
      border-radius: 140px 140px 0 140px;
      border: 3px solid ${markerData.type === 'PUBLIC' ? '#36C239' : '#FF7B00'};
      background: ${markerData.type === 'PUBLIC' ? '#36C239' : '#FFB005'};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    `;
    
    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = 'transform: rotate(-45deg);';
    iconContainer.innerHTML = '<div style="width: 24px; height: 24px; background: white; mask: url(/src/assets/svg/toilet-marker.svg) no-repeat center; mask-size: contain;"></div>';
    markerContent.appendChild(iconContainer);

    const customMarker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: markerContent,
      xAnchor: 0.5,
      yAnchor: 1
    });

    // 인포윈도우 생성
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding:10px; width:200px;">
          <h4 style="margin:0 0 5px 0; font-weight:bold;">${markerData.name}</h4>
          <p style="margin:0; font-size:12px; color:#666;">${markerData.address || '주소 정보 없음'}</p>
          <p style="margin:5px 0 0 0; font-size:12px;">
            <span style="color:#0085B7;">★ ${markerData.rating || 0}</span>
            <span style="margin-left:10px; background:#${markerData.type === 'PUBLIC' ? '36C239' : 'FFB005'}; color:white; padding:2px 6px; border-radius:10px; font-size:11px;">
              ${markerData.type === 'PUBLIC' ? '공공' : '민간'}
            </span>
          </p>
          ${markerData.distance ? `<p style="margin:2px 0 0 0; font-size:11px; color:#888;">거리: ${markerData.distance}m</p>` : ''}
        </div>
      `
    });

    // 마커 클릭 이벤트
    markerContent.addEventListener('click', () => {
      infowindow.open(mapRef.current, customMarker);
    });

    // 마커 더블클릭 시 상세 페이지 이동
    markerContent.addEventListener('dblclick', () => {
      window.location.href = `/toilet-detail/${markerData.toiletId}`;
    });

    return customMarker;
  };

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

        const customMarker = createToiletMarker(markerData, position);
        customMarker.setMap(mapRef.current);
        markersRef.current.push(customMarker);

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
      
      {/* 마커 개수 및 위치 정보 표시 */}
      <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg px-3 py-2">
        <div className="text-sm text-gray-700">
          <p>화장실 {markers?.length || 0}개</p>
          {userLocation && (
            <p className="text-xs text-gray-500 mt-1">
              위치 기반 검색 중
            </p>
          )}
        </div>
      </div>
    </div>
  );
}