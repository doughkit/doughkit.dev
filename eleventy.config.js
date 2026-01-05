import { VentoPlugin } from "eleventy-plugin-vento";
import EleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";

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

  cfg.addGlobalData("domain", "https://doughkit.dev/");
}
