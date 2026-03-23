"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";

function page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [otp, setOtp] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);


  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setCities([]);
    }
  }, [selectedCountry]);


  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState]);

  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    otp: ""
  });


  const setdata = (e) => {
    const { name, value, options, selectedIndex } = e.target;
    setuser({ ...user,  [name]: e.target.tagName === "SELECT" ? options[selectedIndex].text  : value    }); };

  const submitdata = async () => {
    if (user.otp !== otp) {
      alert("Invalid OTP. Please try again.");
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    console.log(user.name, user.email, user.password, user.country, user.state, user.city)
  }
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(otp);
    console.log("Generated OTP:", otp);
    const email = user.email;
    const res = fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });
  }


  return (
    <div>
      <div className='flex justify-center items-center h-screen bg-blue-400'>
        
        <div className='border-2 rounded-lg h-96 w-200 flex  justify-center gap-4 p-2 bg-white font-mono font-bold'>
          <form onSubmit={handleSubmit(submitdata)}>
            
                <input  type="text" name="text" placeholder='text' className='hidden border-2 m-2' />
            
            <div>
              <label htmlFor="username">Username </label>
              <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} className='border-2 p-0.5' />
            </div>

            <div>
              <div>
                <label htmlFor="state"> country</label>
                <select name='country' className='border-2 p-0.5' onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setdata(e); 
                }} >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="state">state</label>
                <select name='state' className='border-2 p-0.5 ' onChange={(e) => {
                  setSelectedState(e.target.value); 
                  setdata(e); 
                }} >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select><br />
              </div>

              <div>
                <label htmlFor="district"> district</label>
                <select name='city' className='border-2 p-0.5 ' onChange={(e) => {
                  setSelectedCity(e.target.value); 
                  setdata(e); 
                }} >
                  <option value="">Select District</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="email"> Email</label>
              <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} />
              <button
                type="button"
                onClick={generateOTP}
                className="w-full bg-blue-500 text-white p-2 rounded">
                Generate OTP
              </button>
              <input type="number" placeholder='otpverify' value={user.otp} name='otp' onChange={setdata} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata} />
              <input type="password" placeholder='Confirm Password' value={user.confirmPassword} name='confirmPassword' onChange={setdata} />
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page