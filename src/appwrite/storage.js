import { Client, Query,Databases} from "appwrite";
import conf from "../conf/conf.js"

export class StorageService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.AppwriteEndpoint)
            .setProject(conf.AppwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async GetCategoryPage({pageNo,pageSize}){

        try{
            const offset = (pageNo-1) * pageSize;
            const limit = pageSize;
            const response = await this.databases.listDocuments(
                    conf.AppwriteDatabaseID,
                    conf.AppwriteCollectionCategoriesId,
                    [
                        Query.offset(offset),
                        Query.limit(limit)
                    ]
            );
            //console.log("Appwrite:GetCategoryPage:",response)
            return {categories:response.documents, total:response.total};
        }
        catch(e){
            console.log("Appwrite:GetCategoryPage:",e)
            throw e
        }

    }

    async SearchCategory({searchTerm}){

    }

    async AddCategory({categoryName,imageUrl}){

    }

    async DeleteCategory({categoryId}){

        try{
            const response = await this.databases.deleteDocument(
                                conf.AppwriteDatabaseID,
                                conf.AppwriteCollectionCategoriesId,
                                categoryId);
            console.log("Appwrite:DeleteCategory:",response)
        }
        catch(e){
            console.log("Appwrite:DeleteCategory:",e)
            throw e;
        }
        
    }

    async UpdateCategory({categoryId,categoryName,imageUrl}){
    }

}
