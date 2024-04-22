// frontend/src/hooks/useWeather.js
import { useCallback, useEffect, useState, useMemo } from "react";
import { ethers } from "ethers";
import WeatherApp from "../contracts/WeatherApp.json";

const useWeather = () => {
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(true);

  // Initialize ethers with MetaMask or another Ethereum provider correctly
  const provider = useMemo(
    () => new ethers.providers.Web3Provider(window.ethereum),
    []
  );
  const signer = useMemo(() => provider.getSigner(), [provider]);

  const contract = useMemo(
    () =>
      new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        WeatherApp.abi,
        signer
      ),
    [signer]
  );

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const currentWeather = await contract.getWeather();
      setWeather(currentWeather);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
    setLoading(false);
  }, [contract]);

  const updateWeather = async (newWeather) => {
    setLoading(true);
    try {
      const tx = await contract.updateWeather(newWeather);
      await tx.wait();
      fetchWeather();
    } catch (error) {
      console.error("Failed to update weather:", error);
    }
    setLoading(false);
  };

  // Inside your useWeather hook or a similar initialization place
  useEffect(() => {
    const enableEthereum = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          fetchWeather();
        } catch (error) {
          console.error("Failed to enable Ethereum:", error);
        }
      } else {
        console.error("Ethereum object not found, install MetaMask.");
      }
    };

    enableEthereum();
  }, [fetchWeather]);

  return { weather, updateWeather, loading };
};

export default useWeather;
