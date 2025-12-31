import { VentoPlugin } from "eleventy-plugin-vento";
import EleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";

export default function (cfg) {
  cfg.setInputDirectory("src");
  cfg.setIncludesDirectory("../_includes");
  cfg.setLayoutsDirectory("../_includes/_layouts");

  cfg.addTemplateFormats("scss");
  cfg.addTemplateFormats("css");

  cfg.addPlugin(EleventySass);
  cfg.addPlugin(VentoPlugin, { autotrim: true });
}
