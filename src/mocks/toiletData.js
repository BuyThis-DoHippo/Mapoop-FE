export const mockToiletData = {
  id: 1,
  name: "소코아 홍대점 화장실",
  type: "PRIVATE", // PUBLIC, PRIVATE, STORE
  location: {
    latitude: 37.556123,
    longitude: 126.923456,
    address: "서울 마포구 와우산로15길 49 1층",
    floor: 1
  },
  rating: {
    avg_rating: 4.3,
    total_reviews: 50
  },
  hours: {
    openTime: "11:30:00",
    closeTime: "21:00:00",
    isOpen24h: false,
    isOpenNow: true
  },
  is_partnership: false,
  description: "마포구 카레 맛집, 웨이팅 있음",
  particulars: "가게 열쇠 필요",
  images: [
    "/src/assets/svg/NearbyToilet.svg",
    "/src/assets/svg/NearbyToilet.svg",
    "/src/assets/svg/NearbyToilet.svg",
    "/src/assets/svg/NearbyToilet.svg"
  ],
  tags: ["깨끗함", "가게 밖"],
  distance: "175m",
  subwayInfo: "6호선 상수역 1번 출구에서"
};

// 날짜 유틸
const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);
const toTextDate = (d) => `${d.getFullYear()}.${pad2(d.getMonth() + 1)}.${pad2(d.getDate())}`;

// 50개의 리뷰 데이터 생성 (id가 클수록 더 최근)
const generateReviews = () => {
  const reviewTexts = [
    "나름 깨끗합니다. 건물 밖에 있지만 멀지 않고요 관리가 잘 되어있는 것 같습니다. 화장실이 더러워서 못갈 정도는 아님",
    "접근성이 좋고 깨끗해서 만족스럽습니다. 다만 조금 좁아서 아쉬워요.",
    "위치는 찾기 쉬웠는데 청결도가 조금 아쉽네요. 그래도 이용할 만합니다.",
    "매우 깨끗하고 넓어서 좋았습니다. 강력 추천!",
    "보통 수준입니다. 특별히 좋지도 나쁘지도 않아요.",
    "시설이 좋고 깨끗해서 만족합니다.",
    "접근하기 쉽고 관리가 잘 되어 있어요.",
    "생각보다 깨끗하고 넓어서 좋았어요.",
    "급할 때 이용했는데 깔끔하게 잘 되어있네요.",
    "화장지도 충분하고 손 세정제도 있어서 좋았습니다."
  ];

  const names = ["화장실 전문가", "리뷰어", "깨끗이맨", "화장실킹", "평가왕", "청결마니아", "위생지킴이", "깔끔이", "화장실러버", "클린매니아"];
  const tagSets = [
    ["깨끗함", "가까워", "넓어서"],
    ["깨끗함", "가게 밖"],
    ["남녀분리", "24시간"],
    ["비데있음", "휠체어제공"],
    ["기저귀교환대", "깨끗함"],
    ["현재이용가능", "손세정제"],
    ["가져갈화장지", "깨끗함"],
    ["접근용이", "관리양호"]
  ];

  // 별점 분포: 5성(7), 4성(35), 3성(5), 2성(2), 1성(1) = 50
  const ratings = [
    ...Array(7).fill(5),
    ...Array(35).fill(4),
    ...Array(5).fill(3),
    ...Array(2).fill(2),
    ...Array(1).fill(1),
  ];

  const base = new Date('2025-08-18T12:00:00.000Z'); // 가장 최신 기준일 (id=50)
  const MS_DAY = 24 * 60 * 60 * 1000;

  const reviews = [];
  for (let i = 1; i <= 50; i++) {
    const id = i;
    const rating = ratings[i - 1];
    const daysOffset = 50 - id; // id=50 -> 0일 전, id=1 -> 49일 전
    const d = new Date(base.getTime() - daysOffset * MS_DAY);

    const hasImages = Math.random() > 0.6;
    const imageCount = hasImages ? Math.floor(Math.random() * 3) + 1 : 0;

    reviews.push({
      id,
      rating,
      content: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
      status: "ACTIVE",
      tags: tagSets[Math.floor(Math.random() * tagSets.length)],
      facilities: ["남녀분리", "기저귀교환대"],
      images: Array.from({ length: imageCount }, () => "/src/assets/svg/NearbyToilet.svg"),
      user: {
        id,
        name: names[Math.floor(Math.random() * names.length)]
      },
      created_at: toTextDate(d),     // UI 표시용 (예: 2025.08.14)
      createdAt: d.toISOString(),   // 정렬용 ISO (예: 2025-08-14T12:00:00.000Z)
    });
  }

  return reviews;
};

const allReviews = generateReviews();

export const mockReviewsData = {
  reviews: allReviews.slice(0, 4),
  allReviews,
  pagination: {
    page: 1,
    size: 4,
    total: 50,
    total_pages: 13
  }
};

export const calculateRatingDistribution = (reviews) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  (reviews || []).forEach((review) => {
    distribution[review.rating]++;
  });
  const total = reviews.length || 0;
  const maxCount = Math.max(...Object.values(distribution));
  return Object.entries(distribution)
    .reverse()
    .map(([rating, count]) => ({
      rating: parseInt(rating, 10),
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
      barWidth: maxCount ? Math.round((count / maxCount) * 217) : 0
    }));
};
