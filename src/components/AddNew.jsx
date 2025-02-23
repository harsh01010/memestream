import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegArrowAltCircleRight,FaRegArrowAltCircleLeft  } from "react-icons/fa";
import AddNewCategory from "./AddNewCategory";
import { StorageService } from "../appwrite/storage";
import CategoryCard from "./CategoryCard"; 

const AddNew = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 6;
    const [pageNo, setPageNo] = useState(1);
    const [categories, setCategories] = useState({ categories: [], total: 0 });
    const [openAddnewCategoryComponent, setOpenAddnewCategoryComponent] = useState(false);

    const storageService = new StorageService();

    const loadPage = async (pgN, pgS) => {
        const res = await storageService.GetCategoryPage({ pageNo: pgN, pageSize: pgS });
        setCategories({ categories: res?.categories??[], total: res?.total??0 });
        console.log(res);
    };

    const handleSearch = async ()=>{
        const res = await storageService.SearchCategory({ searchTerm });
        setCategories({ categories: res.categories, total: res.total });
        console.log(res);
    }

    useEffect(() => {
        loadPage(pageNo, pageSize);
    }, [pageNo]);

    const handleSearchTermChange = (e) => setSearchTerm(e.target.value);
    const handleOpenAddNewCategory = (val) =>{ 
        if(val==false)
        {
            loadPage(pageNo, pageSize);
        }
        setOpenAddnewCategoryComponent(val)};

    return (
        <div className="bg-zinc-600 p-2 rounded-lg w-full max-w-md  text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Search Input */}
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    className="p-2 rounded-lg text-black w-full"
                />
                <GoSearch className="text-xl cursor-pointer" onClick={handleSearch} />
                <IoIosAddCircle 
                    onClick={() => handleOpenAddNewCategory(true)}
                    className="text-3xl text-green-400 cursor-pointer hover:text-green-300 transition"
                />
            </div>

            {/* Add New Category Component */}
            {openAddnewCategoryComponent && (
                <AddNewCategory CloseAddNewCategory={handleOpenAddNewCategory}  />
            )}

            {/* Category List */}
            <div className="flex flex-col gap-4">
                {categories.categories.length > 0 ? (
                    categories.categories.map((category, index) => (
                        <CategoryCard key={index} category={category} />
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No categories found.</p>
                )}
            </div>

            <div className="flex items-center justify-center p-1 rounded-lg  space-x-3">
  {pageNo > 1 && (
    <FaRegArrowAltCircleLeft
      className="hover:text-gray-800 cursor-pointer text-2xl"
      onClick={() => {
        pageNo <= Math.ceil(categories.total / pageSize)
          ? setPageNo(pageNo - 1)
          : setPageNo(Math.ceil(categories.total / pageSize));
      }}
    />
  )}
  <input
    type="number"
    value={pageNo}
    min={1}
    onChange={(e) => setPageNo(Number(e.target.value))}
    max={Math.ceil(categories.total / pageSize)}
    className="w-10 text-center border border-gray-300 rounded-md px-2 py-1 outline-none appearance-none 
               [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-transparent text-black"
  />
  {pageNo < Math.ceil(categories.total / pageSize) && (
    <FaRegArrowAltCircleRight
      className=" hover:text-gray-800 cursor-pointer text-2xl"
      onClick={() => {
        setPageNo(pageNo + 1);
      }}
    />
  )}
</div>

        </div>
    );
};

export default AddNew;
