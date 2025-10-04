const Home = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-5xl mx-auto animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 tracking-tight">
          Coin<span className="text-gray-400">Collector</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Digitize your numismatic treasures and connect with expert appraisers
          in our premium collection management platform
        </p>

        <div className="max-w-lg mx-auto mb-12">
          <div className="glass rounded-3xl p-2">
            <img
              src="/Gemini_Generated_Image_3a36qa3a36qa3a36 (Edited).png"
              alt="Coin Collection"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="glass rounded-2xl p-8 max-w-sm">
            <div className="text-4xl mb-4">🪙</div>
            <h3 className="text-xl font-semibold text-white mb-2">Collect</h3>
            <p className="text-gray-400 font-light">
              Build and manage your digital coin collection
            </p>
          </div>
          <div className="glass rounded-2xl p-8 max-w-sm">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Evaluate</h3>
            <p className="text-gray-400 font-light">
              Get expert valuations from certified appraisers
            </p>
          </div>
          <div className="glass rounded-2xl p-8 max-w-sm">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-white mb-2">Track</h3>
            <p className="text-gray-400 font-light">
              Monitor your collection's value over time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;