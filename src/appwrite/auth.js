import { Client, Account } from "appwrite";
import conf from "../conf/conf.js"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.AppwriteEndpoint)
            .setProject(conf.AppwriteProjectId);
        this.account = new Account(this.client);
    }

    async Login({email,password}){
        try{
            return await this.account.createEmailPasswordSession("atulharsh273@gmail.com","12345678")
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
        catch(e){
            console.log("Appwrite Error:Logout:",e)
            throw e
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
