const CoinCard = ({ coin }) => {
  return (
    <div className="border p-4 rounded shadow-md w-80 flex flex-col items-center gap-2 bg-green-600">
      <img 
        src={`/digital-currency-indian-rupee-symbol-golden-coin.png`} 
        alt={coin.name} 
        width="150"
      />
      <h4>{coin.name} ({coin.year})</h4>
      <p>{coin.description}</p>
      <p>{coin.country}</p>
      <p>{coin.evaluated ? `Value: ${coin.value}` : "Pending evaluation"}</p>
    </div>
  );
};

export default CoinCard;