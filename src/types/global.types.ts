import { Types } from "mongoose";

export enum Role {
    ADMIN='ADMIN',
    USER ='USER'
}

export interface JWTPayload {
    _id:Types.ObjectId;
    role:Role;
    email:string;
    full_name:string
}


export interface JWTPayloadDecoded extends JWTPayload {
iat:number;
exp:number
}