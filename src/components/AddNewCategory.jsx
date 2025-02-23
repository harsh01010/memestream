import { StorageService } from "../appwrite/storage";
import { useState } from "react";
import {IoIosAddCircle} from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
const AddNewCategory = ({CloseAddNewCategory})=>{
    const [CategoryName, setCategoryName] = useState("");
    const [CategoryImageUrl, setCategoryImageUrl] = useState("");
    const storageService = new StorageService();
    const addCategory = async ()=>{
        const res = await storageService.AddCategory({categoryName:CategoryName,imageUrl:CategoryImageUrl});
        CloseAddNewCategory(false);
    }
    return (
    <>
        <div className="bg-zinc-600 rounded-lg w-full  text-white absolute p-2 ">
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Category Name..."
                    value={CategoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="p-2 rounded-lg text-white w-full"
                />
                <input
                    type="text"
                    placeholder="Category Image URL..."
                    value={CategoryImageUrl}
                    onChange={(e) => setCategoryImageUrl(e.target.value)}
                    className="p-2 rounded-lg text-white w-full"
                />
               {CategoryName != '' && CategoryImageUrl != '' &&
                <IoIosAddCircle 
                    
                onClick={addCategory}
                className="text-5xl text-green-400 cursor-pointer hover:text-green-300 transition"
            />}
                <IoCloseCircle 
                    onClick={()=>CloseAddNewCategory(false)}
                    className="text-5xl text-red-400 cursor-pointer hover:text-red-300 transition"/>
            </div>
        </div>
    </>
    );
}
export default AddNewCategory;