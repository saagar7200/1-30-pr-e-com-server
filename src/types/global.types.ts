import { Schema, Types } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}



export enum OrderStatus {
  PENDING="Pending",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  COMPLETED = "Completed",
  CANCELED = "Canceled"
}

export const onlyAdmin = [Role.ADMIN];
export const onlyUser = [Role.USER];
export const onlyAdminAndUser = [Role.ADMIN, Role.USER];

export interface IImages {
  path: string;
  public_id: string;
  _id?: Schema.Types.ObjectId;
}

export interface JWTPayload {
  _id: Types.ObjectId;
  role: Role;
  email: string;
  first_name: string;
  last_name: string;
}

export interface JWTPayloadDecoded extends JWTPayload {
  iat: number;
  exp: number;
}


export interface EmailOptions {
  to:string;
  subject:string,
  html:string
}