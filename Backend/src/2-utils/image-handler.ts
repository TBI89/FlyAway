import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";

// Save image & generate unique uuid:
async function saveImage(image: UploadedFile): Promise<string> {
    if (!image) return "no-image-was-uploaded.png"; // Check if an image has been sent from the frontend.
    const imageExtension = image.name.substring(image.name.lastIndexOf(".")); // Take file extension. 
    const imageName = uuid() + imageExtension; // Generate uuid + file extension in the end.
    const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName); // Get full file path.
    await image.mv(absolutePath); // Save file.
    return imageName;
}

// Update image:
async function updateImage(image: UploadedFile, oldImage: string): Promise<string> {
    await deleteImage(oldImage); // Remove old image.
    const imageName = await saveImage(image); // Save current image.
    return imageName;
}

// Delete image:
async function deleteImage(oldImage: string): Promise<void> {
    try {
        if (!oldImage) return;
        const absolutePath = path.join(__dirname, "..", "assets", "images", oldImage); // Get absolute path.
        await fsPromises.rm(absolutePath); // Remove old image.
    }
    catch (err: any) {
        console.log(err.message);
    }
}

export default {
    saveImage,
    updateImage,
    deleteImage
};