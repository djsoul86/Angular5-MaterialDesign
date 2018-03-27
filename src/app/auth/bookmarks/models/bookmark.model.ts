import { User } from "./user.model";

export class BookMark{
    id:number;
    user_id:number;
    title:string;
    description:string;
    url:string;
    created:string;
    modified:string;
    user:User;
}