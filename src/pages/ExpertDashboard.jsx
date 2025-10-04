import { useEffect, useState } from "react";
import { getPendingCoins, evaluateCoin } from "../api/axios";
import { toast } from "react-toastify";
import EvaluationCard from "../components/EvaluationCard";

const ExpertDashboard = () => {
  const [pending, setPending] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [evaluationValue, setEvaluationValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const fetchPending = async () => {
    try {
      const data = await getPendingCoins();
      setPending(data);
    } catch (error) {
      toast.error("Error fetching pending coins");
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleEvaluate = (coin) => {
    setSelectedCoin(coin);
    setEvaluationValue("");
    setShowModal(true);
  };

  const handleValueSubmit = () => {
    if (!evaluationValue || isNaN(evaluationValue) || Number(evaluationValue) <= 0) {
      toast.error("Please enter a valid positive number for the coin value");
      return;
    }
    setShowModal(false);
    setShowConfirmation(true);
  };

  const confirmEvaluation = async () => {
    try {
      await evaluateCoin(selectedCoin._id, Number(evaluationValue));
      toast.success("Coin evaluated successfully");
      setShowConfirmation(false);
      setSelectedCoin(null);
      setEvaluationValue("");
      fetchPending();
    } catch (error) {
      toast.error("Error evaluating coin. Please try again");
    }
  };

  const cancelEvaluation = () => {
    setShowModal(false);
    setShowConfirmation(false);
    setSelectedCoin(null);
    setEvaluationValue("");
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">Expert Dashboard</h1>
          <p className="text-lg md:text-xl text-gray-400 font-light">Evaluate pending coin submissions</p>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-16 md:py-20">
            <div className="glass rounded-3xl p-8 md:p-12 max-w-md mx-auto">
              <div className="text-6xl md:text-8xl mb-6 md:mb-8">✅</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">All Caught Up!</h3>
              <p className="text-gray-400 text-base md:text-lg font-light">No pending evaluations at the moment.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {pending.map((coin) => (
              <EvaluationCard 
                key={coin._id} 
                coin={coin} 
                handleEvaluate={handleEvaluate} 
              />
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-3xl p-6 md:p-8 max-w-md w-full animate-fade-in">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Evaluate Coin</h3>
              
              <div className="mb-6 text-center">
                <p className="text-white mb-2 text-lg">
                  <span className="font-semibold">{selectedCoin?.name}</span> ({selectedCoin?.year})
                </p>
                <p className="text-gray-400">{selectedCoin?.country}</p>
              </div>
              
              <div className="space-y-2 mb-8">
                <label className="block text-white text-sm font-semibold">
                  Enter Coin Value (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={evaluationValue}
                  onChange={(e) => setEvaluationValue(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-lg"
                  placeholder="e.g., 125.50"
                  autoFocus
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleValueSubmit}
                  className="flex-1 bg-white text-black py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all duration-200"
                >
                  Continue
                </button>
                <button
                  onClick={cancelEvaluation}
                  className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-700 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-3xl p-6 md:p-8 max-w-md w-full animate-fade-in border border-yellow-500/30">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Confirm Evaluation</h3>
              </div>
              
              <div className="space-y-3 mb-8 text-center">
                <p className="text-white">
                  <span className="font-semibold">Coin:</span> {selectedCoin?.name} ({selectedCoin?.year})
                </p>
                <p className="text-white">
                  <span className="font-semibold">Country:</span> {selectedCoin?.country}
                </p>
                <p className="text-white text-xl">
                  <span className="font-semibold">Evaluation Value:</span> <span className="text-green-400">${evaluationValue}</span>
                </p>
                <p className="text-gray-400 text-sm mt-4">
                  This action cannot be undone. The coin will be marked as evaluated.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={confirmEvaluation}
                  className="flex-1 bg-green-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all duration-200"
                >
                  Confirm Evaluation
                </button>
                <button
                  onClick={cancelEvaluation}
                  className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-700 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertDashboard;
