"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";

type UserType = {
  first_name: string; last_name: string; date_of_birth: string; age: string; username: string; email: string;
  password: string; confirmPassword: string; country: string; state: string; city: string; otp: string;
  csrfToken: string;
};
type ErrorType = { [key: string]: string; };

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const [otp, setOtp] = useState<string>("");
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [errors, setErrors] = useState<ErrorType>({});
  const [firstpage, setfirstpage] = useState<boolean>(true);

  const setpage = async () => { setfirstpage(true); }

  const [user, setUser] = useState<UserType>({
    first_name: "", last_name: "", date_of_birth: "", age: "", username: "",
    email: "", password: "", confirmPassword: "", country: "", state: "",
    city: "", otp: "", csrfToken: ""
  });
  const router = useRouter();

  useEffect(() => { setCountries(Country.getAllCountries()); }, []);
  useEffect(() => { fetch("/api/csrf-token").then((res) => res.json()).then((data: { csrfToken: string }) => { setCsrfToken(data.csrfToken); }); }, []);
  useEffect(() => { if (selectedCountry) { setStates(State.getStatesOfCountry(selectedCountry)); setCities([]); } }, [selectedCountry]);
  useEffect(() => { if (selectedCountry && selectedState) { setCities(City.getCitiesOfState(selectedCountry, selectedState)); } }, [selectedState, selectedCountry]);

  const setdata = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { const { name, value, options, selectedIndex } = e.target as HTMLSelectElement; setUser((prev) => ({ ...prev, [name]: e.target.tagName === "SELECT" ? options[selectedIndex].text : value, })); };

  const submitdata = async () => {
    const res = await fetch("http://127.0.0.1:8000/signup", { method: "POST", headers: { "Content-Type": "application/json", "CSRF-Token": csrfToken, }, body: JSON.stringify(user), });
    const data = await res.json();
    if (!res.ok) {
      const errorObj: ErrorType = {};
      if (data?.detail) {
        if (Array.isArray(data.detail)) { data.detail.forEach((err: any) => { const field = err.loc?.[1]; if (field) { errorObj[field] = err.msg; } }); }
        else if (typeof data.detail === "object") { Object.keys(data.detail).forEach((key) => { errorObj[key] = data.detail[key]; }); }
        else if (typeof data.detail === "string") { errorObj["general"] = data.detail; }
        else { errorObj["general"] = "Something went wrong"; }
      } setErrors(errorObj);
    }
    else {
      alert("Signup success"); router.push("/login");
    }
  };

  const generateOTP = async () => {
    const email = user.email; if (!email || email.trim() === "") { alert("Please enter email first"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { alert("Invalid email format"); return; }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    const res = await fetch("http://127.0.0.1:8000/send-otp", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ email, otp: newOtp }), });
    const data = await res.json();
    console.log(data);
    setfirstpage(false);
  };

  const Gender = [{ id: 1, key: "Male", value: "Male" }, { id: 2, key: "Female", value: "Female" }, { id: 3, key: "Other", value: "Other" },];

  return (
    <div>
      <div className='flex justify-center items-center overflow-y-scroll h-screen bg-linear-to-r from-blue-500 to-teal-400 '>
        <div className='border-0 rounded-lg h-full w-full bg-radial from-blue-800 text-white via-blue-900 to-blue-950 flex felx-col justify-center gap-4 p-1 mt-2.5 m-4 bg-white font-serif font-bold'>
          <div><form onSubmit={handleSubmit(submitdata)} className='mr-5 font-serif' > <div>
            {firstpage ?
              <div> <h1> <div>
                <div className='flex justify-center items-center border-0 rounded-lg bg-blue-500 p-1  my-5 font-serif'> PLEASE SIGN UP </div>
                <input type="text" name="text" placeholder='text' className='hidden border-2 m-2' />
                <label htmlFor="firstname" className='p-1 my-4 mr-3 '> First Name :</label>
                <input type="text" name='first_name' onChange={setdata} className='border-2 p-0.5 my-3 rounded-sm' />
                {errors.first_name && (<p style={{ color: "red", fontSize: 12, }}>{errors.first_name}</p>)} <br />
                <label htmlFor="lastname" className='p-1 m-1  mr-3'>Last Name :</label>
                <input type="text" name='last_name' onChange={setdata} className='border-2 p-0.5 my-3rounded-sm' />
                {errors.last_name && (<p style={{ color: "red", fontSize: 12, }}>{errors.last_name}</p>)}
              </div> <div>
                  <label htmlFor="email" className='p-1 my-3 ml-3 '> Email :</label>
                  <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} className='border-2 rounded-sm ml-1.5' />
                  {errors.email && (<p style={{ color: "red", fontSize: 12, }}>{errors.email}</p>)}
                </div> <div className='mr-7'>
                  <label htmlFor="password" className='p-1  my-3  font-serif '>Password :</label>
                  <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata} className='border-2 rounded-sm m-1' />
                  {errors.password && (<p style={{ color: "red", fontSize: 12, }}>{errors.password}</p>)} <br />
                  <input type="password" placeholder='Confirm Password' value={user.confirmPassword} name='confirmPassword' onChange={setdata} className='border-2 rounded-sm  my-3  ml-24' />
                  {errors.confirmPassword && (<p style={{ color: "red", fontSize: 12, }}>{errors.confirmPassword}</p>)}
                </div> <div className="flex items-center justify-center">
                  <div className='mr-20 w-1'>
                    <Link href="/" className='p-1 mr-4'>Back</Link> </div>
                  <button type="button" onClick={generateOTP} className='p-1 ml-5 my-3 px-3 w-50 rounded-lg border-0 border-black text-white bg-blue-500'>  Generate OTP </button>
                </div> </h1> </div> : <div> <div>
                  <input type="number" placeholder='OTP-verify' value={user.otp} name='otp' onChange={setdata} className='p-1  my-3  ml-20 rounded-sm border-2' />
                  {errors.otp && (<p style={{ color: "red", fontSize: 12, }}>{errors.otp}</p>)}
                  <div className=''>
                    <label htmlFor="dateofbirth" className='p-1  my-3  mr-3'>D.O.B :</label>
                    <input type="date" name='date_of_birth' onChange={setdata} className='border-2 p-0.5  my-3 rounded-sm' />
                    {errors.date_of_birth && (<p style={{ color: "red", fontSize: 12, }}>{errors.date_of_birth}</p>)}
                    <label htmlFor="age" className='p-1 my-3   ml-1.5 mr-3' >Age :</label>
                    <input type="number" name='age' onChange={setdata} className='border-2 p-0.5  my-3  w-15 rounded-sm' />
                    {errors.age && (<p style={{ color: "red", fontSize: 12, }}>{errors.age}</p>)} <br />
                    <label htmlFor="gender" className='p-1  my-3  mr-3 '>Gender :</label>
                    <select name='gender' onChange={setdata} className='border-2 p-0.5  my-3  rounded-sm'>
                      <option value="select">select</option>
                      {Gender.map((gender) => (<option key={gender.id} value={gender.value}> {gender.key}    </option>))}
                    </select>
                    {errors.gender && (<p style={{ color: "red", fontSize: 12, }}>{errors.gender}</p>)}
                  </div> <div className='p-1.5'>
                    <label htmlFor="username" className='p-1  my-3 mr-1   '>UserName :</label>
                    <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} className='border-2 p-0.5 w-96 rounded-sm  my-3' />
                    {errors.username && (<p style={{ color: "red", fontSize: 12, }}>{errors.username}</p>)}
                  </div><label htmlFor="cuntry" className='p-1 my-3 mr-3'> Country :</label>
                  <select name='country' className='border-2 p-0.5  my-3  rounded-sm w-41.25' onChange={(e) => { setSelectedCountry(e.target.value); setdata(e); }} >
                    <option value="">Select Country</option>
                    {countries.map((country) => (<option key={country.isoCode} value={country.isoCode}> {country.name} </option>))}
                  </select>
                  {errors.country && (<p style={{ color: "red", fontSize: 12, }}>{errors.country}</p>)} <br />
                  <label htmlFor="state" className='p-1  my-3 mr-3'>State :</label>
                  <select name='state' className='border-2 p-0.5  my-3  rounded-sm w-41.25' onChange={(e) => { setSelectedState(e.target.value); setdata(e); }} >
                    <option value="">Select State</option>
                    {states.map((state) => (<option key={state.isoCode} value={state.isoCode}> {state.name} </option>))}
                  </select>
                  {errors.state && (<p style={{ color: "red", fontSize: 12, }}>{errors.state}</p>)} <br />
                  <label htmlFor="district" className=' p-0.5  my-3 mr-3 '> District :</label>
                  <select name='city' className='border-2 p-0.5  my-3  rounded-sm w-41.25' onChange={(e) => { setSelectedCity(e.target.value); setdata(e); }} >
                    <option value="">Select District</option>
                    {cities.map((city) => (<option key={city.name} value={city.name}> {city.name} </option>))}
                  </select>
                  {errors.city && (<p style={{ color: "red", fontSize: 12, }}>{errors.city}</p>)}
                  {errors.email && (<p style={{ color: "red", fontSize: 12, }}>{errors.email}</p>)} </div>
                <div className="flex items-center justify-center"><div>
                  <button onClick={setpage} >Back</button> </div> <div>
                    <input type="submit" value="Submit" className='p-1  my-3 mr-2.5 border-black border-2 rounded-lg w-30 bg-blue-500 text-white  ' /></div>
                </div> </div>}
          </div> <div className='ml-25 my-5'> <p>
            Already have an account?
            <Link href="/login" className='m-3.5 text-blue-400'>login </Link>
          </p> </div> <div className="flex items-center justify-center"> <hr className="w-[50%]" /> <div className="mx-4">Or</div> <hr className="w-[50%]" /> </div>
            <div className='ml-25 my-5'>
              <div onClick={() => signIn('google')} className='m-2 text-blue-400'>login with google </div>
              <div onClick={() => signIn('github')} className='m-2 text-blue-400'>  login with github </div>
              <div onClick={() => signIn('microsoft')} className='m-2 text-blue-400'> login with microsoft </div>
              <div onClick={() => signIn('apple')} className='m-2 text-blue-400'> login withjh apple </div>
              <button onClick={() => window.location.href = "http://localhost:8000/auth/google"}> Login with Google </button><br />
              <button onClick={() => window.location.href = "http://localhost:8000/auth/github"}> Login with GitHub </button><br />
              <button onClick={() => window.location.href = "http://localhost:8000/auth/microsoft"}> Login with Microsoft </button>   <br />
            </div> </form> </div> </div> </div>
    </div>
  )
}
