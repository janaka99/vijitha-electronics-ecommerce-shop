"use client";
// import { useSession } from "next-auth/react";
import Banner from "@components/Banner";
import BannerTwo from "@components/BannerTwo";
import Services from "@components/Services";
import LatestProducts from "@components/LatestProducts";
import ProductSuggestions from "@components/ProductSuggestions";

export default function Home() {
  return (
    <div className="w-[100%]  mx-auto">
      <div className="w-full flex flex-col ">
        <Banner />
        <ProductSuggestions />
        <Services />
        <LatestProducts />
        {/* <BannerTwo /> */}
      </div>
    </div>
  );
}
