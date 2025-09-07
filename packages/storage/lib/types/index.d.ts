import type { StorageCls, Key, Expire, Result } from "./type";
export declare class Storage implements StorageCls {
    set<T>(key: Key, value: T, expire?: Expire): void;
    get<T>(key: Key): Result<T>;
    remove(key: Key): void;
    clear(): void;
}
