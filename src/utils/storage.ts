import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Lưu giá trị vào AsyncStorage
 */
export const setItem = async (key: string, value: unknown): Promise<void> => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (error) {
    console.error(`[Storage] setItem error for key "${key}":`, error);
  }
};

/**
 * Lấy giá trị từ AsyncStorage
 */
export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const json = await AsyncStorage.getItem(key);
    if (json === null) return null;
    return JSON.parse(json) as T;
  } catch (error) {
    console.error(`[Storage] getItem error for key "${key}":`, error);
    return null;
  }
};

/**
 * Xóa một key
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] removeItem error for key "${key}":`, error);
  }
};

/**
 * Lấy nhiều key cùng lúc
 */
export const getMultiple = async (
  keys: string[],
): Promise<Record<string, unknown>> => {
  try {
    const entries = await Promise.all(
      keys.map(async key => {
        const value = await getItem<unknown>(key);
        return [key, value] as const;
      }),
    );
    return Object.fromEntries(entries.filter(([, v]) => v !== null));
  } catch (error) {
    console.error('[Storage] getMultiple error:', error);
    return {};
  }
};

/**
 * Xóa toàn bộ storage của app (cẩn thận!)
 */
export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('[Storage] clearAll error:', error);
  }
};

const storage = { setItem, getItem, removeItem, getMultiple, clearAll };
export default storage;
