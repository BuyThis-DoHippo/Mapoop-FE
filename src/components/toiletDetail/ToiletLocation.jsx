import { useEffect, useRef, useState } from 'react';
// 수정된 부분: 마커 SVG 파일을 직접 import합니다.
import toiletMarkerUrl from '@/assets/svg/toilet-marker.svg';

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

    const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;

    const script = document.createElement('script');
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

    const borderColor = toiletData.type === 'PUBLIC' ? '#027E00' : '#FF7B00';
    const backgroundColor =
      toiletData.type === 'PUBLIC' ? '#36C239' : '#FFB005';

    const markerContent = document.createElement('div');
    markerContent.style.cssText =
      'position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;';

    // 수정된 부분: 아이콘 div의 style 속성을 더 명확하게 수정합니다.
    markerContent.innerHTML = `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 48px; height: 48px;">
        <div class="marker-icon" style="width: 100%; height: 100%; transform: rotate(45deg); border-radius: 50% 50% 0 50%; border: 3px solid ${borderColor}; background-color: ${backgroundColor}; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
          <div style="transform: rotate(-45deg); background-color: white; width: 50%; height: 50%; mask: url(${toiletMarkerUrl}) no-repeat center / contain; -webkit-mask: url(${toiletMarkerUrl}) no-repeat center / contain;"></div>
        </div>
      </div>
    `;

    const customMarker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: markerContent,
      yAnchor: 1.4,
    });

    customMarker.setMap(map);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding:10px; width:200px;">
          <h4 style="margin:0 0 5px 0; font-weight:bold;">${toiletData.name}</h4>
          <p style="margin:0; font-size:12px; color:#666;">${toiletData.location.address}</p>
          <p style="margin:5px 0 0 0; font-size:12px;">
            <span style="color:#0085B7;">★ ${toiletData.rating.avg_rating}</span>
            <span style="margin-left:10px; background:${toiletData.type === 'PUBLIC' ? '#36C239' : '#FFB005'}; color:white; padding:2px 6px; border-radius:10px; font-size:11px;">
              ${toiletData.type === 'PUBLIC' ? '공공' : '민간'}
            </span>
          </p>
        </div>
      `,
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
          <div id="toilet-detail-map" className="w-full h-full"></div>
          {!isMapReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-heading3-regular text-gray-5">
                지도 로딩 중...
              </div>
            </div>
          )}
        </div>
        <div className="w-[300px] h-[334px] flex flex-col gap-12">
          {' '}
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
            <div className="flex flex-wrap gap-x-4 gap-y-4">
              {toilet.tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-6 py-2 bg-gray-0 rounded-[50px] flex items-center"
                >
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
