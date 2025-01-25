import Background from "../components/Background";
import Login from "../components/Login";

const Auth = () => {
  return (
    <>
    <Background/>
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Login />
    </div>
    </>
  );
};

export default Auth;
