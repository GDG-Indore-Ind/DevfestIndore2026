import themesFile from "../../content/themes.json";
export interface Theme {
  id: string;
  label: string;
  icon: "Satellite" | "Braces" | "Bot" | "Radio";
  color: "blue" | "red" | "yellow" | "green";
  signal: string;
  title: string;
  description: string;
  tags: string[];
}
export const THEMES = themesFile.themes as Theme[];
