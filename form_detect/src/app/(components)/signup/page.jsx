"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation'



function page() {
  const { register, handleSubmit } = useForm();
  const [otp, setOtp] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);
  const router = useRouter()
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
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken
      },
      body: JSON.stringify(user)
    })

    const data = await res.json();

    if (!data.success) {
      const errorObj = {};
      data.errors.forEach((err) => {
        errorObj[err.path] = err.msg;
      });
      setErrors(errorObj);
    } else {
      alert("Signup success");
      router.push('/login')
    }
  }
  const generateOTP = () => {
    const otp = Math.floor(10000 + Math.random() * 900000).toString();
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

        <div className='border-2 rounded-lg h-120  w-200 flex  justify-center gap-4 p-1 bg-white font-mono font-bold'>

          <form onSubmit={handleSubmit(submitdata)} >
            <div className=' flex justify-center items-center border-2 bg-blue-500 p-1 m-3  font-mono'> PLEASE SIGN UP </div>
            <input type="text" name="text" placeholder='text' className='hidden border-2 m-2' />
            <div>

              <label htmlFor="firstname" className='p-1 m-1 font-mono '> First Name :</label>
              <input type="text" name='first_name' onChange={setdata} className='border-2 p-0.5 m-1 rounded-sm' />
              {errors.first_name && (<p style={{ color: "red" }}>{errors.first_name}</p>)}

              <label htmlFor="lastname" className='p-1 m-1 font-mono '>Last Name :</label>
              <input type="text" name='last_name' onChange={setdata} className='border-2 p-0.5 m-1 rounded-sm' />
              {errors.last_name && (<p style={{ color: "red" }}>{errors.last_name}</p>)}

            </div>
            <div className=''>

              <label htmlFor="dateofbirth" className='p-1 m-2 font-mono '>D.O.B :</label>
              <input type="date" name='date_of_birth' onChange={setdata} className='border-2 p-0.5 m-2 rounded-sm' />
              {errors.date_of_birth && (<p style={{ color: "red" }}>{errors.date_of_birth}</p>)}

              <label htmlFor="age" className='p-1 m-2 font-mono ' >Age :</label>
              <input type="number" name='age' onChange={setdata} className='border-2 p-0.5 m-2 w-15 rounded-sm' />
              {errors.age && (<p style={{ color: "red" }}>{errors.age}</p>)}

              <label htmlFor="gender" className='p-1 m-2.5 font-mono '>Gender :</label>
              <select name='gender' onChange={setdata} className='border-2 p-0.5 m-2 rounded-sm'>
                <option value="select" type="disabled">select</option>
                {Gender.map((gender) => (
                  <option key={gender.id} value={gender.value}>
                    {gender.key}
                  </option>
                ))}
              </select>
              {errors.gender && (<p style={{ color: "red" }}>{errors.gender}</p>)}
            </div>


            <div className='p-1.5'>
              <label htmlFor="username" className='p-1 m-2 font-mono '>UserName :</label>
              <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} className='border-2 p-0.5 w-96 rounded-sm' />
              {errors.username && (<p style={{ color: "red" }}>{errors.username}</p>)}
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
              {errors.country && (<p style={{ color: "red" }}>{errors.country}</p>)}

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
              </select>
              {errors.state && (<p style={{ color: "red" }}>{errors.state}</p>)}
              <br />

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
              {errors.city && (<p style={{ color: "red" }}>{errors.city}</p>)}
            </div>


            <div>
              <label htmlFor="email" className='p-1 m-2 font-mono '> Email :</label>
              <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} className='border-2 rounded-sm' />
              {errors.email && (<p style={{ color: "red" }}>{errors.email}</p>)}
              <button
                type="button"
                onClick={generateOTP}
                className='p-1 m-2 rounded-sm border-2 border-black text-white bg-blue-500 '>
                Generate OTP
              </button>
              <input type="number" placeholder='OTP-verify' value={user.otp} name='otp' onChange={setdata} className='p-1 m-1 rounded-sm border-2 ' />
              {errors.otp && (<p style={{ color: "red" }}>{errors.otp}</p>)}
            </div>
            <div>
              <label htmlFor="password" className='p-1 m-2 font-poppins '>Password :</label>
              <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata} className='border-2 rounded-sm m-1' />
              {errors.password && (<p style={{ color: "red" }}>{errors.password}</p>)}
              <input type="password" placeholder='Confirm Password' value={user.confirmPassword} name='confirmPassword' onChange={setdata} className='border-2 rounded-sm m-1' />
              {errors.confirmPassword && (<p style={{ color: "red" }}>{errors.confirmPassword}</p>)}
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