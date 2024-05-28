import { assertEquals } from "@std/assert";
import { generateSVGString } from "./svg.ts";

const points = [
  { lat: 48.8566, lon: 2.3522 },
  { lat: 48.8584, lon: 2.2945 },
  { lat: 48.861, lon: 2.3365 },
];

Deno.test("Generate SVG string", () => {
  const svgString = generateSVGString(points);

  const expected =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 266 266">
  <polyline points="266,20.28422876948301 0,11.986135181947878 193.6221837088392,0" fill="none" stroke="black" stroke-width="1"/>
</svg>`;
  assertEquals(svgString, expected);
});
