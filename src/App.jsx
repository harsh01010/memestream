import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import AddNewPage from "./pages/AddNewPage";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}></Route>
        <Route path="/login" element={<Auth/>}></Route>
        <Route path='/home' element={<LandingPage/>}></Route>
          <Route path='/uploadAudio' element ={<AddNewPage/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    
    </BrowserRouter>
   
        
  );
}

export default App;
