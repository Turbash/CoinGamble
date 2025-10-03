import { useEffect, useState } from "react";
import { addCoin, getMyCoins, getTotalValue } from "../api/axios";
import CoinCard from "../components/CoinCard";

const CollectorDashboard = () => {
  const [coins, setCoins] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [form, setForm] = useState({ name: "", year: "", country: "" });
  const [file, setFile] = useState(null);

  const fetchCoins = async () => {
    const data = await getMyCoins();
    setCoins(data);
    const val = await getTotalValue();
    setTotalValue(val.totalValue);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("year", form.year);
    fd.append("country", form.country);
    if (file) fd.append("photo", file);

    await addCoin(fd);
    fetchCoins();
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <h2 className="text-xl font-bold">My Coins</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 justify-center">
        <input name="name" placeholder="Coin Name" onChange={handleChange} required className="border p-2 rounded"/>
        <input name="description" placeholder="Description" onChange={handleChange}  required className="border p-2 rounded"/>
        <input name="year" placeholder="Year" onChange={handleChange} required className="border p-2 rounded"/>
        <input name="country" placeholder="Country" onChange={handleChange} required className="border p-2 rounded"/>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required className="border p-2 rounded bg-blue-950 hover:bg-blue-900 text-white"/>
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Add Coin</button>
      </form>

      <h3 className="text-lg font-semibold">Total Value: {totalValue}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {coins.map((c) => (
            <CoinCard key={c._id} coin={c} refresh={fetchCoins} />
        ))}
      </div>
    </div>
  );
};

export default CollectorDashboard;