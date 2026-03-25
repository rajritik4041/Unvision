"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { signIn, signOut } from "next-auth/react";


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
      <div className='flex justify-center items-center overflow-y-scroll h-full bg-linear-to-r from-blue-500 to-teal-400 '>

        <div className='border-0 rounded-lg h-360  w-190 bg-radial from-blue-800 text-white via-blue-900 to-blue-950 flex felx-col justify-center gap-4 p-1 mt-2.5 m-4 bg-white font-serif font-bold'>
          <div className='mr-20 w-1'>
            <Link href="/home" className='p-1 mr-4'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20px"><path fill="rgb(255,255,255)" d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" /></svg></Link>
          </div>

          <form onSubmit={handleSubmit(submitdata)} className='mr-5 font-serif' >
            <div className='flex justify-center items-center border-0 rounded-lg bg-blue-500 p-1  my-5 font-serif'> PLEASE SIGN UP </div>
            <input type="text" name="text" placeholder='text' className='hidden border-2 m-2' />
            <div>

              <label htmlFor="firstname" className='p-1 my-4 mr-3 '> First Name :</label>
              <input type="text" name='first_name' onChange={setdata} className='border-2 p-0.5 my-3 rounded-sm' />
              {errors.first_name && (<p style={{ color: "red", fontSize: 12, }}>{errors.first_name}</p>)}
              <br />
              <label htmlFor="lastname" className='p-1 m-1  mr-3'>Last Name :</label>
              <input type="text" name='last_name' onChange={setdata} className='border-2 p-0.5 my-3rounded-sm' />
              {errors.last_name && (<p style={{ color: "red", fontSize: 12, }}>{errors.last_name}</p>)}

            </div>
            <div className=''>

              <label htmlFor="dateofbirth" className='p-1  my-3  mr-3'>D.O.B :</label>
              <input type="date" name='date_of_birth' onChange={setdata} className='border-2 p-0.5  my-3 rounded-sm' />
              {errors.date_of_birth && (<p style={{ color: "red", fontSize: 12, }}>{errors.date_of_birth}</p>)}

              <label htmlFor="age" className='p-1 my-3   ml-1.5 mr-3' >Age :</label>
              <input type="number" name='age' onChange={setdata} className='border-2 p-0.5  my-3  w-15 rounded-sm' />
              {errors.age && (<p style={{ color: "red", fontSize: 12, }}>{errors.age}</p>)}
              <br />
              <label htmlFor="gender" className='p-1  my-3  mr-3 '>Gender :</label>
              <select name='gender' onChange={setdata} className='border-2 p-0.5  my-3  rounded-sm'>
                <option value="select" type="disabled">select</option>
                {Gender.map((gender) => (
                  <option key={gender.id} value={gender.value}>
                    {gender.key}
                  </option>
                ))}
              </select>
              {errors.gender && (<p style={{ color: "red", fontSize: 12, }}>{errors.gender}</p>)}
            </div>


            <div className='p-1.5'>
              <label htmlFor="username" className='p-1  my-3 mr-1   '>UserName :</label>
              <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} className='border-2 p-0.5 w-96 rounded-sm  my-3' />
              {errors.username && (<p style={{ color: "red", fontSize: 12, }}>{errors.username}</p>)}
            </div>


            <div>
              <label htmlFor="cuntry" className='p-1 my-3 mr-3'> Country :</label>
              <select name='country' className='border-2 p-0.5  my-3  rounded-sm w-41.25' onChange={(e) => {
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
              {errors.country && (<p style={{ color: "red", fontSize: 12, }}>{errors.country}</p>)}
              <br />
              <label htmlFor="state" className='p-1  my-3 mr-3'>State :</label>
              <select name='state' className='border-2 p-0.5  my-3  rounded-sm w-41.25' onChange={(e) => {
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
              {errors.state && (<p style={{ color: "red", fontSize: 12, }}>{errors.state}</p>)}
              <br />

              <label htmlFor="district" className=' p-0.5  my-3 mr-3 '> District :</label>
              <select name='city' className='border-2 p-0.5  my-3  rounded-sm w-41.25' onChange={(e) => {
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
              {errors.city && (<p style={{ color: "red", fontSize: 12, }}>{errors.city}</p>)}
            </div>


            <div>
              <label htmlFor="email" className='p-1 my-3 ml-3 '> Email :</label>
              <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} className='border-2 rounded-sm ml-1.5' />
              {errors.email && (<p style={{ color: "red", fontSize: 12, }}>{errors.email}</p>)}
              <button
                type="button"
                onClick={generateOTP}
                className='p-1 ml-5 my-3 px-3 w-50 rounded-lg border-0 border-black text-white bg-blue-500'>
                Generate OTP
              </button>
              <br />
              <input type="number" placeholder='OTP-verify' value={user.otp} name='otp' onChange={setdata} className='p-1  my-3  ml-20 rounded-sm border-2' />
              {errors.otp && (<p style={{ color: "red", fontSize: 12, }}>{errors.otp}</p>)}
            </div>
            <div className='mr-7'>
              <label htmlFor="password" className='p-1  my-3  font-serif '>Password :</label>
              <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata} className='border-2 rounded-sm m-1' />
              {errors.password && (<p style={{ color: "red", fontSize: 12, }}>{errors.password}</p>)}
              <br />
              <input type="password" placeholder='Confirm Password' value={user.confirmPassword} name='confirmPassword' onChange={setdata} className='border-2 rounded-sm  my-3  ml-24' />
              {errors.confirmPassword && (<p style={{ color: "red", fontSize: 12, }}>{errors.confirmPassword}</p>)}
            </div>
            <div className='flex justify-center items-center mr-10'>
              <input type="submit" value="Submit" className='p-1  my-3 mr-2.5 border-black border-2 rounded-lg w-30 bg-blue-500 text-white  ' />
            </div>
            <div className='ml-25 my-5'>
              <p>
                Already have an account?
                <Link href="/login" className='m-3.5 text-blue-400'>
                  login
                </Link>
              </p>
            </div>
            <div>----------------------------------- or -------------------------------------</div>
            <div className='ml-25 my-5'>
              <div onClick={() => signIn('google')} className='m-2 text-blue-400'>login with google </div>
              <div className='m-2 text-blue-400 ' onClick={() => signIn("github", { callbackUrl: "/profile/home" })}>  GitHub Login</div>
              <div onClick={() => signIn("azure-ad")} className='m-2 text-blue-400'> login with microsoft </div>
              <div onClick={() => signIn('apple')} className='m-2 text-blue-400'> login with apple </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page