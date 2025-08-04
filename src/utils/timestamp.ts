/**
 * KST(한국 표준시) 기준으로 ISO 문자열을 생성합니다.
 * @returns KST 기준 ISO 문자열 (예: "2025-08-04T14:30:00.000+09:00")
 */
export const getKSTTimestamp = (): string => {
  const now = new Date();
  const kstOffset = 9 * 60; // KST는 UTC+9
  const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);

  // KST 시간을 ISO 문자열로 변환하고 Z를 +09:00으로 대체
  return kstTime.toISOString().replace('Z', '+09:00');
};

/**
 * KST 기준으로 날짜와 시간을 분리해서 반환합니다.
 * @param timestamp ISO 문자열 또는 Date 객체
 * @returns { date: "YYYY-MM-DD", time: "HH:MM" }
 */
export const parseKSTTimestamp = (timestamp: string | Date) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

  // KST로 변환
  const kstTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = kstTime.getUTCFullYear();
  const month = String(kstTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstTime.getUTCDate()).padStart(2, '0');
  const hours = String(kstTime.getUTCHours()).padStart(2, '0');
  const minutes = String(kstTime.getUTCMinutes()).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
  };
};
