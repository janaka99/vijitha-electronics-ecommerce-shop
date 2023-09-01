import { IsLoggedIn } from "@middlewares";
import Bill from "@models/bill";

export async function POST(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      const { billItems, totalCost } = await req.json();
      const bill = [];

      for (let i = 0; i < billItems.length; i++) {
        if (
          billItems[i].name === "" ||
          billItems[i].quantity === 0 ||
          billItems[i].price === null ||
          billItems[i].itemId === null ||
          billItems[i.name] === null ||
          billItems[i].quantity === null ||
          billItems[i].price === undefined ||
          billItems[i].itemId === "" ||
          billItems[i].name === undefined ||
          billItems[i].quantity === undefined ||
          billItems[i].itemId === undefined
        ) {
          return new Response(
            JSON.stringify({ message: "Category already exists" }),
            {
              status: 500,
            }
          );
        }

        const billItem = {
          name: billItems[i].name,
          quantity: billItems[i].quantity,
          price: billItems[i].price,
          itemId: billItems[i].itemId,
        };

        bill.push(billItem);
      }

      const newBill = new Bill({
        billItems: bill,
        totalCost: totalCost,
        cashier: loggedUser._id,
      });

      await newBill.save();
      return new Response(JSON.stringify({ message: "Bill success" }), {
        status: 200,
      });
    } catch (err) {
      console.error(err);
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
