"use client";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";

const CustomOrderItem = ({ item, status, order_id, getAllOrders }) => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    message: "",
    order_id: order_id,
    order_item_id: item._id,
    item_id: item.itemId,
  });

  const ratingChanged = (newRating) => {
    setFeedback((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  const handleFeedback = (e) => {
    setFeedback((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState(false);

  const submitFeedback = async () => {
    setIsFeedbackSubmitting(true);

    if (feedback.rating > 5 || feedback.rating < 0) {
      toast.error("Please give valid rating");
      setIsFeedbackSubmitting(false);
      return;
    }
    if (feedback.message.length <= 0) {
      toast.error("Feedback is empty");
      setIsFeedbackSubmitting(false);
      return;
    }
    const res = await fetch("/api/order/submit-feedback", {
      method: "POST",
      body: JSON.stringify(feedback),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      await getAllOrders();
      toast.success("Feedback submitted");
      setIsFeedbackSubmitting(false);
    } else {
      console.log("Error");
      toast.error("Failed to submit feedback");
      setIsFeedbackSubmitting(false);
    }
  };

  return (
    <div className="w-full p-2 flex flex-col border-t border-gray-100 bg-white">
      <div className="w-full flex p-2 pb-0 ">
        <div className="w-[150px] h-[150px] flex bg-gray-100 justify-center items-center rounded-md overflow-hidden">
          <img
            className="w-full h-full object-contain object-center"
            src={item.product_img}
            alt=""
          />
        </div>
        <div className="flex flex-col flex-grow justify-between gap-2 px-4">
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex ">
              <span className="font-bold ">{item.name}</span>
            </div>
            <div className="w-full flex justify-between items-center">
              <span className=" flex items-center">
                <span className="text-sm">Unit Price</span>
                <span className="text-blue-500 font-bold">
                  {item.boughtPrice_unit} LKR
                </span>
              </span>
              <span className="font-bold">x {item.quantity}</span>
            </div>
          </div>
          <div className="w-full flex justify-end items-center">
            <span className="mr-2  text-sm">Total</span>
            <span className="text-blue-500 font-bold">
              {item.boughtPrice_unit * item.quantity} LKR
            </span>
          </div>
        </div>
      </div>
      <div className="w-full p-2 pt-0 flex flex-col border-b border-b-gray-200 mb-2">
        {status === "Delivered" && item.reviewed === false && (
          <>
            <div className="ml-2">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <textarea
              className="w-full p-2 text-sm rounded outline-gray-200 border border-gray-200"
              name=""
              id=""
              rows="2"
              placeholder="Please give feedback to our product..."
              onChange={handleFeedback}
            ></textarea>
            <div className="w-full flex justify-end mt-2">
              {isFeedbackSubmitting ? (
                <button
                  onClick={submitFeedback}
                  className="text-sm py-2 flex justify-center items-center text-white font-semibold bg-blue-500 hover:bg-blue-600 transition w-[80px]"
                >
                  <span className="animate-spin">
                    <AiOutlineLoading size={20} />
                  </span>
                </button>
              ) : (
                <button
                  onClick={submitFeedback}
                  className="text-sm w-[80px] py-2 text-white font-semibold px-4 bg-blue-500 hover:bg-blue-600 transition "
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomOrderItem;
