import { Response, Request } from "express";
import Car from "../models/Cars";
import mongoose from "mongoose"

interface ICarController {
    getCarsByQuery(req: Request, res: Response): Promise<Response>;
    createCar(req: Request, res: Response): Promise<Response>;
    getCar(req: Request, res: Response): Promise<Response>;
    deleteCar(req: Request, res: Response): Promise<Response>;
    updateCar(req: Request, res: Response): Promise<Response>;
    searchCars(req: Request, res: Response): Promise<Response>;
}

class CarController implements ICarController { 
    async getCarsByQuery(req: Request, res: Response): Promise<Response> {
        try {
            let categoryIds: string[] | undefined = req.query.categories
                ? (req.query.categories as string).split(',').map(id => id.trim())
                : undefined;
            const models: string[] | undefined = req.query.model
                ? (req.query.model as string).split(',').map(model => model.trim())
                : undefined;
            const seats: number[] | undefined = req.query.seats
                ? (req.query.seats as string).split(',').map(seat => parseInt(seat.trim()))
                : undefined;
        
            if (categoryIds) {
                if (categoryIds.some(id => typeof id !== 'string' || !id)) {
                    return res.status(400).json({ message: 'Invalid category IDs provided' });
                }
            }
        
            if (models) {
                if (models.some(model => typeof model !== 'string' || !model)) {
                    return res.status(400).json({ message: 'Invalid models provided' });
                }
            }
        
            if (seats) {
                if (seats.some(seat => isNaN(seat))) {
                    return res.status(400).json({ message: 'Invalid seats value provided' });
                }
            }
        
            const query: any = {};
        
            if (categoryIds) {
                query.category = { $in: categoryIds };
            }
        
            if (models) {
                query.model = { $in: models };
            }
        
            if (seats) {
                query.seats = { $in: seats };
            }
        
            const cars = await Car.find(query);
        
            return res.json({ message: 'Get Cars by Categories, Models, and Seats', payload: cars });
        
        } catch (err: any) {
            console.error('Error fetching cars:', err); 
            return res.status(500).json({ message: err.message });
        }
    }   

    async createCar(req: Request, res: Response): Promise<Response> {
        try{
            const car = await Car.create(req.body);
            return res.json({ message: "Successfully created new car", payload: car });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

    async getCar(req: Request, res: Response): Promise<Response> {
        try{

            const { id } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }
            
            const car = await Car.findById({ _id: req.params.id });
            if(!car) return  res.status(404).json({ message: "Category not found" });
            return res.json({ message: "Get Car", payload: car });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

    async deleteCar(req: Request, res: Response): Promise<Response> {
        try{
            const car = await Car.findByIdAndDelete({ _id: req.params.id });
            return res.json({ message: "Delete Car", payload: car });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

    async updateCar(req: Request, res: Response): Promise<Response> {
        try{
            const car = await Car.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
            return res.json({ message: "Successfully updated car", payload: car });
        }
        catch(err: any){
            return res.status(500).json({ message: err.message });
        }
    }

    async searchCars(req: Request, res: Response): Promise<Response> {
        try {

            const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
            const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
            const skip = (page - 1) * limit;

            const searchQuery = req.query.q as string;
    
            const cars = await Car.find({
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { model: { $regex: searchQuery, $options: "i" } }
                ]
            })
            .skip(skip)
            .limit(limit);

            const totalCars = await Car.countDocuments({
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { model: { $regex: searchQuery, $options: "i" } }
                ]
            });

            return res.json({
                message: "Search Cars",
                payload: cars,
                totalPages: Math.ceil(totalCars / limit),
                currentPage: page,
                totalCars: totalCars
            });
    
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }
}

export default CarController;