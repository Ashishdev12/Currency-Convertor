import React, { useEffect, useState } from "react";
import CurrencyDropDown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || ["INR", "EUR"]
  )

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  // console.log(currencies);
 // Currency convert function
  const CurrencyConvert = async () => {
    if(!amount) return
    setConverting(true);
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
     setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency)
    } catch (error) {
      console.error("Error Fetching", error);
    } finally{setConverting(false)}
  };

  // handle favorites function
  const handleFavorites = (currency) => {
    let updatedFavorites = [...favorites];
    if(favorites.includes(currency)){
      updatedFavorites = updatedFavorites.filter((fav)=> fav !== currency); 
    } else {
      updatedFavorites.push(currency);
    }
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

 // This function is used for swap currencies 
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency)
  }

  

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      {/* DropDown From and To */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        {/* From dropdown */}
        <CurrencyDropDown
          favorites={favorites}
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorites={handleFavorites}
        />

        {/*  swapCurrencies */}
        <div className="flex justify-center -mb-5 sm:mb-0" >
          <button onClick={swapCurrencies} className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <HiArrowsRightLeft className="text-xl text-gray-700"/>
          </button>
        </div>
        
        {/* To Dropdown */}
        <CurrencyDropDown
          favorites={favorites}
          currencies={currencies}
          title="TO:"
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorites={handleFavorites}
        />
      </div>

      {/* Amount Section */}
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>

      {/* Convertor Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={CurrencyConvert}
          className= {`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            ${converting?"animate-ping" : ""}`}
          
        >
          Convert
        </button>
      </div>
            {/* Converted Amount  */}
     {convertedAmount && <div className="mt-4 text-lg font-medium text-center text-green-600">
        Converted Amount: {convertedAmount}
      </div>}
    </div>
  );
};
export default CurrencyConvertor;