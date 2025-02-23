import Navbar from "../components/Navbar";
import AddNew from "../components/AddNew";
import Background from "../components/Background";
import { ToastContainer } from "react-toastify";

const AddNewPage = () => {
    const headerMessage = "Add New Audio";
    return <>
        <Background/>
        <ToastContainer/>
        <Navbar header={headerMessage} />
        
        <AddNew/>
    </>
};

export default AddNewPage;

