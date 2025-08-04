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
  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      console.warn('Invalid timestamp:', timestamp);
      return { date: '', time: '' };
    }

    // KST 타임존으로 포맷팅 (더 안전한 방식)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    // 한국어 로케일로 포맷팅하여 더 안전하게 처리
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    const formatted = formatter.format(date);

    // "2025. 01. 04. 14:30" 형식을 파싱
    const parts = formatted.replace(/\./g, '').trim().split(' ');

    if (parts.length >= 4) {
      const year = parts[0];
      const month = parts[1].padStart(2, '0');
      const day = parts[2].padStart(2, '0');
      const time = parts[3] || '00:00';

      return {
        date: `${year}-${month}-${day}`,
        time: time,
      };
    }

    // fallback: 다른 방식으로 시도
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
  } catch (error) {
    console.error('Error parsing timestamp:', error, timestamp);
    return { date: '', time: '' };
  }
};
