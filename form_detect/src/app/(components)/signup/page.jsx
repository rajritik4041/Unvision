"use client"
import React from 'react'
import { useEffect, useState } from "react"
import Link from "next/link";
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
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    fetch("/api/csrf-token")
      .then(res => res.json())
      .then(data => {
        setCsrfToken(data.csrfToken);
        console.log("CSRF Token:", data.csrfToken);
      });
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
    first_name: "",
    last_name: "",
    date_of_birth: "",
    age: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    otp: "",
    csrfToken: ""
  });


  const setdata = (e) => {
    const { name, value, options, selectedIndex } = e.target;
    setuser({ ...user, [name]: e.target.tagName === "SELECT" ? options[selectedIndex].text : value });
  };

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
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken
      },
      body: JSON.stringify(user)
    })

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
  const Gender = [
    { id: 1, key: "Male", value: "Male" },
    { id: 2, key: "Female", value: "Female" },
    { id: 3, key: "Other", value: "Other" }]
  return (
    <div>
      <div className='flex justify-center items-center h-screen bg-blue-400'>

        <div className='border-0 rounded-lg h-200  w-200 flex felx-col justify-center gap-4 p-1 m-4 bg-white font-mono font-bold'>
          <div className='mr-2'>
           <Link  href="/home" className='p-1 m3'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20px"><path fill="rgb(0, 0, 0)" d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg></Link>
            </div>

          <form onSubmit={handleSubmit(submitdata)} >
            <div className=' flex justify-center items-center border-2 rounded-lg bg-blue-500 p-1 m-3 w-96 font-mono'> <div></div>PLEASE SIGN UP </div>
            <input type="text" name="text" placeholder='text' className='hidden border-2 m-2' />
            <div>

              <label htmlFor="firstname" className='p-1 m-1 font-mono '> First Name :</label>
              <input type="text" name='first_name' onChange={setdata} className='border-2 p-0.5 m-1 rounded-sm' />

              <label htmlFor="lastname" className='p-1 m-1 font-mono '>Last Name :</label>
              <input type="text" name='last_name' onChange={setdata} className='border-2 p-0.5 m-1 rounded-sm' />

            </div>

            <div className=''>

              <label htmlFor="dateofbirth" className='p-1 m-2 font-mono '>D.O.B :</label>
              <input type="date" name='date_of_birth' onChange={setdata} className='border-2 p-0.5 m-2 rounded-sm' />

              <label htmlFor="age" className='p-1 m-2 font-mono ' >Age :</label>
              <input type="number" name='age' onChange={setdata} className='border-2 p-0.5 m-2 w-15 rounded-sm' />

              <label htmlFor="gender" className='p-1 m-2.5 font-mono '>Gender :</label>
              <select name='gender' onChange={setdata} className='border-2 p-0.5 m-2 rounded-sm'>
                <option value="select" type="disabled">select</option>
                {Gender.map((gender) => (
                  <option  key={gender.id} value={gender.value}>
                    {gender.key}
                  </option>
                ))}
              </select>
            </div>


            <div className='p-1.5'>
              <label htmlFor="username" className='p-1 m-2 font-mono '>UserName :</label>
              <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} className='border-2 p-0.5 w-96 rounded-sm' />
            </div>


            <div>
              <label htmlFor="state" className='p-1 m-2 font-mono '> Country :</label>
              <select name='country' className='border-2 p-0.5 m-2 rounded-sm w-41.25' onChange={(e) => {
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

              <label htmlFor="state" className='p-1 m-2 font-mono'>State :</label>
              <select name='state' className='border-2 p-0.5 m-2 rounded-sm w-41.25' onChange={(e) => {
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

              <label htmlFor="district" className=' p-0.5 m-2 font-mono '> District :</label>
              <select name='city' className='border-2 p-0.5 m-2 rounded-sm w-41.25' onChange={(e) => {
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


            <div>
              <label htmlFor="email" className='p-1 m-2 font-mono '> Email :</label>
              <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} className='border-2 rounded-sm' />
              <button
                type="button"
                onClick={generateOTP}
                className='p-1 m-2 rounded-sm border-2 border-black text-white bg-blue-500 '>
                Generate OTP
              </button>
              <input type="number" placeholder='OTP-verify' value={user.otp} name='otp' onChange={setdata} className='p-1 m-1 rounded-sm border-2 ' />
            </div>
            <div>
              <label htmlFor="password" className='p-1 m-2 font-poppins '>Password :</label>
              <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata} className='border-2 rounded-sm m-1' />
              <input type="password" placeholder='Confirm Password' value={user.confirmPassword} name='confirmPassword' onChange={setdata} className='border-2 rounded-sm m-1' />
            </div>
            <div className='flex justify-center items-center'>
              <input type="submit" value="Submit" className='p-1 m-3 border-black border-2 rounded-sm w-30 bg-blue-500 text-white font-mono ' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page