import Navbar from "../components/Navbar";
import AddNew from "../components/AddNew";
import Background from "../components/Background";

const AddNewPage = () => {
    const headerMessage = "Add New Audio";
    return <>
        {/* <Background/> */}
        <Navbar header={headerMessage} />
        <AddNew/>
    </>
};

export default AddNewPage;

