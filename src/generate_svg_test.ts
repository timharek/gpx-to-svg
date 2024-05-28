import { assertEquals } from "@std/assert";
import { generateSVGFile } from "./generate_svg.ts";

const gpxFilePath = new URL("../testdata/example.gpx", import.meta.url);

Deno.test("Generate SVG file", async () => {
  const tmpOutput = await Deno.makeTempFile();
  await generateSVGFile(gpxFilePath, tmpOutput);

  const result = await Deno.readTextFile(tmpOutput);

  const expected =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 266 266">
  <polyline points="266,20.28422876948301 0,11.986135181947878 193.6221837088392,0" fill="none" stroke="black" stroke-width="1"/>
</svg>`;
  assertEquals(result, expected);
});
