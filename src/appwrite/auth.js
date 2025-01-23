import { Client, Account } from "appwrite";
import conf from "../conf/conf.js"

export class AuthService {
    clinet = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.AppwriteEndpoint)
        .setProject(conf.AppwriteProjectId);
        this.account = new Account(this.client);
    }

    async Login({email,password}){
        try{
            return await this.account.createSession(email,password)
        }
        catch(error){
            console.log("Appwrite Error:Login:",error)
            throw error
        }

    }
    async Logout(){
        try{
            return await this.account.deleteSessions()
        }
        catch(error){
            console.log("Appwrite Error:Logout:",error)
            throw error
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get()
        }
        catch(error){
            console.log("Appwrite Error:getCurrentUser:",error)
            return null
        }
    }
}
