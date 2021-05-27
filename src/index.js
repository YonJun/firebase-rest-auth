import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import "firebase/firestore";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./firebaseConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

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
