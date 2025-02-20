import { useState,useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import AddNewCategory from "./AddNewCategory";
import { StorageService } from "../appwrite/storage";


const AddNew = ()=>{
    const [searchTerm,setSearchTerm] = useState('');
    const pageSize = 10;
    const [pageNo,setPageNo] = useState(1);
    const [categories,setCategories] = useState({categories:[],total:0});
    const [openAddnewCategoryComponent, setOpenAddnewCategoryComponent] = useState(false);



    const storageServie = new StorageService();
    const loadPage = async (pgN,pgS)=>{
      const res = await storageServie.GetCategoryPage({pageNo:pgN,pageSize:pgS});
      setCategories({categories:res.categories,total:res.total});
      console.log(res);
    }
    useEffect(()=>{
      const getData = async ()=>{
        loadPage(pageNo,pageSize);
      }
      getData();
    },[]);
    const handleSearchTermChange = (e)=>{setSearchTerm(()=>e.target.value)};
    const HandleOpenAddNewCategory = (val)=>{setOpenAddnewCategoryComponent(()=>val)};
    return (<div className="bg-zinc-600 inline-block">
        <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        />
        <div><GoSearch/><IoIosAddCircle onClick={()=>HandleOpenAddNewCategory(true)}/></div>
        {openAddnewCategoryComponent && <AddNewCategory CloseAddNewCategory={HandleOpenAddNewCategory} />}
      
      <ul>
        {}
      </ul>
    </div>);

}

export default AddNew;