import { FcDataConfiguration } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditExistingCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/edit-existing-audio");
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl min-h-[200px]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold text-black">Manage Existing Audio(s)</h4>
        <FcDataConfiguration size={30} />
      </div>
      <button
        // onClick={handleClick}
        disabled={true}
        className="w-full py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:bg-cyan-400 transition duration-200 transform hover:scale-105 flex items-center justify-center"
      >
        <span className="mr-2">Coming Soon!</span>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default EditExistingCard;
