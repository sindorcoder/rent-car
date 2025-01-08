import {Request, Response} from "express";
import {deleteFile} from "../helpers/delete-file";

interface IUploadController {
    uploadFile(req: Request, res: Response): Promise<Response>;
    uploadMultipleFiles(req: Request, res: Response): Promise<Response>;
    deleteFile(req: Request, res: Response): Promise<Response>;
}

class UploadController implements IUploadController {
    async uploadFile(req: Request, res: Response): Promise<Response> {
        if (req.file) {
            const fileLocation = (req.file as any).location as string;
            return res.json({ message: "File uploaded successfully", payload: fileLocation });
        }
        return res.status(400).send('No file uploaded!');
    }

    async uploadMultipleFiles(req: Request, res: Response): Promise<Response> {
        if (req.files && Array.isArray(req.files)) {
            const locations = req.files.map(file => {
                return (file as any).location;
            });
    
            return res.json({ message: "Files uploaded successfully", payload: locations });
        }

        return res.status(400).json({ message: "No files uploaded!" });
    }

    async deleteFile(req: Request, res: Response): Promise<Response> {
        const filename = req.params.filename;
        try {
            await deleteFile(filename);
            return res.json({ message: "File deleted successfully", payload: filename });
        } 
        catch (error) {
            return res.status(500).send("Internal Server Error");
        }
    }
}

export default UploadController