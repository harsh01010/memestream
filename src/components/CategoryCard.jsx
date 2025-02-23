import { RiDeleteBin6Line } from "react-icons/ri";
import {IoIosAddCircle} from "react-icons/io";
import UploadNewAudio from "./UploadNewAudio";
import { useState } from "react";

const CategoryCard = ({ category }) => {
    const [openUploadAudioComponent, setOpenUploadAudioComponent] = useState(false);
    const hanldeOpenUploadAudioComponent = (val) => setOpenUploadAudioComponent(val);

    return (
        <div className="flex items-center justify-between p-1 bg-white rounded-lg shadow-md border hover:shadow-lg transition w-full h-[40px]">
            {/* Category Image */}
            <img 
                src={category?.CategoryImageUrl} 
                alt={category?.CategoryName} 
                className="w-8 h-8 rounded-full object-cover border"
            />

            {/* Category Name */}
            <span className="text-sm font-medium text-gray-800 flex-1 text-center truncate">
                {category?.CategoryName}
            </span>

            {/* Add new Audio in this category */}
            <IoIosAddCircle className="text-green-500 text-2xl mr-2 cursor-pointer hover:text-green-700 transition" 
            onClick={()=>hanldeOpenUploadAudioComponent(true)}/>
            {openUploadAudioComponent && <UploadNewAudio categoryName={category?.CategoryName} handleModalOpen={hanldeOpenUploadAudioComponent}/>}
            {/* Delete Icon */}
            <RiDeleteBin6Line className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition" />
        </div>
    );
};

export default CategoryCard;
