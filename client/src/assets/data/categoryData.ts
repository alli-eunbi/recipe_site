export const METHOD_DATA = [
  { id: 'm_all', cat: 'method', name: '전체' },
  { id: 'm_fry', cat: 'method', name: '볶음' },
  { id: 'm_boil', cat: 'method', name: '끓이기' },
  { id: 'm_pan_fry', cat: 'method', name: '부침' },
  { id: 'm_stew', cat: 'method', name: '조림' },
  { id: 'm_mix', cat: 'method', name: '비빔' },
  { id: 'm_steam', cat: 'method', name: '찜' },
  { id: 'm_marinate', cat: 'method', name: '절임' },
  { id: 'm_deep_fry', cat: 'method', name: '튀김' },
  { id: 'm_porch', cat: 'method', name: '삶기' },
  { id: 'm_grill', cat: 'method', name: '굽기' },
  { id: 'm_light_porch', cat: 'method', name: '데치기' },
  { id: 'm_sashimi', cat: 'method', name: '회' },
  { id: 'm_misc', cat: 'method', name: '기타' },
];

export const OCC_DATA = [
  { id: 'o_all', cat: 'occ', name: '전체' },
  { id: 'o_daily', cat: 'occ', name: '일상' },
  { id: 'o_quick', cat: 'occ', name: '초스피드' },
  { id: 'o_cater', cat: 'occ', name: '손님 접대' },
  { id: 'o_w_drink', cat: 'occ', name: '술안주' },
  { id: 'o_diet', cat: 'occ', name: '다이어트' },
  { id: 'o_bento', cat: 'occ', name: '도시락' },
  { id: 'o_health', cat: 'occ', name: '영양식' },
  { id: 'o_snack', cat: 'occ', name: '간식' },
  { id: 'o_night', cat: 'occ', name: '야식' },
  { id: 'o_food_style', cat: 'occ', name: '푸드스타일' },
  { id: 'o_hangover', cat: 'occ', name: '해장' },
  { id: 'o_misc', cat: 'occ', name: '기타' },
];

export const KIND_DATA = [
  {
    id: 'pesco',
    cat: 'kind',
    name: '페스코',
    description:
      '육식은 하지 않지만 해산물, 동물의 알, 과일, 견과류, 생선 등은 먹을 수 있는 채식주의자입니다.',
  },
  {
    id: 'lacto',
    cat: 'kind',
    name: '락토',
    description:
      '우유와 유제품은 먹지만 생선, 해물, 달걀은 먹지 않는 채식주의자입니다.',
  },
  {
    id: 'ovo',
    cat: 'kind',
    name: '오보',
    description: '동물들의 알만 먹는 채식주의자입니다.',
  },
  {
    id: 'lacto_ovo',
    cat: 'kind',
    name: '락토오보',
    description:
      '생선과 해물은 안먹으나 달걀, 우유 등 유제품은 섭취하는 채식주의자입니다.',
  },
  {
    id: 'vegan',
    cat: 'kind',
    name: '비건',
    description: '완전한 채식주의자입니다.',
  },
];

export const SERVINGS_DATA = [
  { id: 's_default', cat: 'serving', name: '선택' },
  { id: 's_one', cat: 'serving', name: '1인분' },
  { id: 's_two', cat: 'serving', name: '2인분' },
  { id: 's_three', cat: 'serving', name: '3인분' },
  { id: 's_four', cat: 'serving', name: '4인분' },
  { id: 's_five', cat: 'serving', name: '5인분' },
  { id: 's_six', cat: 'serving', name: '6인분이상' },
];

export const TIME_DATA = [
  { id: 't_default', cat: 'time', name: '선택' },
  { id: 't_5min', cat: 'time', name: '5분이내' },
  { id: 't_10min', cat: 'time', name: '10분이내' },
  { id: 't_15min', cat: 'time', name: '15분이내' },
  { id: 't_20min', cat: 'time', name: '20분이내' },
  { id: 't_30min', cat: 'time', name: '30분이내' },
  { id: 't_60min', cat: 'time', name: '60분이내' },
  { id: 't_90min', cat: 'time', name: '90분이내' },
  { id: 't_2hour_less', cat: 'time', name: '2시간이내' },
  { id: 't_2hour_over', cat: 'time', name: '3시간이상' },
];
