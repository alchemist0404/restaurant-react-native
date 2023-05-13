import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import Navigation from "./navigation";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigation />
    </NativeBaseProvider>
  );
}
