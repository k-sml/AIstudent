import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

function Providers({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} >
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default Providers;
