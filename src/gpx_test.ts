import { assertEquals } from "@std/assert";
import { readGPX } from "./gpx.ts";

const gpxFilePath = new URL("../testdata/example.gpx", import.meta.url);

Deno.test("Get points from GPX-file", async () => {
  const points = await readGPX(gpxFilePath);

  assertEquals(points.length, 3);
});
