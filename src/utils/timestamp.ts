/**
 * KST(한국 표준시) 기준으로 ISO 문자열을 생성합니다.
 * @returns KST 기준 ISO 문자열 (예: "2025-08-04T14:30:00.000+09:00")
 */
export const getKSTTimestamp = (): string => {
  const now = new Date();

  // KST 시간으로 포맷팅
  const kstFormatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const kstString = kstFormatter.format(now).replace(' ', 'T');
  return `${kstString}.000+09:00`;
};

/**
 * KST 기준으로 날짜와 시간을 분리해서 반환합니다.
 * @param timestamp ISO 문자열 또는 Date 객체
 * @returns { date: "YYYY-MM-DD", time: "HH:MM" }
 */
export const parseKSTTimestamp = (timestamp: string | Date) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

  // KST 타임존으로 포맷팅
  const kstFormatter = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = kstFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === 'year')?.value || '';
  const month = parts.find((part) => part.type === 'month')?.value || '';
  const day = parts.find((part) => part.type === 'day')?.value || '';
  const hour = parts.find((part) => part.type === 'hour')?.value || '';
  const minute = parts.find((part) => part.type === 'minute')?.value || '';

  return {
    date: `${year}-${month}-${day}`,
    time: `${hour}:${minute}`,
  };
};
