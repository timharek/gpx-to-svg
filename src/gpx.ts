import { parse } from "xml";
import { z } from "zod";

/**
 * A coordinate point with latitude and longitude.
 */
export type Point = {
  lat: number;
  lon: number;
};

const gpxSchema = z.object({
  gpx: z.object({
    "@creator": z.string(),
    "@xmlns": z.string().url(),
    trk: z.object({
      trkseg: z.object({
        trkpt: z.array(
          z.object({ "@lat": z.coerce.number(), "@lon": z.coerce.number() }),
        ),
      }),
    }),
  }),
});

/**
 * Read GPX from GPX file.
 *
 * @param filePath Path to GPX file.
 *
 * @example
 * ```typescript
 * import { readGPX } from "jsr:@timharek/gpx-to-svg";
 *
 * const gpxFile = "your/gpx/file/path.gpx";
 *
 * const points = await readGPX(gpxFile);
 * ```
 */
export async function readGPX(filePath: string | URL): Promise<Point[]> {
  const gpxData = await Deno.readTextFile(filePath);
  const xml = gpxSchema.parse(parse(gpxData));

  const points: Point[] = [];

  const trkptElements = xml.gpx.trk.trkseg.trkpt;
  for (const trkptElement of trkptElements) {
    const lat = trkptElement["@lat"] || 0;
    const lon = trkptElement["@lon"] || 0;
    points.push({ lat, lon });
  }

  return points;
}
