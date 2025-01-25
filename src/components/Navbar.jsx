import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthService } from "../appwrite/auth";
import { FaUserCircle } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";

const Navbar = ({ header }) => {
  const authService = new AuthService();
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
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
  }, []);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <nav className="w-[40vw] bg-white/70 text-black p-4 fixed top-0 right-0 flex justify-between items-center z-50 shadow-lg backdrop-blur-lg rounded-l-lg">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{appName}</h3>
        <p className="text-sm font-light">{header}</p>
      </div>
      <div className="flex items-center space-x-4">
        {(currentRoute !== "/" || currentRoute !== "/login") &&
          (!user ? (
            <IoLogIn
              className="text-2xl cursor-pointer hover:text-gray-700"
              title="Login"
            />
          ) : (
            <FaUserCircle
              className="text-2xl cursor-pointer hover:text-gray-700"
              onClick={handleShowMenu}
              title="User Menu"
            />
          ))}

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md p-4 z-50">
            <h4 className="font-semibold text-lg mb-2">Hello, {user?.name}</h4>
            <span className="block text-sm text-gray-500">{user?.id}</span>
            <p className="text-sm text-gray-700">
              {user?.email}, {user?.phone}
            </p>
            <ul className="mt-4">
              <li className="cursor-pointer text-blue-600 hover:underline">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
