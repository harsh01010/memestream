import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}></Route>
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    
    </BrowserRouter>
   
        
  );
}

export default App;
