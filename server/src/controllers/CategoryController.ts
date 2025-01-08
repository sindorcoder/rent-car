import { Request, Response } from "express";
import Category from "../models/Category";
import Cars from "../models/Cars";

interface ICategoryController {
    getCategories(req: Request, res: Response): Promise<Response>;
    createCategory(req: Request, res: Response): Promise<Response>;
    deleteCategory(req: Request, res: Response): Promise<Response>;
    updateCategory(req: Request, res: Response): Promise<Response>;
}

class CategoryController implements ICategoryController {

    async getCategories(req: Request, res: Response): Promise<Response> {
        try{
            const categories = await Category.find();
            return res.json({ message: "Get All Categories", payload: categories });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

    async createCategory(req: Request, res: Response): Promise<Response> {
        try{
            const category = await Category.create(req.body);
            return res.json({ message: "Successfully created new category", payload: category });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<Response> {
        try{
            const category = await Category.findByIdAndDelete({ _id: req.params.id });
            return res.json({ message: "Delete Category", payload: category });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

    async updateCategory(req: Request, res: Response): Promise<Response> {
        try{
            const category = await Category.findByIdAndUpdate({ _id: req.params.id }, req.body);
            return res.json({ message: "Update Category", payload: category });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }
}

export default CategoryController;