import Order from "@models/order";

export async function POST(req) {
  try {
    await Order.findOneAndUpdate(
      { _id: "6515c484c443124f20f6c97d" },
      { isPaid: true }
    );

    return new Response(JSON.stringify({ message: "Order Placed" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 400,
    });
  }
}
