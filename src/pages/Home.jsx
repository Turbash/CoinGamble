import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 mt-14 gap-2">
      <ToastContainer />
      <h1 className="text-4xl font-bold">Welcome to Coin Collector</h1>
      <p className="text-xl mb-4">Track your collection and let experts evaluate it.</p>
      <img src="/Gemini_Generated_Image_3a36qa3a36qa3a36 (Edited).png" alt="Coin Collector" className="w-full max-w-md rounded-lg shadow-md" />
    </div>
  );
};

export default Home;