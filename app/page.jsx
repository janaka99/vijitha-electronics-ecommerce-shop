"use client";
// import { useSession } from "next-auth/react";
import Banner from "@components/Banner";
import BannerTwo from "@components/BannerTwo";
import Services from "@components/Services";
import LatestProducts from "@components/LatestProducts";

export default function Home() {
  // const router = useRouter();
  // const { data, status } = useSession();

  // //all the categories available
  // const [categories, setCategories] = useState([]);

  // //all the products available
  // const [allAvailableproducts, setAllAvailableproducts] = useState([]);

  // //all the categoryProducts available
  // const [products, setproducts] = useState([]);

  // // cuurent bill items
  // const [billItems, setBillItems] = useState([]);

  // const [isBillProcessing, setIsBillProcessing] = useState(false);
  // const [billSuccess, setbillSuccess] = useState(false);
  // const [billFailure, setbillFailure] = useState(false);

  // const [totalBill, setTotalBill] = useState(0);
  // const [selectedItem, setSelectedItem] = useState({
  //   name: "",
  //   url: "",
  //   qty: 0,
  //   price: 0,
  // });

  // const generateBill = async () => {
  //   setIsBillProcessing(true);
  //   const genBill = {
  //     billItems: billItems,
  //     totalCost: totalBill,
  //   };
  //   const res = await fetch("/api/bill/new", {
  //     method: "POST",
  //     body: JSON.stringify(genBill),
  //   });
  //   if (res.ok) {
  //     showSuccess();
  //     console.log(res);
  //   } else {
  //     showFail();
  //     console.log(res);
  //   }
  //   setIsBillProcessing(false);
  // };

  // //show suucess display after bill generated
  // const showSuccess = () => {
  //   setbillSuccess(true);
  //   setBillItems([]);
  //   setInterval(() => {
  //     setbillSuccess(false);
  //   }, 1500);
  // };

  // //show failed display if bill faild to generate
  // const showFail = () => {
  //   setbillFailure(true);
  //   setInterval(() => {
  //     setbillFailure(false);
  //   }, 1500);
  // };

  // //get all the categories available
  // const getCategories = async () => {
  //   try {
  //     const res = await fetch("/api/category/all", {
  //       method: "GET",
  //     });
  //     const newRes = await res.json();

  //     if (res.ok) {
  //       setCategories(newRes);
  //     } else {
  //       settitleError(newRes.message);
  //     }
  //   } catch (error) {}
  // };

  // //get all the products available
  // const getProducts = async () => {
  //   try {
  //     const res = await fetch("/api/item/all", {
  //       method: "GET",
  //     });
  //     const newRes = await res.json();
  //     console.log(newRes);
  //     if (res.ok) {
  //       setproducts(newRes);
  //       setAllAvailableproducts(newRes);
  //     } else {
  //       settitleError(newRes.message);
  //     }
  //   } catch (error) {}
  // };

  // //calculate the bill price
  // const calculateBillTotalPrice = () => {
  //   if (isBillProcessing === true) return;
  //   let totalBill = 0;
  //   for (let i = 0; i < billItems.length; i++) {
  //     totalBill += billItems[i].price;
  //   }
  //   setTotalBill(totalBill);
  // };

  // //remove an item from bill
  // const removeBillItem = (id) => {
  //   if (isBillProcessing === true) return;
  //   setBillItems((prevState) => prevState.filter((it) => it.billItemId !== id));
  // };

  // //filter products based on category
  // const filterProducts = (category) => {
  //   if (category === 0) {
  //     setproducts(allAvailableproducts);
  //   } else {
  //     setproducts(() =>
  //       allAvailableproducts.filter(
  //         (it) => it.category !== null && it.category._id === category
  //       )
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getCategories();
  //   getProducts();
  // }, []);

  // useEffect(() => {
  //   calculateBillTotalPrice();
  // }, [billItems]);

  return (
    <div className="w-[95%] max-w-[1440px] mx-auto">
      <div className="w-full flex flex-col gap-12">
        <Banner />
        <Services />
        <LatestProducts />
        <BannerTwo />
      </div>
    </div>
  );
}
