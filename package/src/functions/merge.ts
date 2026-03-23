import { mergeWith } from "es-toolkit";

const mergeConfig = <
    T extends Record<PropertyKey, any>,
    S extends Record<PropertyKey, any>,
>(
    target: T,
    source?: S,
): T & S => {
    if (!source) return target;

    return mergeWith(target, source, (_: unknown, target: unknown): unknown => {
        // array replacement
        if (Array.isArray(target)) return target;
        // default deep merge
        return void 0;
    });
};

export { mergeConfig };
