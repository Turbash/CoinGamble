import { useEffect, useState } from "react";
import { addCoin, getMyCoins, getTotalValue } from "../api/axios";
import { toast } from "react-toastify";
import CoinCard from "../components/CoinCard";

const CollectorDashboard = () => {
  const [coins, setCoins] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [form, setForm] = useState({ 
    name: "", 
    year: "", 
    country: "", 
    description: "" 
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    try {
      const data = await getMyCoins();
      setCoins(data);
      const val = await getTotalValue();
      setTotalValue(val.totalValue);
    } catch (error) {
      toast.error("Error fetching coins");
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a photo");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("year", form.year);
      fd.append("country", form.country);
      fd.append("photo", file);

      await addCoin(fd);
      toast.success("Coin added successfully");
      setForm({ name: "", year: "", country: "", description: "" });
      setFile(null);
      fetchCoins();
    } catch (error) {
      toast.error("Error adding coin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">My Collection</h1>
          <div className="glass rounded-2xl p-4 md:p-6 max-w-md mx-auto">
            <p className="text-gray-400 text-base md:text-lg mb-2 font-light">Total Portfolio Value</p>
            <p className="text-3xl md:text-4xl font-bold text-white">${totalValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">Add New Coin</h2>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="block text-white text-sm font-semibold mb-3">Coin Name</label>
                  <input 
                    name="name" 
                    placeholder="e.g., Morgan Silver Dollar" 
                    value={form.name}
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-base md:text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white text-sm font-semibold mb-3">Year</label>
                  <input 
                    name="year" 
                    type="number"
                    placeholder="e.g., 1921" 
                    value={form.year}
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-base md:text-lg"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold mb-3">Country of Origin</label>
                <input 
                  name="country" 
                  placeholder="e.g., United States" 
                  value={form.country}
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-base md:text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold mb-3">Description</label>
                <textarea 
                  name="description" 
                  placeholder="Describe condition, rarity, and notable features..." 
                  value={form.description}
                  onChange={handleChange} 
                  required 
                  rows="4"
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-base md:text-lg resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold mb-3">High-Quality Photo</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])} 
                  required 
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 transition-all"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black py-4 px-6 md:px-8 rounded-2xl font-bold text-base md:text-lg hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {loading ? "Adding to Collection..." : "Add to Collection"}
              </button>
            </form>
          </div>
        </div>

        {coins.length === 0 ? (
          <div className="text-center py-16 md:py-20">
            <div className="glass rounded-3xl p-8 md:p-12 max-w-md mx-auto">
              <div className="text-6xl md:text-8xl mb-6 md:mb-8">🪙</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Start Your Collection</h3>
              <p className="text-gray-400 text-base md:text-lg font-light">Add your first coin to begin building your digital numismatic portfolio</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {coins.map((coin) => (
              <CoinCard key={coin._id} coin={coin} refresh={fetchCoins} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectorDashboard;