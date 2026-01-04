import { VentoPlugin } from "eleventy-plugin-vento";
import EleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import htmlmin from "html-minifier-next";
import * as fs from "node:fs";
import postcss from "postcss";
import purgeCSS from "@fullhuman/postcss-purgecss";
import CleanCSS from "clean-css";

function shrink() {
  const _base = "_site/**/*.";

  const sourceCSS = _base + "css";
  const sourceContent = [
    _base + "html",
    _base + "js",
  ];

  try {
    // Process CSS files
    fs.glob(sourceCSS, async function (err, cssFiles) {
      if (err) {console.error(err)}
      for (const source of cssFiles) {
        const css = await Deno.readTextFile(source);

        const result = await postcss([
          purgeCSS.purgeCSSPlugin({
            content: sourceContent,
            variables: true,
            keyframes: true,
            fontFace: true,
          }),
        ]).process(css, {
          from: source,
          to: source,
        });

        const compiledCSS = new CleanCSS().minify(result.css).styles;
        await Deno.writeTextFile(source, compiledCSS);
        console.log(`Processed CSS`);
      }
    });
  } catch (error) {
    console.error("Error during purge process:", error);
    Deno.exit(1);
  }
}

function html_minify(content) {
  if ((this.page.outputPath || "").endsWith(".html")) {
    const minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });

    console.log("Purge completed successfully!");
    return minified;
  }
  return content;
}

export default function (cfg) {
  cfg.setInputDirectory("src");
  cfg.setIncludesDirectory("../_includes");
  cfg.setDataDirectory("../_data");
  cfg.setLayoutsDirectory("../_includes/layouts");

  cfg.addTemplateFormats("scss");
  cfg.addTemplateFormats("css");

  cfg.addPassthroughCopy("assets");

  cfg.addPlugin(EleventySass);
  cfg.addPlugin(VentoPlugin, { autotrim: true });
  cfg.addPlugin(shrink);

  cfg.addTransform("htmlmin", html_minify);

  cfg.addGlobalData("domain", "https://doughkit.dev/");
}
