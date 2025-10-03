import { useEffect, useState } from "react";
import { getPendingCoins, evaluateCoin } from "../api/axios";

const ExpertDashboard = () => {
  const [pending, setPending] = useState([]);

  const fetchPending = async () => {
    const data = await getPendingCoins();
    setPending(data);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleEvaluate = async (id) => {
    const value = prompt("Enter coin value:");
    if (!value) return;
    await evaluateCoin(id, Number(value));
    fetchPending();
  };

  return (
    <div>
      <h2>Pending Coin Evaluations</h2>
      <ul>
        {pending.map((c) => (
          <li key={c._id}>
            {c.name} ({c.year}) – {c.country} 
            <button onClick={() => handleEvaluate(c._id)}>Evaluate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertDashboard;
