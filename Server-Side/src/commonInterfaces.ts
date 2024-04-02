import { Request } from "express";
export interface CustomeError extends Error {
  status: number;
}

export interface ExtenedRequest extends Request {
  user_id: string;
  user_role: string
}
