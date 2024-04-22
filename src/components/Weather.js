// frontend/src/components/Weather.js
import React, { useState } from "react";
import useWeather from "../hooks/useWeather";

const Weather = () => {
  const { weather, updateWeather, loading } = useWeather();
  const [newWeather, setNewWeather] = useState("");

  const handleInputChange = (event) => {
    setNewWeather(event.target.value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!newWeather.trim()) return;
    await updateWeather(newWeather);
    setNewWeather("");
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 border rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold text-center mb-4">Weather Blockchain App</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Current Weather:</label>
        <p className="text-lg text-gray-800">{loading ? "Loading..." : weather || "Not set"}</p>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Update Weather:</label>
          <input
            type="text"
            value={newWeather}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter new weather condition"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Weather;
