import { type AppType } from "next/app";
import { dark, neobrutalism } from "@clerk/themes";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from "./layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      {...pageProps}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
