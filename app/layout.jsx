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
import Footer from "@components/Footer";
import { EthPaymentProvider } from "@context/ethpaymentContext/EthPaymentContext";

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
              <main className="w-full flex flex-col">
                <CartContextProvider>
                  <EthPaymentProvider>
                    <div className="flex w-full flex-col min-h-screen justify-between">
                      <Header />
                      {children}
                      <Toaster />
                      <Footer />
                    </div>
                  </EthPaymentProvider>
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
