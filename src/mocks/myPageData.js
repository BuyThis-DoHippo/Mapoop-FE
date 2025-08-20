export const mockUserData = {
  id: 1,
  name: "OOO님",
  nickname: "화장실 전문가",
  email: "user@example.com",
  loginType: "카카오 로그인(000000@이메일주소)",
  profileImage: "/src/assets/svg/NearbyToilet.svg", // placeholder
  stats: {
    reviewCount: 3,
    toiletCount: 3
  }
};

// 사용자가 작성한 리뷰 데이터 (기존 toiletData의 리뷰를 활용)
export const mockMyReviews = [
  {
    id: 1,
    toiletId: 1,
    toiletName: "소코아 홍대점 화장실",
    rating: 4,
    content: "나름 깨끗합니다. 건물 밖에 있지만 멀지 않고요 관리가 잘 되어있는 것 같습니다. 화장실이 더러워서 못갈 정도는 아님",
    images: [
      "/src/assets/svg/NearbyToilet.svg",
      "/src/assets/svg/NearbyToilet.svg",
      "/src/assets/svg/NearbyToilet.svg"
    ],
    tags: ["깨끗함", "가게 밖", "남녀분리"],
    createdAt: "2025.08.14",
    status: "ACTIVE"
  },
  {
    id: 2,
    toiletId: 3,
    toiletName: "레드로드 R6 개방화장실",
    rating: 4,
    content: "나름 깨끗합니다. 건물 밖에 있지만 멀지 않고요 관리가 잘 되어있는 것 같습니다. 화장실이 더러워서 못갈 정도는 아님",
    images: [
      "/src/assets/svg/NearbyToilet.svg",
      "/src/assets/svg/NearbyToilet.svg",
      "/src/assets/svg/NearbyToilet.svg"
    ],
    tags: ["깨끗함", "가게 밖", "남녀분리"],
    createdAt: "2025.08.14",
    status: "ACTIVE"
  }
];

// 사용자가 등록한 화장실 데이터
export const mockMyToilets = [
  {
    id: 1,
    name: "소코아 홍대점 화장실",
    address: "서울 마포구 와우산로15길 49 1층",
    registeredAt: "등록일 2025.08.14",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "소코아 홍대점 화장실",
    address: "서울 마포구 와우산로15길 49 1층",
    registeredAt: "등록일 2025.08.14",
    status: "ACTIVE"
  }
];