import { useState, useEffect, useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { AuthService } from "../appwrite/auth";
import { FaUserCircle } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";

const Navbar = ({ header }) => {

  const location = useLocation();
  const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const menuRef = useRef(null);
  
  const authService = new AuthService();
  const appName = "Admin Portal";
  
  useEffect(() => {
    async function loginStatus() {
      setCurrentRoute(location.pathname);
      try {
        const userDetails = await authService.getCurrentUser();
        setUser({
          name: userDetails.name,
          email: userDetails.email,
          id: userDetails.$id,
          phone: userDetails.phone,
        });
      } catch (e) {
        console.log("Error: fetching loginStatus:", e);
      }
    }
    loginStatus();
  }, [location.pathname]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        console.log(menuRef);
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);


  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await authService.Logout(); 
      setUser(null);
      navigate("/login");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <nav className="w-[40vw] bg-white/70 text-black p-4 fixed top-0 right-0 flex justify-between items-center z-50 shadow-lg backdrop-blur-lg rounded-l-lg">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{appName}</h3>
        <p className="text-sm font-light">{header}</p>
      </div>
      <div className="flex items-center">
        {(currentRoute !== "/" && currentRoute !== "/login") &&
          (!user ? (
            <IoLogIn
              className="text-2xl cursor-pointer hover:text-gray-700"
              title="Login"
            />
          ) : (
            <div
            ref={menuRef}
            >
                <FaUserCircle
              className="text-2xl cursor-pointer hover:text-gray-700 fixed-height fixed-width"
              onClick={handleShowMenu}
              title="User Menu"
            />

            {showMenu &&  (
          <div
          
            className="absolute right-4 top-16 w-48 bg-white text-black rounded-lg shadow-md p-4 z-50"
          >
            <h4 className="font-semibold text-lg mb-2">Hello, {user?.name}</h4>
            <p className="text-sm text-gray-700">
              {user?.email}, {user?.phone}
            </p>
            <ul className="mt-4">
            <li
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        ) }


            </div>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
