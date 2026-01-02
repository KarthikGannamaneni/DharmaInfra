/**
 * Get the base URL from Vite's environment
 * This ensures assets work correctly on GitHub Pages with subdirectory deployment
 */
export const getBaseUrl = (): string => {
    return import.meta.env.BASE_URL;
};

/**
 * Prefix a path with the base URL if it's an absolute path
 * @param {string} path - The asset path (e.g., "/images/logo.png")
 * @returns {string} - The path prefixed with base URL if needed
 */
export const getAssetPath = (path: string): string => {
    if (!path) return path;

    // If it's already an absolute URL (http/https), return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // If it starts with /, prefix with base URL
    if (path.startsWith('/')) {
        const baseUrl = getBaseUrl();
        // Remove trailing slash from baseUrl if present, then add the path
        return baseUrl.replace(/\/$/, '') + path;
    }

    // Relative paths - prefix with base URL
    const baseUrl = getBaseUrl();
    return baseUrl.replace(/\/$/, '') + '/' + path;
};

/**
 * Process a data object recursively to add base URL to all image/path fields
 */
export const processAssetPaths = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(item => processAssetPaths(item)) as unknown as T;
    }

    if (obj && typeof obj === 'object') {
        const processed: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            if (key === 'image' || key === 'gallery' || key === 'floorPlans') {
                if (Array.isArray(value)) {
                    processed[key] = value.map((path: string) => getAssetPath(path));
                } else if (typeof value === 'string') {
                    processed[key] = getAssetPath(value);
                } else {
                    processed[key] = value;
                }
            } else {
                processed[key] = processAssetPaths(value);
            }
        }
        return processed as T;
    }

    return obj;
};
