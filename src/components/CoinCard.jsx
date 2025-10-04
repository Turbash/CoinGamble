import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCoin } from "../api/axios";
import { toast } from "react-toastify";

const CoinCard = ({ coin, refresh }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCoin(coin._id);
      toast.success("Coin deleted successfully");
      setShowDeleteModal(false);
      if (refresh) refresh();
    } catch (error) {
      toast.error("Error deleting coin");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/collector/edit/${coin._id}`);
  };

  return (
    <>
      <div className="glass rounded-3xl p-6 md:p-8 hover:bg-gray-900/20 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in">
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-1">
              <img 
                src={`${import.meta.env.VITE_BACKEND_URL}${coin.photoUrl}`} 
                alt={coin.name} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {coin.evaluated && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                ✓ VALUED
              </div>
            )}
          </div>
          
          <div className="text-center space-y-3 md:space-y-4 w-full">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{coin.name}</h3>
              <div className="flex justify-center items-center space-x-4 text-gray-400 text-sm md:text-base">
                <span className="font-medium">{coin.year}</span>
                <span>•</span>
                <span className="font-medium">{coin.country}</span>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base px-2">{coin.description}</p>
            
            <div className="bg-gray-900/50 rounded-2xl p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-400 mb-1">Current Value</p>
              <p className="text-xl md:text-2xl font-bold">
                {coin.evaluated ? (
                  <span className="text-green-400">${coin.value?.toLocaleString()}</span>
                ) : (
                  <span className="text-gray-500">Awaiting Evaluation</span>
                )}
              </p>
            </div>
            
            {!coin.evaluated && (
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button 
                  className="flex-1 bg-white text-black py-3 px-4 md:px-6 rounded-2xl font-semibold text-sm md:text-base hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                  onClick={handleEdit}
                >
                  Edit Details
                </button>
                <button 
                  className="flex-1 bg-gray-800 text-white py-3 px-4 md:px-6 rounded-2xl font-semibold text-sm md:text-base hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-6 md:p-8 max-w-md w-full animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl md:text-3xl">⚠️</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Delete Coin</h3>
              <p className="text-gray-300 mb-2 font-light">
                Are you sure you want to delete <span className="font-semibold text-white">"{coin.name}"</span>?
              </p>
              <p className="text-gray-500 text-sm mb-8">This action cannot be undone.</p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-red-700 disabled:opacity-50 transition-all duration-200"
                >
                  {loading ? "Deleting..." : "Delete Forever"}
                </button>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  disabled={loading}
                  className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-700 disabled:opacity-50 transition-all duration-200"
                >
                  Keep Coin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinCard;