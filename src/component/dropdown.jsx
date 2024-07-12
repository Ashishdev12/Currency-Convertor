import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropDown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorites,
  title = "",
}) => {

  const isFavorite = curr => favorites.includes(curr)
  return (
    <div>
      {/* title */}
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

        {/* set currencies */}
      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {/* displaying favorites */}
          {favorites.map((currency)=> {
             return (
              <option className="bg-gray-200" value={currency} key={currency}>
                {currency}
              </option>
             );
          })}
              <hr />
              {/* displaying currencies */}
          {currencies
          .filter(c => !favorites.includes(c))
          .map((currency) => {
            return (
              <option value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
        </select>

              {/* handle Favorites */}
        <button
          onClick={() => handleFavorites(currency)}
          className="absolute inset-y-0 right-1 pr-5 flex items-center text-sm leading-5"
        >
          {isFavorite(currency) ? 
          <HiStar/>
          : 
          <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropDown;
