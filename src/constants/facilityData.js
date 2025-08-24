export const facilities = [ 
  "남녀 분리", 
  "가게 안 화장실", 
  "24시간", 
  "비데 있음", 
  "위생용품 제공"
];

export const conditions = ["깨끗함", "칸많음"];

export const specialFacilities = ["장애인화장실", "기저귀교환대"];

export const timeOptions = {
  hours: Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0')),
  minutes: ['00', '01', '02', '03', '04']
};