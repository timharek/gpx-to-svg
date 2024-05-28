import { readGPX } from "./gpx.ts";
import { generateSVGString } from "./svg.ts";

/**
 * Generate SVg file based on GPX file.
 *
 * @param gpxFilePath Path to GPX file
 * @param outputPath Path to outputted SVG
 *
 * @example
 * ```typescript
 * import { generateSVGFile } from "jsr:@timharek/gpx-to-svg";
 *
 * const gpxFile = "your/gpx/file/path.gpx";
 *
 * await generateSVGFile(gpxFile, "./output.svg");
 * ```
 */
export async function generateSVGFile(
  gpxFilePath: string | URL,
  outputPath: string | URL,
) {
  const points = await readGPX(gpxFilePath);
  const svgContent = generateSVGString(points);

  await Deno.writeTextFile(outputPath, svgContent);
}

if (import.meta.main) {
  const gpxFilePath = Deno.args[0];
  const outputPath = Deno.args[1] ?? "output.svg";
  await generateSVGFile(gpxFilePath, outputPath);
}
