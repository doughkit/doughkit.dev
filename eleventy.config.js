import pug from "pug";
import eleventyPluginPhosphoricons from "eleventy-plugin-phosphoricons";
import fontAwesomePlugin from "@11ty/font-awesome";
import yaml from "js-yaml";

export default function (cfg) {
	cfg.setDataFileSuffixes([".dat", ""]);

	cfg.addPlugin(eleventyPluginPhosphoricons, {
		fill: "currentColor",
	});
	cfg.addPlugin(fontAwesomePlugin, {
		shortcode: "fa",
		defaultAttributes: {
			class: "size-6",
		},
	});

	cfg.addDataExtension("yaml", (contents) => yaml.load(contents));

	cfg.addPassthroughCopy("src/assets");

	cfg.addWatchTarget("../styles/tailwind.config.js");
	cfg.addWatchTarget("../styles/tailwind.css");
	cfg.addWatchTarget("pages");

	cfg.addPairedShortcode("pug", (text) => {
		return pug.render(text);
	});

	return {
		dir: {
			input: "src",
			includes: "includes",
			layouts: "layouts",
			data: "data",
		},
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
}
