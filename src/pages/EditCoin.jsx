import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateCoin, getCoinById } from "../api/axios";
import { toast } from "react-toastify";

const EditCoin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState(null);
  const [form, setForm] = useState({
    name: "",
    year: "",
    country: "",
    description: ""
  });

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const data = await getCoinById(id);
        setCoin(data);
        setForm({
          name: data.name,
          year: data.year,
          country: data.country,
          description: data.description
        });
      } catch (error) {
        toast.error("Error fetching coin details");
        navigate("/collector");
      }
    };
    fetchCoin();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCoin(id, form);
      toast.success("Coin updated successfully");
      navigate("/collector");
    } catch (error) {
      toast.error("Error updating coin");
    } finally {
      setLoading(false);
    }
  };

  if (!coin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="glass rounded-3xl p-6 md:p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white text-lg md:text-xl font-light">Loading coin details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Edit Coin</h1>
          <p className="text-gray-400 text-lg md:text-xl font-light">Update your coin information</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
          <div className="flex justify-center order-2 xl:order-1">
            <div className="glass rounded-3xl p-6 md:p-8 w-full max-w-lg">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center">Live Preview</h3>
              <div className="text-center space-y-4 md:space-y-6">
                <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-1">
                  <img 
                    src={`${import.meta.env.VITE_BACKEND_URL}${coin.photoUrl}`} 
                    alt={coin.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{form.name}</h4>
                  <div className="flex justify-center items-center space-x-4 text-gray-400 text-base md:text-lg">
                    <span>{form.year}</span>
                    <span>•</span>
                    <span>{form.country}</span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base">{form.description}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 order-1 xl:order-2">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Edit Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold">Coin Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-base md:text-lg"
                  placeholder="Enter coin name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold">Year</label>
                <input
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-base md:text-lg"
                  placeholder="Enter year"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold">Country</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-base md:text-lg"
                  placeholder="Enter country"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white text-sm font-semibold">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 text-base md:text-lg resize-none"
                  rows="5"
                  placeholder="Enter description"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-white text-black py-4 px-6 rounded-2xl font-bold text-base md:text-lg hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/collector")}
                  className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-2xl font-bold text-base md:text-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoin;
