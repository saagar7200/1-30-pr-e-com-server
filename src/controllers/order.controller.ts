import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Product from "../models/product.model";
import Order from "../models/order.model";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user._id;
  const { items } = req.body;

  const orderItems: { product: string; quantity: number }[] = JSON.parse(items);

  const orderProducts = orderItems.map(async (item) => {
    const product = await Product.findById(item.product);

    if (!product) {
      return null;
    }

    return {
      product: product._id,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity,
    };
  });

  const products = await Promise.all(orderProducts);

  const filteredItems = products.filter((item) => item !== null);

  const totalAmount = filteredItems
    .reduce((acc, item) => {
      return (acc += item?.totalPrice);
    }, 0)
    .toFixed(2);

  const order = new Order({ user, items: filteredItems, totalAmount });

  const newOrder = await (await order.save()).populate("items.product");

  res.status(201).json({
    message: "Order placed successfully",
    success: true,
    status: "success",
    data: newOrder,
  });
});


// get all orders (only admin)

// get all order for user (only user)

// delete order (admin, user)

// get order by id (user , admin )