import { ApolloProvider } from "@apollo/client";
import Script from "next/script";

import client from "../graphql/apollo";

import "../index.css";
import "reactjs-popup/dist/index.css";
import "typeface-roboto";

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-24PZ158GQN"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-24PZ158GQN');
            `,
        }}
      />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
