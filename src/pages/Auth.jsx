import Background from "../components/Background";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

const Auth = () => {
  return (
    <>
    <Background/>
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Navbar header={"Login Please!"}/>
      <Login />
    </div>
    </>
  );
};

export default Auth;
