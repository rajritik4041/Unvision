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
  csrfToken: string; gender: string;
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
  const [error, setError] = useState<string>("");
  const [firstpage, setfirstpage] = useState<boolean>(true);
  const getInputClass = `"peer w-full  pl-4  pt-6 pb-2  rounded-xl border border-gray-300 
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-transparent"`;
  const getLabelClass = (value: string) =>
    `absolute left-4 transition-all duration-200  w-full min-w-30  max-w-96 text-sm ${value ? "top-1 text-xs text-blue-500" : "top-3 text-gray-500"
    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`;
  const setinputclass = "peer  w-full  px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm";
  const setlabelclass =
    "absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs";

  const setpage = async () => { setfirstpage(true); }
  const api = process.env.NEXT_PUBLIC_API_URL || "https://unvision-first.onrender.com";
  const api2 = process.env.NEXT_PUBLIC_API_URL2 || "https://unvision.vercel.app";
  const [user, setUser] = useState<UserType>({
    first_name: "", last_name: "", date_of_birth: "", age: "", username: "",
    email: "", password: "", confirmPassword: "", country: "", state: "",
    city: "", otp: "", csrfToken: "", gender: "",
  });
  const router = useRouter();

  useEffect(() => { setCountries(Country.getAllCountries()); }, []);
  useEffect(() => { fetch("/api/csrf-token").then((res) => res.json())
    .then((data: { csrfToken: string }) => {
       setCsrfToken(data.csrfToken);
      //  console.log(data.csrfToken);
       }); }, []);
  useEffect(() => { if (selectedCountry) { setStates(State.getStatesOfCountry(selectedCountry)); setCities([]); } }, [selectedCountry]);
  useEffect(() => { if (selectedCountry && selectedState) { setCities(City.getCitiesOfState(selectedCountry, selectedState)); } }, [selectedState, selectedCountry]);

  const validateFirstPage = () => {
    const newErrors: ErrorType = {};
    if (!user.first_name) newErrors.first_name = "First name is required";
    if (!user.last_name) newErrors.last_name = "Last name is required";
    if (!user.email) { newErrors.email = "Email is required"; } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) { newErrors.email = "Invalid email"; }
    const calculateAge = (dob: string) => {
      const birthDate = new Date(dob); const today = new Date(); let age = today.getFullYear() - birthDate.getFullYear(); const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
    if (!user.date_of_birth) newErrors.date_of_birth = "DOB required";
    if (!user.age) newErrors.age = "Age required";
    if (user.date_of_birth && user.age) {
      const calculated = calculateAge(user.date_of_birth);
      if (calculated !== Number(user.age)) { newErrors.age = "Age does not match DOB"; }
    }
    if (!user.username) newErrors.username = "Username required";
    if (!user.country) newErrors.country = "Select country";
    if (!user.state) newErrors.state = "Select state";
    if (!user.city) newErrors.city = "Select city";
    if (!user.gender || user.gender === "select") { newErrors.gender = "Please select gender"; }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const setdata = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { const { name, value, options, selectedIndex } = e.target as HTMLSelectElement; setUser((prev) => ({ ...prev, [name]: e.target.tagName === "SELECT" ? options[selectedIndex].text : value, })); };
  const setpage2 = async () => {
    // const isValid = validateFirstPage();
    // if (isValid) { setfirstpage(false); }
    setfirstpage(false);
  };
  const submitdata = async () => {
    const res = await fetch(`${api}/signup`, { method: "POST", headers: { "Content-Type": "application/json", "CSRF-Token": csrfToken, }, body: JSON.stringify(user), });
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
  console.log("API URL:", api);
  const generateOTP = async () => {
    const email = user.email; if (!email || email.trim() === "") { alert("Please enter email first"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { alert("Invalid email format"); return; }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    console.log("API URL:", api2);
    const res = await fetch(`${api2}/api/send-otp`, { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ email, otp: newOtp }), });
    const data = await res.json();
      if (res.status === 429) {
      setError(data.message);      
      return;
    }
    console.log(data);
  };

  const Gender = [{ id: 1, key: "Male", value: "Male" }, { id: 2, key: "Female", value: "Female" }, { id: 3, key: "Other", value: "Other" },];

  return (
    <div>
      <div className='flex justify-center  items-center min-h-screen bg-linear-to-r p-3 from-blue-500 to-teal-400'>
        <div className='border-0 rounded-lg p-6 w-full max-w-md    bg-radial  from-blue-800 text-white via-blue-900 to-blue-950 font-serif font-bold'>
          <div>
            <form onSubmit={handleSubmit(submitdata)} className=' font-serif w-full' >
              <div>
                {firstpage ?
                  <div>
                    <div className=' w-full h-full  flex justify-center items-center border-0 rounded-lg bg-blue-500 p-1   font-serif'> PLEASE SIGN UP </div>
                    <div className="flex flex-col w-full gap-2">
                      <div>
                        <input type="text" name="text" placeholder='text' className='hidden border-2 m-2' />

                        <div >
                          {/* <label htmlFor="firstname" className=' my-4 mr-3 '> First Name :</label> */}
                          {/* <input type="text" name='first_name' onChange={setdata} className='border-2 p-0.5 mt-8 w-50 rounded-sm' /> */}
                          <div className="relative w-full mt-10 ">
                            <input type="text" name="first_name" onChange={setdata} required className={setinputclass} />
                            <label htmlFor="first_name" className={setlabelclass} >  First Name   </label>
                          </div>
                          {errors.first_name && (<p style={{ color: "red", fontSize: 12, }}>{errors.first_name}</p>)}
                        </div>

                        <div>
                          {/* <label htmlFor="lastname" className='   mr-4'>Last Name :</label> */}
                          {/* <input type="text" name='last_name' onChange={setdata} className='border-2 p-0.5 mt-4 rounded-sm w-50' /> */}
                          <div className="relative w-full mt-4 ">
                            <input type="text" name="last_name" onChange={setdata} required className={setinputclass} />
                            <label htmlFor="last_name" className={setlabelclass} >  Last Name   </label>
                          </div>
                          {errors.last_name && (<p style={{ color: "red", fontSize: 12, }}>{errors.last_name}</p>)}
                        </div>

                      </div>
                      <div>
                        {/* <label htmlFor="email" className=' my-3  mr-11 '> Email :</label> */}
                        {/* <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} className='border-2 mt-4 p-0.5 rounded-sm ml-1.5 w-50 ' /> */}
                        <div className="relative w-full mt-4 ">
                          <input type="email" name="email" onChange={setdata} required className={setinputclass} />
                          <label htmlFor="email" className={setlabelclass} >  Email   </label>
                        </div>
                        {errors.email && (<p style={{ color: "red", fontSize: 12, }}>{errors.email}</p>)}
                      </div>

                      <div >
                        {/* <label htmlFor="dateofbirth" className=' my-3  mr-12 '>D.O.B :</label> */}
                        {/* <input type="date" name='date_of_birth' onChange={setdata} className='border-2 p-0.5 mt-4  w-50 rounded-sm' /> */}
                        <div className="relative w-full mt-4">
                          <input type="date" name="date_of_birth" value={user.date_of_birth || ""} onChange={setdata} required
                            className="peer w-full px-4 pt-7 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm" />
                          <label
                            className={`absolute left-4 transition-all duration-200 text-sm ${user.date_of_birth ? "top-1 text-xs text-blue-500" : "top-3 text-gray-500"}`}    >
                            Date of Birth
                          </label>
                        </div>
                        {errors.date_of_birth && (<p style={{ color: "red", fontSize: 12, }}>{errors.date_of_birth}</p>)}
                      </div>

                      <div className="relative w-full mt-4">
                        <select name="gender" value={user.gender || ""} onChange={setdata}
                          className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"      >
                          <option value="" hidden></option>
                          {Gender.map((g) => (<option key={g.id} value={g.value}>  {g.key} </option>))}
                        </select>
                        <label className={`absolute left-4 px-1  transition-all duration-200 text-sm pointer-events-none ${user.gender ? "top-1 text-xs text-blue-500" : "top-3 text-gray-400"} peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}  >
                          Gender
                        </label>
                        {errors.gender && (<p className="text-red-500 text-xs mt-1">{errors.gender}</p>)}
                      </div>

                      <div className="mt-4">
                        {/* <label htmlFor="age" className='  mr-16 ' >Age :</label> */}
                        {/* <input type="number" name='age' onChange={setdata} className='border-2 p-0.5   w-15 rounded-sm' /> */}
                        <div className="relative w-full mt-4 ">
                          <input type="number" name="age" onChange={setdata} required className={setinputclass} />
                          <label htmlFor="age" className={setlabelclass} >  Age   </label>
                        </div>
                        {errors.age && (<p style={{ color: "red", fontSize: 12, }}>{errors.age}</p>)}
                      </div>

                      <div className='mt-4'>
                        {/* <label htmlFor="username" className=' mr-4   '>UserName :</label> */}
                        {/* <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} className='border-2  p-0.5 w-50  rounded-sm  ' /> */}
                        <div className="relative w-full mt-4 ">
                          <input type="text" name="username" onChange={setdata} required className={setinputclass} />
                          <label htmlFor="username" className={setlabelclass} >  Username   </label>
                        </div>
                        {errors.username && (<p style={{ color: "red", fontSize: 12, }}>{errors.username}</p>)}
                      </div>

                      <div >
                        <div className="relative w-full mt-4">
                          <select name="country" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setdata(e); }} required
                            className={getInputClass}  >
                            <option value="" disabled hidden></option>
                            {countries.map((country) => (<option key={country.isoCode} className=" text-black " value={country.isoCode}>  {country.name}  </option>))}
                          </select>
                          <label className={getLabelClass(user.country)}  > Country  </label>
                        </div>
                        {errors.country && (<p style={{ color: "red", fontSize: 12, }}>{errors.country}</p>)}
                      </div>

                      <div>
                        <div className="relative w-full mt-4">
                          <select name="state" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setdata(e); }} required
                            className={getInputClass}  >
                            <option value="" disabled hidden></option>
                            {states.map((state, index) => (
                              <option
                                key={state.isoCode ? state.isoCode : `${state.name}-${index}`}
                                value={state.isoCode || state.name}
                              >
                                {state.name}
                              </option>
                            ))}
                          </select>
                          <label className={getLabelClass(user.state)}  >  State   </label>
                        </div>
                        {/* <label htmlFor="state" className='mr-13'>State :</label> */}
                        {/* <select name='state' className='border-2 p-0.5  rounded-sm w-40 mt-4' onChange={(e) => { setSelectedState(e.target.value); setdata(e); }} >
                          <option value="">Select State</option>
                          {states.map((state) => (<option key={state.isoCode} className="text-black" value={state.isoCode}> {state.name} </option>))}
                        </select> */}
                        {errors.state && (<p style={{ color: "red", fontSize: 12, }}>{errors.state}</p>)}
                      </div>

                      <div>
                        <div className="relative w-full mt-4">
                          <select name="city" value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setdata(e); }} required
                            className={getInputClass}  >
                            <option value="" disabled hidden></option>
                            {cities.map((city, index) => (
                              <option
                                key={`${city.name}-${city.stateCode}-${index}`}
                                className="text-black"
                                value={city.isoCode || city.name}
                              >
                                {city.name}
                              </option>
                            ))}
                          </select>
                          <label className={getLabelClass(user.city)} >   city </label>
                        </div>
                        {/* <label htmlFor="district" className='  mr-9 '> District :</label> */}
                        {/* <select name='city' className='border-2 p-0.5  mt-4  rounded-sm w-40' onChange={(e) => { setSelectedCity(e.target.value); setdata(e); }} >
                          <option value="">Select District</option>
                          {cities.map((city) => (<option key={city.name} className="text-black" value={city.name}> {city.name} </option>))}
                        </select> */}
                        {errors.city && (<p style={{ color: "red", fontSize: 12, }}>{errors.city}</p>)}
                      </div>

                      <div className="flex justify-around w-full my-4">
                        {/* <Link href="/" className='p-1 my-3 px-3 w-20 rounded-lg border-0 border-black text-white bg-blue-500' >
                          <div >
                            Back
                          </div>
                        </Link>
                        <button type="button" onClick={handleSubmit(setpage2)} className='p-1 ml-5 my-3 px-3 w-20 rounded-lg border-0 border-black text-white bg-blue-500'>  Next  </button> */}
                        {/* <div>
                          <div>
                            <Link href="/" className="px-4 py-2 w-full rounded-lg text-white bg-gray-500 hover:bg-gray-600 transition-all duration-200"   >
                              Back
                            </Link>
                          </div>
                          <div className="w-full">
                            <button type="button" onClick={handleSubmit(setpage2)}
                              className="px-6 py-2 w-full rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-sm" >
                              Next
                            </button>
                          </div>
                        </div> */}
                        <div className="w-full ">
                          <div className="w-full flex justify-between items-center">
                            <button type="button" onClick={handleSubmit(setpage2)} className="px-6 py-2 w-full rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-sm" >
                              Next
                            </button>
                          </div>
                          <div className=" w-full flex mt-2 justify-between items-center">
                            <Link href="/" className="bg-red-600 items-center w-full rounded-lg text-white py-2 px-4 hover:bg-red-700 transition-all duration-200 text-center">
                              Back
                            </Link>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                  :
                  <div>
                    <div>
                      {/* <div>{user.email}</div>
                      <button type="button" onClick={generateOTP} className='p-1 ml-5 my-3 px-3 w-50 rounded-lg border-0 border-black text-white bg-blue-500'>  Generate OTP </button>
                      <div className="relative w-full mt-4 ">
                        <input type="text" name="otp" value={user.otp} onChange={setdata} required className={setinputclass} />
                        <label htmlFor="otp" className={setlabelclass} >  OTP   </label>
                      </div> */}
                      <div>
                        <div className="flex flex-col gap-4 w-full  mx-auto">

                          <div className="flex justify-between items-center gap-3">
                            <div className="text-sm text-white">{user.email}</div>
                            <button
                              type="button"
                              onClick={generateOTP}
                              className="px-3 py-2 rounded-xl text-sm text-white bg-blue-500 hover:bg-blue-600 transition"
                            >
                              Generate OTP
                            </button>
                          </div>


                          <div className="relative w-full ">
                            <input
                              type="number"
                              name="otp"
                              value={user.otp || ""}
                              onChange={setdata}
                              required
                              className={setinputclass}
                            />
                            <label className={getLabelClass(user.otp)}>
                              Enter OTP
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* <input type="number" placeholder='OTP-verify' value={user.otp} name='otp' onChange={setdata} className='p-1  my-3  ml-20 rounded-sm border-2' /> */}
                      {errors.otp && (<p style={{ color: "red", fontSize: 12, }}>{errors.otp}</p>)}
                      {error && (<p style={{ color: "red", fontSize: 12, }}>{error }</p>)}
                      <div >
                        {/* <label htmlFor="password" className='p-1  my-3  font-serif '>Password :</label> */}
                        {/* <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata} className='border-2 rounded-sm m-1' /> */}
                        <div className="relative w-full mt-4  ">
                          <input type="password" name="password" value={user.password} onChange={setdata} required className={setinputclass} />
                          <label htmlFor="password" className={setlabelclass} >  Password    </label>
                        </div>
                        {errors.password && (<p style={{ color: "red", fontSize: 12, }}>{errors.password}</p>)}
                        <div className="relative w-full mt-4">
                          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={setdata} required className={setinputclass} />
                          <label htmlFor="confirmPassword" className={setlabelclass} >  Confirm Password    </label>
                        </div>
                        {/* <input type="password" placeholder='Confirm Password' value={user.confirmPassword} name='confirmPassword' onChange={setdata} className='border-2 rounded-sm  my-3  ml-24' /> */}
                        {errors.confirmPassword && (<p style={{ color: "red", fontSize: 12, }}>{errors.confirmPassword}</p>)}
                      </div>
                      {errors.general && (
                        <p style={{ color: "red" }}>{errors.general}</p>
                      )}
                      {errors.email && (<p style={{ color: "red", fontSize: 12, }}>{errors.email}</p>)} </div>


                    <div className="flex items-center justify-center">
                      {/* <div>
                        <button onClick={setpage} >Back</button>
                      </div>
                      <div>
                        <input type="submit" value="Submit" className='p-1  my-3 mr-2.5 border-black border-2 rounded-lg w-30 bg-blue-500 text-white  ' />
                      </div> */}

                      {/* <button
                            type="button"
                            onClick={setpage}
                            className="px-4 py-2 text-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            Submit
                          </button> */}
                      <div className="w-full ">
                         <div className="w-full mt-8">
                          <button type="submit" className="px-6 py-2 w-full rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-sm" >
                            Submit
                          </button>
                        </div>
                        <div className="w-full mt-4 flex justify-between items-center">
                          <button type="button" onClick={setpage} className="mb-2 px-6 py-2 w-full rounded-lg text-white bg-gray-500 hover:bg-gray-600 transition-all duration-200" >
                            Back
                          </button>
                        </div>
                       
                      </div>


                    </div>
                  </div>
                }
              </div>
              <div className="flex flex-col items-center text-center w-full gap-2 ">
                <p>
                  Already have an account?
                  <Link href="/login" className="ml-2 text-blue-400 hover:underline">
                    Login
                  </Link>
                </p>
                <div className="flex items-center w-full max-w-xs">
                  <hr className="grow border-t border-gray-400" />
                  <span className="mx-3 text-sm">OR</span>
                  <hr className="grow border-t border-gray-400" />
                </div>

                <div
                  // onClick={() => window.location.href = "https://unvision-first.onrender.com/auth/google"}
                  onClick={() => window.location.href = "http://localhost:8000/auth/google"}
                  className="w-full  bg-white text-black py-2 rounded-md shadow hover:bg-gray-100 transition"
                >
                  Continue with Google
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
