import { REGEX } from '../config';

// =============================================
// VALIDATION HELPERS
// =============================================
export const validate = {
  email: (v: string) => REGEX.EMAIL.test(v.trim()),
  phoneVN: (v: string) => REGEX.PHONE_VN.test(v.trim()),
  password: (v: string) => REGEX.PASSWORD.test(v),
  otp: (v: string) => REGEX.OTP.test(v.trim()),
  required: (v: string) => v.trim().length > 0,
  minLength: (v: string, min: number) => v.trim().length >= min,
  maxLength: (v: string, max: number) => v.trim().length <= max,
};

// =============================================
// DATE HELPERS
// =============================================

/** Định dạng ngày DD/MM/YYYY */
export const formatDate = (date: Date | string, separator = '/'): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}${separator}${month}${separator}${year}`;
};

/** Định dạng ngày giờ DD/MM/YYYY HH:mm */
export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return `${formatDate(d)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/** Thời gian tương đối ("2 giờ trước", "hôm qua", ...) */
export const timeAgo = (date: Date | string): string => {
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;
  if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
  if (months < 12) return `${months} tháng trước`;
  return `${years} năm trước`;
};

/** Tính tuổi từ ngày sinh */
export const calcAge = (birthDate: Date | string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

// =============================================
// STRING HELPERS
// =============================================

/** Viết hoa chữ cái đầu mỗi từ */
export const capitalize = (str: string): string =>
  str
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/** Cắt chuỗi dài */
export const truncate = (str: string, maxLen: number): string =>
  str.length <= maxLen ? str : `${str.substring(0, maxLen)}...`;

/** Lấy chữ viết tắt (dùng cho Avatar) */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/** Loại bỏ dấu tiếng Việt */
export const removeAccents = (str: string): string =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

/** Tìm kiếm không phân biệt hoa thường & dấu */
export const fuzzySearch = (text: string, keyword: string): boolean =>
  removeAccents(text.toLowerCase()).includes(
    removeAccents(keyword.toLowerCase()),
  );

// =============================================
// NUMBER HELPERS
// =============================================

/** Định dạng số có dấu phân cách hàng nghìn */
export const formatNumber = (n: number): string =>
  n.toLocaleString('vi-VN');

/** Định dạng tiền tệ VND */
export const formatCurrency = (amount: number): string =>
  `${formatNumber(amount)} ₫`;

/** Định dạng phần trăm */
export const formatPercent = (value: number, decimals = 1): string =>
  `${value.toFixed(decimals)}%`;

/** Clamp giá trị trong khoảng [min, max] */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

// =============================================
// ARRAY HELPERS
// =============================================

/** Phân trang mảng */
export const paginate = <T>(arr: T[], page: number, limit: number): T[] => {
  const start = (page - 1) * limit;
  return arr.slice(start, start + limit);
};

/** Xáo trộn mảng */
export const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Loại bỏ phần tử trùng trong mảng */
export const unique = <T>(arr: T[], key?: keyof T): T[] => {
  if (!key) return [...new Set(arr)];
  const seen = new Set();
  return arr.filter(item => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

/** Nhóm mảng theo key */
export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> =>
  arr.reduce(
    (acc, item) => {
      const k = String(item[key]);
      if (!acc[k]) acc[k] = [];
      acc[k].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );

// =============================================
// MISC
// =============================================

/** Sleep (dùng trong test / animation delay) */
export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/** Tạo UUID đơn giản */
export const uuid = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

/** Deep clone object */
export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
