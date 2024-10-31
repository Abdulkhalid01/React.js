import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{

    client = new Client();
    databases;
    Storage;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.client);
            this.Storage = new Storage(this.client);
    }   

    async createPost({title, sulg, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,                 
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive:: createPost:: error", error); 
            
        }
    }

    async updatePost(sulg, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,                 
                    content,
                    featuredImage,
                    status,
                }   
            )
        } catch (error) {
            console.log("Appwrite serive:: updatePost:: error", error);
        }
    }

    async deletePost(sulg){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                sulg
            )
            return true
            
        } catch (error) {
            console.log("Appwrite serive:: deletePost:: error", error);
            return false
            }  
        
        }
     async getPost(sulg){
            try {
                return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    sulg
                )
            } catch (error) {
                console.log("Appwrite serive:: getPost:: error", error);
                return false
            }
        }
    async getPosts(Queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Queries,
            )
        } catch (error) {
            console.log("Appwrite serive:: getPosts:: error", error);
            return false
        }
    }  
    
    // file uplod service

    async uploadFile(file){
        try {
            return await this.Storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive:: uploadFile:: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.Storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive:: deleteFile:: error", error);
            return false
        }
    }   

    getFilePreview(fileId){
        return this.Storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service();
export default service