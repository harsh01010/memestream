
const conf = {
    AppwriteEndpoint: String(import.meta.env.VITE_APP_APPWRITE_ENDPOINT),
    AppwriteProjectId: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
    AppwriteDatabaseID: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),
    AppwriteCollectionCategoriesId: String(import.meta.env.VITE_APP_APPWRITE_COLLECTION_CATEGORIES_ID),
    AppwriteAudioCategoryMapId:String(import.meta.env.VITE_APP_APPWRITE_COLLECTION_AUDIOCATEGORYMAP_ID),
    AppwriteBucketAudioId: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_AUDIO_ID),
    AppwriteBucketImageId: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_IMAGE_ID),
}
export default conf