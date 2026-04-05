import ImageKit from '@imagekit/nodejs';
import { toFile } from "@imagekit/nodejs"
import config from '../config/config.js';

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export const uploadFile = async (file) => {
    const result = await client.files.upload({
        file: await toFile(file.buffer, file.originalname),
        fileName: file.originalname,
        folder:"/applications/resume"
    });

    return result
}