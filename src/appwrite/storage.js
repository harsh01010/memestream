import { Client, Query,Databases, ID,Storage} from "appwrite";
import conf from "../conf/conf.js"

export class StorageService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.AppwriteEndpoint)
            .setProject(conf.AppwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
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
        try{
            const response = await this.databases.listDocuments(
                conf.AppwriteDatabaseID,
                conf.AppwriteCollectionCategoriesId,
                [
                    Query.search("CategoryName", searchTerm)
                ]
        );
        //console.log("Appwrite:GetCategoryPage:",response)
        return {categories:response.documents, total:response.total};
        }
        catch(e){
            console.log("Appwrite:SearchCategory:",e)
            throw e;
        }
    }

    async AddCategory({categoryName,imageUrl}){
        try{
            const response = await this.databases.createDocument(
                conf.AppwriteDatabaseID,
                conf.AppwriteCollectionCategoriesId,
                ID.unique(),
                {
                    CategoryName: categoryName,
                    CategoryImageUrl: imageUrl
                }
            );
        }
        catch(e){
            console.log("Appwrite:AddCategory:",e)
            throw e;
        }
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

    async UploadAudio({categoryName,fileName,audioFile}){
        try{
            console.log("Appwrite:UploadAudio:",categoryName,fileName);
            const customId = `${categoryName}-${fileName}`;
            const response = await this.storage.createFile(
                conf.AppwriteBucketAudioId,
                customId,
                audioFile
            );
            return response;
        }
        catch(e){
            console.log("Appwrite:UploadAudio:",e)
            throw e;
        }
    }
}
