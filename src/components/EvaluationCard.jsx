import React from 'react'

const EvaluationCard = ({coin, handleEvaluate}) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  return (
    <div className="glass rounded-3xl p-8 hover:bg-gray-900/20 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-1">
            <img 
              src={`${backendUrl}${coin.photoUrl}`} 
              alt={coin.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
            PENDING
          </div>
        </div>
        
        <div className="text-center space-y-4 w-full">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{coin.name}</h3>
            <div className="flex justify-center items-center space-x-4 text-gray-400">
              <span className="font-medium">{coin.year}</span>
              <span>•</span>
              <span className="font-medium">{coin.country}</span>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed font-light px-2">{coin.description}</p>
          
          <div className="pt-4">
            <button 
              className="w-full bg-white text-black py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
              onClick={() => handleEvaluate(coin)}
            >
              Evaluate Coin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationCard;