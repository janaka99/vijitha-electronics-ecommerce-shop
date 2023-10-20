import { IsLoggedIn } from "@middlewares";
import Cart from "@models/cart";
import Item from "@models/item";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import User from "@models/user";
const mongoose = require("mongoose");

export async function POST(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      // mongoSession.startTransaction();
      const result = await Cart.find({ customer: loggedUser._id }).populate({
        path: "itemId",
        model: Item,
      });

      if (result.length <= 0) {
        return new Response(JSON.stringify({ message: "Invalid purchase" }), {
          status: 500,
        });
      }
      const { address_id } = await req.json();
      const shippingAddress = await findAddress(
        loggedUser._id.toString(),
        address_id
      );
      if (shippingAddress === false) {
        return new Response(
          JSON.stringify({ message: "Invalid Address Try Again" }),
          {
            status: 400,
          }
        );
      }
      let total = 0;
      for (const orderItem of result) {
        const item = await Item.findById(orderItem.itemId._id);
        if (item) {
          total = total + item.ethPrice * orderItem.quantity;
        }
      }

      const newOrder = new Order({
        orderItems: [],
        customer: loggedUser._id,
        shippingDetails: shippingAddress,
        isEthPayament: true,
      });

      const items = await Promise.all(
        result.map(async (item) => {
          const newOrderItem = new OrderItem({
            itemId: item.itemId._id,
            product_img: item.itemId.src,
            name: item.itemId.name,
            quantity: item.quantity,
            boughtPrice_unit_eth: item.itemId.ethPrice,
            orderId: newOrder._id,
            customer: loggedUser._id,
          });

          let ord = await newOrderItem.save();

          return ord._id;
        })
      );

      newOrder.orderItems = newOrder.orderItems.concat(items);

      const createdOrder = await newOrder.save();

      return new Response(
        JSON.stringify({
          orderId: createdOrder._id,
          customerId: loggedUser._id,
          total: total,
        }),
        {
          status: 200,
        }
      );
    } catch (err) {
      console.error(err);
      // await mongoSession.abortTransaction();
      return new Response(
        JSON.stringify({ message: "Category already exists" }),
        {
          status: 500,
        }
      );
    }
  } else {
    console.log("asd");
    return new Response(
      JSON.stringify({ message: "Category already exists" }),
      {
        status: 500,
      }
    );
  }
}

const findAddress = async (userId, shippingAddressIdToFind) => {
  const user = await User.findOne(
    { _id: userId, "shippingAddress._id": shippingAddressIdToFind },
    { "shippingAddress.$": 1 }
  );
  if (!user) {
    return false;
  }
  if (!user.shippingAddress || user.shippingAddress.length === 0) {
    return false;
  }

  const foundShippingAddress = user.shippingAddress[0]; // There should be only one matching address

  return foundShippingAddress;
};
