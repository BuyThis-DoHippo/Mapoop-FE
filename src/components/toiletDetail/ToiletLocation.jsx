import { useEffect, useRef, useState } from 'react';
import ToiletMarker from '@/assets/svg/toilet-marker.svg?react';

const ToiletLocation = ({ toilet }) => {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // 카카오맵 초기화
  useEffect(() => {
    if (!toilet?.location?.latitude || !toilet?.location?.longitude) return;

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

    script.onload = () => {
      window.kakao.maps.load(initMap);
    };

    document.head.appendChild(script);

    function initMap() {
      const container = document.getElementById('toilet-detail-map');
      if (!container) return;

      const center = new window.kakao.maps.LatLng(
        toilet.location.latitude,
        toilet.location.longitude
      );

      const options = {
        center: center,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;
      setIsMapReady(true);
      
      addToiletMarker(map, toilet);
    }
  }, [toilet]);

  // 화장실 마커 추가
  const addToiletMarker = (map, toiletData) => {
    const position = new window.kakao.maps.LatLng(
      toiletData.location.latitude,
      toiletData.location.longitude
    );

    const markerContent = document.createElement('div');
    markerContent.style.cssText = `
      position: relative;
      width: 48.308px;
      height: 48.308px;
      transform: rotate(45deg);
      border-radius: 140px 140px 0 140px;
      border: 3px solid ${toiletData.type === 'PUBLIC' ? '#36C239' : '#FF7B00'};
      background: ${toiletData.type === 'PUBLIC' ? '#36C239' : '#FFB005'};
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

    customMarker.setMap(map);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding:10px; width:200px;">
          <h4 style="margin:0 0 5px 0; font-weight:bold;">${toiletData.name}</h4>
          <p style="margin:0; font-size:12px; color:#666;">${toiletData.location.address}</p>
          <p style="margin:5px 0 0 0; font-size:12px;">
            <span style="color:#0085B7;">★ ${toiletData.rating.avg_rating}</span>
            <span style="margin-left:10px; background:#${toiletData.type === 'PUBLIC' ? '36C239' : 'FFB005'}; color:white; padding:2px 6px; border-radius:10px; font-size:11px;">
              ${toiletData.type === 'PUBLIC' ? '공공' : '민간'}
            </span>
          </p>
        </div>
      `
    });

    markerContent.addEventListener('click', () => {
      infowindow.open(map, customMarker);
    });
  };

  if (!toilet) return null;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading3-bold text-black">화장실 위치</h2>
      <div className="w-[992px] h-[334px] flex gap-10">
        <div className="w-[682px] h-[334px] relative bg-gray-1 rounded-[10px] border border-gray-2 overflow-hidden">
          <div id="toilet-detail-map" className="w-full h-full">
          </div>
          {!isMapReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-heading3-regular text-gray-5">지도 로딩 중...</div>
            </div>
          )}
        </div>
        <div className="w-[300px] h-[334px] flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-body1-bold text-black">주소</h3>
            <div className="flex flex-col gap-2">
              <p className="text-body1 text-black">{toilet.location.address}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-body1-bold text-black">장소 설명</h3>
            <p className="text-body1 text-black">{toilet.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-body1-bold text-black">화장실 태그</h3>
            <div className="flex gap-4 flex-wrap">
              {toilet.tags.map((tag, index) => (
                <div key={index} className="px-6 py-2 bg-gray-0 rounded-[50px] flex items-center">
                  <span className="text-body2 text-gray-8">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToiletLocation;