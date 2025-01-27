import AddNewCard from "../components/AddNewCard"
import Background from "../components/Background"
import EditExistingCard from "../components/EditExistingCard"
import Navbar from "../components/Navbar"

const LandingPage = ()=>{


    return(
        <>
        <Background/>
        <Navbar header={"Choose any action to perform!"}/>
        <div className="flex items-center min-h-screen min-w-screen justify-evenly">
            <AddNewCard/>
            <EditExistingCard/>
        </div>

        </>
    )
}
export default LandingPage