import { IsLoggedInAsAdmin } from "@middlewares";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import User from "@models/user";

export async function GET(req) {
  const user = await IsLoggedInAsAdmin(req);
  if (user === false) {
    return new Response(JSON.stringify({ message: "Unauthorized Access" }), {
      status: 405,
    });
  }
  try {
    let orders = await Order.find({ isEthPayment: false })
      .populate({
        path: "customer",
        model: User,
      })
      .populate({
        path: "orderItems",
        model: OrderItem,
      });

    return new Response(JSON.stringify(orders), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error }),
      {
        status: 400,
      }
    );
  }
}

const createList = (list) => {
  const data = list.map((item) => {
    for (let i = 0; i < list.length; i++) {
      return {
        orderId: item[1],
        customerId: item[2],
        paymentAddress: item[3],
        total: item[4],
      };
    }
  });
  return data;
};
