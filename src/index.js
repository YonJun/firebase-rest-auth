import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

ReactDOM.render(
  <>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </>,
  document.getElementById("root"),
);
