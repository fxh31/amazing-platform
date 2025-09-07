import { Dictionaries } from "../enum";

export type Key = string;
export type Expire = Dictionaries.permanent | number; // 永久或事件戳

export interface Data<T> {
  value: T;
  [Dictionaries.expire]: Expire;
}

export interface Result<T> {
  message: string;
  value: T | null;
}

export interface StorageCls {
  get: <T>(key: Key) => void;
  set: <T>(key: Key, value: T, expire: Expire) => void;
  remove: (key: Key) => void;
  clear: () => void;
}
