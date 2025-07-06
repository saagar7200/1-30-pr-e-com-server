import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Product from "../models/product.model";
import Order from "../models/order.model";
import CustomError from "../middlewares/error-handler.middleware";

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
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const allOrders = await Order.find()
      .populate("user", "-password")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All orders fetched",
      status: "success",
      success: true,
      data: allOrders,
    });
  }
);

// get all order for user (only user)
export const getAllByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user._id;

    const allOrders = await Order.find({ user })
      .populate("user", "-password")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All orders fetched",
      status: "success",
      success: true,
      data: allOrders,
    });
  }
);

// delete order (admin)
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.id;

  const deletedOrder = await Order.findByIdAndDelete(orderId);

  if (!deletedOrder) {
    throw new CustomError("Order not found", 400);
  }
  res.status(200).json({
    message: "Order deleted successfully.",
    status: "success",
    success: true,
    data: deletedOrder,
  });
});

// get order by id (user , admin )

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.id;

  const order = await Order.findById(orderId)
    .populate("user", "-password")
    .populate("items.product");

  res.status(200).json({
    message: "Order fetched",
    status: "success",
    success: true,
    data: order,
  });
});
