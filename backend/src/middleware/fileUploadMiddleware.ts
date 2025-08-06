import { NextFunction, Request, Response } from "express";
import fs from "fs";

export const fileUploadMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (req.file) {
            // Convert image to base64
            const imageBuffer = fs.readFileSync(req.file.path);
            const base64Image = imageBuffer.toString('base64');
            const mimeType = req.file.mimetype;
            const dataUrl = `data:${mimeType};base64,${base64Image}`;
            
            req.image = dataUrl;
            
            // Clean up the temporary file
            fs.unlinkSync(req.file.path);
            
            console.log("Image converted to base64 and stored");
        } else {
            req.image = undefined;
        }
        next();
    } catch (error) {
        console.error("File upload error:", error);
        // Don't fail the request, just set image to undefined
        req.image = undefined;
        next();
    }
};
