import { useEffect } from 'react';

export default function MapContainer() {
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

      new window.kakao.maps.Map(container, options);
      console.log('✅ 카카오맵 초기화 완료');
    }
  }, []);

  return (
    <div id="map" className="w-[795px] h-[1282px]">
      {/* 카카오맵 스크립트로 로드되는 부분 */}
    </div>
  );
}
