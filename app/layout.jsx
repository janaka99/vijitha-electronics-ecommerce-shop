import Header from "@components/Header";
import Provider from "@components/Provider";
import WholePageLoading from "@components/WholePageLoading";
import StyledComponentsRegistry from "@components/registry";
import "@styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./global.css";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@context/cartContext/CartContextState";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vijitha Electronics",
  description: "bla bla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Provider>
            <div className="main ">
              <main>
                <CartContextProvider>
                  <Header />
                  {children}
                  <Toaster />
                </CartContextProvider>
              </main>
            </div>
            <div className="portal"></div>
          </Provider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
