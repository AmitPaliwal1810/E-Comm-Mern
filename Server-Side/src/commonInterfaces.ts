import { Request } from "express";
export interface CustomeError extends Error {
  status: number;
}

export interface ExtenedRequest extends Request {
  user_id: string;
  user_role: string;
}

export interface ImageUploadRequest extends Request {
  file: {
    fieldname: "image";
    originalname: string;
    encoding: string;
    mimetype: "image/jpeg";
    destination: "uploads/";
    filename: string;
    path: string;
    size: number;
  };
}
