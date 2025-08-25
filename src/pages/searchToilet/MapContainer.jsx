import { useEffect, useRef, useState } from 'react';
import { useMapMarkers, useEmergencyToilets } from '@/hooks/map/useMapApi';
import { requestLocationWithPermission } from '@/utils/locationUtils';

export default function MapContainer({
  filters = {},
  coords,
  selectedToiletId,
  onMarkerClick,
  isUrgent = false,
}) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const emergencyParams = coords ? { lat: coords.lat, lng: coords.lng } : null;
  const { data: emergencyToilets, error: emergencyError } = useEmergencyToilets(emergencyParams || {}, {
    enabled: isUrgent && !!emergencyParams,
  });

  const apiFiltersWithLocation = { ...filters, ...(userLocation && { lat: userLocation.latitude, lng: userLocation.longitude }) };
  const { data: searchMarkers, error: searchError } = useMapMarkers(apiFiltersWithLocation, {
      enabled: !isUrgent,
  });

  const markers = isUrgent ? emergencyToilets : searchMarkers;
  const error = isUrgent ? emergencyError : searchError;

  useEffect(() => {
    if (isUrgent && coords) {
        setUserLocation({ latitude: coords.lat, longitude: coords.lng });
    } else {
        requestLocationWithPermission(
          (location) => setUserLocation(location),
          (error) => console.warn('위치 조회 실패, 기본 위치 사용:', error.message)
        );
    }
  }, [coords, isUrgent]);

  const initMap = () => {
    const container = document.getElementById(isUrgent ? 'map-urgent' : 'map');
    if (!container || !window.kakao) return;

    const center = userLocation
      ? new window.kakao.maps.LatLng(userLocation.latitude, userLocation.longitude)
      : new window.kakao.maps.LatLng(37.5563, 126.9236);

    const options = { center, level: 3 };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;
    setIsMapReady(true);

    if (userLocation) {
      addUserLocationMarker(map, userLocation);
    }
    
    window.kakao.maps.event.addListener(map, 'zoom_changed', () => updateMarkersStyle());
  };
  
  const updateMarkersStyle = () => {
      if (!mapRef.current || !window.kakao) return;
      markersRef.current.forEach(markerInfo => {
          const newContent = createToiletMarkerContent(markerInfo.data);
          markerInfo.marker.setContent(newContent);
      });
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }
    // 수정된 부분: 환경 변수에서 카카오 맵 API 키를 가져옵니다.
    const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;

    const script = document.createElement('script');
    // 수정된 부분: 하드코딩된 키를 환경 변수로 교체합니다.
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(initMap);
    document.head.appendChild(script);
  }, [userLocation, isUrgent]);

  const addUserLocationMarker = (map, location) => {
    const userPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
    const pulseSvg = `
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>.pulse{animation:pulse 2s infinite;transform-origin:center;}@keyframes pulse{0%{transform:scale(0.6);opacity:1;}70%{transform:scale(1);opacity:0;}100%{transform:scale(0.6);opacity:0;}}</style>
        <circle class="pulse" cx="44" cy="44" r="40" fill="#00AEEF" fill-opacity="0.3"/>
        <circle cx="44" cy="44" r="10" fill="#00AEEF" stroke="white" stroke-width="4"/>
      </svg>`;
    const userMarker = new window.kakao.maps.CustomOverlay({ position: userPosition, content: `<div>${pulseSvg}</div>`, yAnchor: 0.5 });
    userMarker.setMap(map);
    userMarkerRef.current = userMarker;
  };
  
  const createToiletMarkerContent = (markerData) => {
    const isSelected = markerData.toiletId === selectedToiletId;
    const level = mapRef.current ? mapRef.current.getLevel() : 3;
    const baseSize = 64 - (level * 5);
    const finalSize = Math.max(28, baseSize);

    const borderColor = markerData.type === 'PUBLIC' ? '#027E00' : '#FF7B00';
    const backgroundColor = markerData.type === 'PUBLIC' ? '#36C239' : '#FFB005';

    let pulseEffect = '';
    if (isSelected) {
      pulseEffect = `
        <div style="position: absolute; width: ${finalSize * 1.8}px; height: ${finalSize * 1.8}px; border-radius: 50%; background-color: #00AEEF; animation: pulse 1.5s infinite; transform-origin: center; z-index: -1;"></div>
        <style>@keyframes pulse { 0% { transform: scale(0.8); opacity: 0.5; } 70% { transform: scale(1.2); opacity: 0; } 100% { transform: scale(0.8); opacity: 0; } }</style>
      `;
    }

    const content = document.createElement('div');
    content.style.cssText = 'position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;';
    content.innerHTML = `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: ${finalSize}px; height: ${finalSize}px;">
        ${pulseEffect}
        <div class="marker-icon" style="width: 100%; height: 100%; transform: rotate(45deg); border-radius: 50% 50% 0 50%; border: 3px solid ${borderColor}; background: ${backgroundColor}; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
          <div style="transform: rotate(-45deg); background: white; width: 50%; height: 50%; mask: url(/src/assets/svg/toilet-marker.svg) no-repeat center;"></div>
        </div>
      </div>
      ${isSelected ? `<div style="position: absolute; bottom: -50px; white-space: nowrap; background-color: rgba(0, 0, 0, 0.75); color: white; padding: 5px 10px; border-radius: 5px; font-size: 18px; font-weight: bold;">${markerData.name}</div>` : ''}
    `;
    
    content.addEventListener('click', () => onMarkerClick(markerData.toiletId));
    return content;
  };

  useEffect(updateMarkersStyle, [selectedToiletId]);
  
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !markers) return;

    markersRef.current.forEach(m => m.marker.setMap(null));
    markersRef.current = [];

    markers.forEach((markerData, index) => {
      try {
        const position = new window.kakao.maps.LatLng(markerData.latitude, markerData.longitude);
        const content = createToiletMarkerContent(markerData);
        const customMarker = new window.kakao.maps.CustomOverlay({ position, content, yAnchor: 1.4 });
        customMarker.setMap(mapRef.current);
        markersRef.current.push({ marker: customMarker, data: markerData, position, index });
      } catch (error) {
        console.error('마커 생성 실패:', error, markerData);
      }
    });
  }, [isMapReady, markers]);

  const moveToCurrentLocation = () => {
    if (mapRef.current && userLocation) {
      const currentPos = new window.kakao.maps.LatLng(userLocation.latitude, userLocation.longitude);
      mapRef.current.panTo(currentPos);
    }
  };

  if (error) {
    return <div className="w-full h-full flex items-center justify-center bg-gray-100"><p className="text-red-600">지도 데이터를 불러올 수 없습니다: {error.message}</p></div>;
  }

  return (
    <div className="relative w-full h-full">
      <div id={isUrgent ? 'map-urgent' : 'map'} className="w-full h-full" />
      <button onClick={moveToCurrentLocation} className="absolute top-10 right-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10" aria-label="현재 위치로 이동">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" /><path d="M12 2L12 5" /><path d="M22 12L19 12" /><path d="M12 22L12 19" /><path d="M2 12L5 12" /></svg>
      </button>
    </div>
  );
}