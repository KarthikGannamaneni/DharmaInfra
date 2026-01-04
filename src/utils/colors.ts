/**
 * Converts a hex color string to an RGBA string with the specified alpha value.
 * @param hex The hex color string (e.g., "#ffffff" or "#fff")
 * @param alpha The alpha value (0 to 1)
 * @returns The RGBA string (e.g., "rgba(255, 255, 255, 0.5)")
 */
export const hexToRgba = (hex: string, alpha: number): string => {
    let r = 0, g = 0, b = 0;

    // Handle 3-char hex
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // Handle 6-char hex
    else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
