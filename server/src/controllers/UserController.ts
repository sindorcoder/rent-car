import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUserController {
    getUsers(req: Request, res: Response): Promise<Response>;
    getUser(req: Request, res: Response): Promise<Response>;
    createUser(req: Request, res: Response): Promise<Response>;
    deleteUser(req: Request, res: Response): Promise<Response>;
    updateUser(req: Request, res: Response): Promise<Response>;
    promoteUser(req: Request, res: Response): Promise<Response>;
}

class UserController implements IUserController {
     async getUsers(req: Request, res: Response): Promise<Response> {
       try{
        const users = await User.find({});
        return res.json({ message: "Get Users", payload: users});
       }
       catch(err: any) {
        return res.status(500).json({ message: err.message });
       }
    }

     async getUser(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }
        
            const user = await User.findById({ _id: req.params.id });
            if(!user) return res.status(404).json({ message: "User not found" });
            
            return res.json({ message: "Get User", payload: user });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

     async createUser(req: Request, res: Response): Promise<Response> {
        try{
            let user = await User.findOne({ email: req.body.email }, 'email').lean();
            
            if(user) return res.status(400).json({ message: "User already exists", payload: user });

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
            user = await User.create({...req.body, password: hashPassword});

            return res.json({ message: "Successfully created new user", payload: user });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

     async deleteUser(req: Request, res: Response): Promise<Response> { 
        try{

            const { id } = req.params;
            
            let user = await User.findById({ _id: id });

            if(user?.role === "admin") return res.status(400).json({ message: "User cannot be deleted" });

            user = await User.findByIdAndDelete({ _id: req.params.id });
            return res.json({ message: "Delete User", payload: user });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

     async updateUser(req: Request, res: Response): Promise<Response> {
        try{
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
            return res.json({ message: "Update User", payload: user });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

     async promoteUser(req: Request, res: Response): Promise<Response> {
        try{
            let user = await User.findById({ _id: req.params.id });

            if(!user) return res.status(404).json({ message: "User not found" });

            if(user?.role === "admin" || user?.role === "owner") return res.status(400).json({ message: "User cannot be promoted" });

            user = await User.findByIdAndUpdate({ _id: req.params.id }, { role: "admin" }, { new: true });

            return res.json({ message: "Successfully promoted user", payload: user });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }
}

export default UserController;