import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import  {s3Config} from "../config/config";
import {dotEnvConfig} from "../config/config";

dotEnvConfig();

const BUCKET_NAME = process.env.BUCKET_NAME as string;

export const deleteFile = async (filename: string) => {
    const deleteParams = {
        Bucket: BUCKET_NAME,
        Key: filename
    };

    const command = new DeleteObjectCommand(deleteParams);
    const response = await s3Config.send(command);
}