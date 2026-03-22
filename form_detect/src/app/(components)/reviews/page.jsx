"use client";

import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

export default function AddressForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    otp: ""
  });

  // Load countries
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setCities([]);
    }
  }, [selectedCountry]);

  // Load cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-96 space-y-3">

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Enter Address"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Country */}
        <select
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.name}
            </option>
          ))}
        </select>

        {/* State */}
        <select
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s.isoCode} value={s.isoCode}>
              {s.name}
            </option>
          ))}
        </select>

        {/* District / City */}
        <select className="w-full border p-2 rounded">
          <option value="">Select District</option>
          {cities.map((city, index) => (
            <option key={index}>{city.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="pincode"
          placeholder="Enter Pincode"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Send OTP
        </button>

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}