// 기본 위치 (홍대입구역)
const DEFAULT_LOCATION = {
  latitude: 37.5563,
  longitude: 126.9236,
};

/**
 * 사용자의 현재 위치를 가져옴
 * Geolocation API 사용, 실패 시 기본 위치 반환.
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.warn('Geolocation이 지원되지 않습니다. 기본 위치를 사용합니다.');
      resolve(DEFAULT_LOCATION);
      return;
    }

    const options = {
      enableHighAccuracy: true, // 높은 정확도 요청
      timeout: 10000, // 10초 타임아웃
      maximumAge: 300000, // 5분간 캐시된 위치 사용
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(location);
      },
      (error) => {
        console.warn('위치 조회 실패:', error.message);

        // 오류 코드에 따른 처리
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.warn('사용자가 위치 정보 제공을 거부했습니다.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.warn('위치 정보를 사용할 수 없습니다.');
            break;
          case error.TIMEOUT:
            console.warn('위치 정보 요청 시간이 초과되었습니다.');
            break;
          default:
            console.warn('알 수 없는 오류가 발생했습니다.');
            break;
        }

        // 에러 발생 시에도 기본 위치 반환
        resolve(DEFAULT_LOCATION);
      },
      options
    );
  });
};

/**
 * 위치 권한 상태를 확인
 * @returns {Promise<string>} 'granted' | 'denied' | 'prompt' | 'unsupported'
 */
export const checkLocationPermission = async () => {
  if (!navigator.permissions) {
    return 'unsupported';
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    return result.state;
  } catch (error) {
    console.warn('위치 권한 확인 실패:', error);
    return 'unsupported';
  }
};

/**
 * 위치 권한 요청 및 현재 위치 조회
 * @param {Function} onSuccess - 위치 조회 성공 시 실행할 콜백
 * @param {Function} onError - 위치 조회 실패 시 실행할 콜백
 */
export const requestLocationWithPermission = async (onSuccess, onError) => {
  try {
    const permission = await checkLocationPermission();

    if (permission === 'denied') {
      const useDefault = confirm(
        '위치 정보 접근이 차단되어 있습니다. 기본 위치(홍대입구역)를 사용하시겠습니까?\n\n' +
          '더 정확한 서비스를 위해 브라우저 설정에서 위치 권한을 허용해주세요.'
      );

      if (useDefault) {
        onSuccess(DEFAULT_LOCATION);
      } else {
        onError(new Error('위치 권한이 거부되었습니다.'));
      }
      return;
    }

    // 위치 조회
    const location = await getCurrentLocation();
    onSuccess(location);
  } catch (error) {
    console.error('위치 조회 중 오류:', error);
    onError(error);
  }
};

/**
 * 두 지점 간의 거리를 계산 (Haversine formula)
 * @param {number} lat1 - 첫 번째 지점의 위도
 * @param {number} lon1 - 첫 번째 지점의 경도
 * @param {number} lat2 - 두 번째 지점의 위도
 * @param {number} lon2 - 두 번째 지점의 경도
 * @returns {number} 거리 (미터 단위)
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // 지구 반지름 (미터)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
};
