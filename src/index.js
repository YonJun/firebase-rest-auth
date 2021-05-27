import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import "firebase/firestore";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./firebaseConfig";
import { queryClient } from "./QClient";

ReactDOM.render(
  <>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
          <Suspense fallback="Loading...">
            <App />
          </Suspense>
        </FirebaseAppProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </>,
  document.getElementById("root"),
);
