import eleventyPluginPhosphoricons from "eleventy-plugin-phosphoricons";
import yaml from "js-yaml";

export default function (cfg) {
	cfg.setDataFileSuffixes([".dat", ""]);
	cfg.addPlugin(eleventyPluginPhosphoricons, { fill: "currentColor" });
	cfg.addDataExtension("yaml", (contents) => yaml.load(contents));

	return {
		dir: {
			input: "src",
			layouts: "_layouts",
		}
	};
}
