import { stringify } from "jsr:@libs/xml@5.2.0/stringify";
import type { Point } from "./gpx.ts";

type Coordinates = {
  x: number;
  y: number;
};

/**
 * Calculate scaling factor and translate coordinates to fit SVG bounds
 */
function normalizeCoordinates(
  points: Point[],
  svgWidth: number,
  svgHeight: number,
): { x: number; y: number }[] {
  // Find min and max latitude and longitude
  let minLat = Infinity,
    maxLat = -Infinity,
    minLon = Infinity,
    maxLon = -Infinity;

  for (const { lat, lon } of points) {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
  }

  // Calculate scaling factor
  const latRange = maxLat - minLat;
  const lonRange = maxLon - minLon;
  const scaleFactor = Math.min(svgWidth / lonRange, svgHeight / latRange);

  // Translate and scale coordinates to fit SVG bounds
  const normalizedCoordinates = points.map(({ lat, lon }) => {
    const x = (lon - minLon) * scaleFactor;
    const y = (maxLat - lat) * scaleFactor;
    return { x, y };
  });

  return normalizedCoordinates;
}

/**
 * Generate the SVG polyline based on the provided coordinates.
 */
function generatePolyline(coordinates: Coordinates[]): string {
  let polyline = "";
  for (const { x, y } of coordinates) {
    polyline += `${x},${y} `;
  }
  return polyline.trim();
}

/**
 * Generate the SVG String based on all the provided points.
 *
 * @param points Points from a GPX file or equivalent.
 * @param width Width of the SVG
 * @param height Height of the SVG
 *
 * @example
 * ```typescript
 * import { generateSVGString } from "jsr:@timharek/gpx-to-svg";
 *
 * const points = [
 *   { lat: 48.8566, lon: 2.3522 },
 *   { lat: 48.8584, lon: 2.2945 },
 *   { lat: 48.861, lon: 2.3365 },
 * ];
 *
 * const svgString = generateSVGString(points);
 * ```
 */
export function generateSVGString(
  points: Point[],
  width = 266,
  height = 266,
): string {
  const svgPoints = normalizeCoordinates(points, 266, 266);
  const polyline = generatePolyline(svgPoints);

  const svgString = stringify({
    svg: {
      "@xmlns": "http://www.w3.org/2000/svg",
      "@viewBox": `0 0 ${width} ${height}`,
      polyline: {
        "@points": polyline,
        "@fill": "none",
        "@stroke": "black",
        "@stroke-width": 1,
      },
    },
  });

  return svgString;
}
