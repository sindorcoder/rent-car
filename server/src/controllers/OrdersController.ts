import Order from "../models/Orders";
import { Request, Response } from "express";
import User from "../models/User";
import Cars from "../models/Cars";

interface IOrder {
    getOrders(req: Request, res: Response): Promise<Response>;
    createOrder(req: Request, res: Response): Promise<Response>;
    updateOrder(req: Request, res: Response): Promise<Response>;
    getOrder(req: Request, res: Response): Promise<Response>;
    deleteOrder(req: Request, res: Response): Promise<Response>;
}

class OrdersController implements IOrder {
    async getOrders(req: Request, res: Response) {
        const user = req.user;

        let orders = []
        console.log(user)

        if(user?.role === "user") {

            orders = await Order.find({ user_id: user?.email }).populate("user_id").populate("car_id");

            return res.status(200).json({ message: "Get Orders", payload: orders });
        }

        orders = await Order.find().populate("user_id").populate("car_id");;
        return res.status(200).json({ message: "Get Orders", payload: orders });
    }

    async createOrder(req: Request, res: Response) {

        try {

            const email  = req.user?.email;

            const user = await User.findById(email);

            if (!user) return res.status(400).json({ message: "User does not exist" });

            if (user?.balance < req.body.total_price) return res.status(400).json({ message: "Insufficient balance" });

            const newBalance = user?.balance - req.body.total_price;

            await User.findOneAndUpdate(
                { _id: email },
                { balance: newBalance }
            );

            const owner = await User.findOne({ role: "owner" })

            if (!owner) return res.status(400).json({ message: "Owner does not exist" });

            await User.findOneAndUpdate(
                { role: "owner" },
                { balance: owner?.balance + req.body.total_price }
            );

            const order = await Order.create([req.body]);

            await Cars.findOneAndUpdate( { _id: req.body.car_id }, { status: "rented" } )

            if (!order) return res.status(400).json({ message: "Order not created" });

            return res.status(201).json({
                message: "Order created successfully",
                payload: order
            });
        }

        catch (err) {
            return res.status(400).json(err);
        }
    }

    async updateOrder(req: Request, res: Response) {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(order);
    }

    async getOrder(req: Request, res: Response) {
        const order = await Order.findById(req.params.id);
        return res.status(200).json(order);
    }

    async deleteOrder(req: Request, res: Response) {
        const order = await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json(order);
    }
}

export default OrdersController