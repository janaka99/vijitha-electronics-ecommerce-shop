"use client";
import { createContext, useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import ABI from "../../utils/abi.json";
import { contractAddress } from "@utils/constants";

export const EthPaymentContext = createContext();

const getEthereumContarct = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const paymentContract = new Contract(contractAddress, ABI, signer);
  console.log(paymentContract);

  return paymentContract;
};

export const EthPaymentProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    order_id: "",
    customer_id: "",
  });

  const ckeckIfWallerIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please connect to the meta mask");
      const paymentContract = await getEthereumContarct();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object available");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install metamask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);
      return true;
    } catch (error) {
      return false;
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          throw new Error("No ethereum object available");
        }
      } else {
        throw new Error("No ethereum object available");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object available");
    }
  };

  const makePayment = async (order_id, customer_id, amount) => {
    try {
      if (!window.ethereum) throw new Error("No ethereum object available");

      const transactionContract = await getEthereumContarct();
      // console.log(amount);
      let parsedAmount = amount.toString();
      parsedAmount = ethers.parseEther(parsedAmount);

      parsedAmount = ethers.toQuantity(parsedAmount);
      // console.log(parsedAmount);
      const result = await transactionContract.buy(
        order_id.toString(),
        customer_id.toString(),
        {
          value: parsedAmount,
        }
      );
      await result.wait(1);
      if (result.hash) {
        const res = await fetch("/api/order/confirm-eth-pay", {
          method: "POST",
          body: JSON.stringify({
            orderId: order_id,
            customer_id: customer_id,
          }),
        });
        if (res.ok) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const getBalance = async () => {
    try {
      if (!window.ethereum) return alert("Please install metamask");
      const transactionContract = await getEthereumContarct();

      let result = await transactionContract.getBalance();
      result = ethers.formatEther(result);
      return result;
    } catch (error) {
      throw new Error("Wallet connection was rejected");
    }
  };
  const getCustomerOrder = async () => {
    try {
      if (!window.ethereum) return alert("Please install metamask");
      const transactionContract = await getEthereumContarct();

      const result = await transactionContract.getOrderByOrderId("1");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllOrders = async () => {
    try {
      if (!window.ethereum) return alert("Please install metamask");
      const transactionContract = await getEthereumContarct();

      const result = await transactionContract.getAllOrders();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // checkIfWalletIsConnected();
  }, []);

  return (
    <EthPaymentContext.Provider
      value={{
        currentAccount,
        makePayment,
        getBalance,
        connectWallet,
        getAllOrders,
        getCustomerOrder,
        checkIfWalletIsConnected,
      }}
    >
      {children}
    </EthPaymentContext.Provider>
  );
};
