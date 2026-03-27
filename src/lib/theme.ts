import { createTheme, MantineColorsTuple } from "@mantine/core";

// Warm, appetizing primary color palette (red-orange)
const primary: MantineColorsTuple = [
  "#fff0e6",
  "#ffe0cc",
  "#ffc199",
  "#ffa066",
  "#ff8533",
  "#ff6b00", // primary
  "#e65f00",
  "#cc5500",
  "#b34a00",
  "#993f00",
];

// Secondary accent (golden yellow)
const secondary: MantineColorsTuple = [
  "#fff9e6",
  "#fff3cc",
  "#ffe799",
  "#ffdb66",
  "#ffcf33",
  "#ffc300", // secondary
  "#e6b000",
  "#cc9c00",
  "#b38900",
  "#997500",
];

export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary,
    secondary,
  },
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  defaultRadius: "md",
});
