import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    primary: "#ef4444",
  },
});

ReactDOM.render(
  <>
    <GlobalStyles />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>,
  document.getElementById("root"),
);
