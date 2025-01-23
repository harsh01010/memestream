import App from "../App"

const conf=  {
    AppwriteProjectId:String(process.env.VITE_APP_APPWRITE_PROJECT_ID),
    AppwriteDatabaseID: String(process.env.VITE_APP_APPWRITE_DATABASE_ID),
    AppwriteCollectionCategoriesId: String(process.env.VITE_APP_APPWRITE_COLLECTION_CATEGORIES_ID),
    AppwriteBucketAudioId: String(process.env.VITE_APP_APPWRITE_BUCKET_AUDIO_ID),
    AppwriteBucketImageId: String(process.env.VITE_APP_APPWRITE_BUCKET_IMAGE_ID),
}
export default conf