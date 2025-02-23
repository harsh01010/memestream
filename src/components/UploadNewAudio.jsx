import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import { StorageService } from "../appwrite/storage";
import {IoIosAddCircle} from "react-icons/io";
import { VscDiscard } from "react-icons/vsc";
import { ToastContainer, toast } from 'react-toastify';
const UploadNewAudio = ({categoryName,handleModalOpen}) => {
    const [audio, setAudio] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioName, setAudioName] = useState(null);
    const [loading, setLoading] = useState(false);

    const storageService = new StorageService();
    
    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        setAudio(file);
        setAudioUrl(URL.createObjectURL(file));
        setAudioName(file.name);
    };

    const handleDiscard = ()=>{
        setAudio(null);
        setAudioUrl(null);
        setAudioName(null);
    }
    
    const handleUpload = async () => {
       setLoading(true);
       try{
        const res = await storageService.UploadAudio({categoryName:categoryName, fileName:audioName,audioFile:audio});
       console.log(res);
       toast("Audio Uploaded Successfully");
       }
       catch(e){
        toast("Falied to upload");
       }
       finally{
        setAudio(null);
        setAudioName(null);
        setAudioUrl(null);
        setLoading(false);
       }
    };
    
    return (
        
        <div className="bg-zinc-600 p-3 rounded-lg w-full text-white absolute transform top-20">
        <button onClick={()=>handleModalOpen(false)}><IoCloseCircle size={30} className="text-red-500 cursor-pointer hover:text-red-700 transition" /></button>
       {!audio && (
                <div className="relative w-fit">
                    <input
                        type="file"
                        onChange={handleAudioChange}
                        accept="audio/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <IoAddCircle size={40} className="text-green-500 mr-2 cursor-pointer hover:text-green-700 transition" />
                </div>
            )}
        {audio && 
        <div>
        <button onClick={handleDiscard}><VscDiscard size={30} className="text-red-500 cursor-pointer hover:text-red-700 transition"  /></button>
        <button onClick={handleUpload}><MdCloudUpload size={30} className="text-green-500 mr-2 cursor-pointer hover:text-green-700 transition" /></button>
        </div>}
        {audioUrl && <audio src={audioUrl} controls />}
        </div>
    );
    };

    export default UploadNewAudio;