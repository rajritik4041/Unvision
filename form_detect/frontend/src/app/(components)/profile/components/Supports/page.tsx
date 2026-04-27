"use client"
import React from 'react'

function page() {
  return (
    <div>
      <div className='w-full h-full fit-content justify-center items-center grid text-center'>
        <header className='w-full  grid  gap-2 p-10 bg-linear-to-r from-indigo-700 to-purple-700 '>
          <div className="pb-10 font-bold text-6xl font-serif text-white justify-center items-center grid h-fit">
            <h2 >How can we help you today?</h2>
          </div>

          {/* search */}
          <div className='justify-center items-center grid-rows-1 w-full h-full pb-10'>
            <input type="text" placeholder="Search....." className='border-2 border-black text-white rounded-xl p-1 m-4 w-100' />
            <button className='border-2 border-black rounded-lg pr-2 pl-2 m-2 text-white'>Search</button>
          </div>

          <div className='grid   sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 justify-center items-center fit-content'>
            <div className='max-w-6xl p-6 bg-white rounded-lg shadow-lg justify-center items-center grid h-fit hover:bg-indigo-500 hover:text-white transition hover:scale-105 hover:shadow-xl'>
              <div className='flex justify-center'><img className='w-18 h-18 ' src="https://cdn-icons-png.flaticon.com/128/15453/15453140.png" alt="" /></div>
              <h2 className='pt-6 pb-4 text-2xl justify-center items-center text-center grid'> Read our docs</h2>
              <p className='justify-content justify-center items-center grid text-4xs text-justify h-90'>The documentation of the Multi-Disease Detection System provides a comprehensive guide to understanding and using the platform effectively. It includes detailed instructions on system setup, dataset preparation, model training, and deployment.

                Users can learn how to upload medical images or input data, interpret prediction results, and integrate the system with other healthcare applications. The documentation also explains the underlying deep learning models used for disease detection, such as Convolutional Neural Networks (CNNs), along with performance metrics and evaluation methods.

                This section is ideal for beginners as well as developers who want to explore the technical architecture and workflow of the system.</p>
            </div>

            <div className='max-w-6xl p-6 bg-white rounded-lg shadow-lg justify-center items-center grid  h-fit transition hover:scale-105 hover:shadow-xl  hover:bg-indigo-500 hover:text-white'>
              <div className='flex justify-center '> <img className='w-20 h-20 ' src="https://cdn-icons-png.flaticon.com/128/18992/18992261.png" alt="" /></div>
              <h2 className='pt-2 text-2xl justify-center items-center text-center grid'>Ask  the community</h2>
              <p className='justify-content justify-center items-center grid text-justify h-94'>The community support section allows users, researchers, and developers to interact, ask questions, and share solutions related to the Multi-Disease Detection System.

                If users encounter issues such as incorrect predictions, dataset errors, or deployment challenges, they can seek help from others who may have faced similar problems. This collaborative environment encourages knowledge sharing and helps users find practical solutions quickly.

                Community platforms may include discussion forums, GitHub issues, or Q&A platforms where experts and contributors actively participate.</p>
            </div>

            <div className='max-w-6xl p-6 bg-white rounded-lg shadow-lg  justify-center items-center  h-fit transition hover:scale-105 hover:shadow-xl  hover:bg-indigo-500 hover:text-white'>
              <div className='flex justify-center '><img className='w-20 h-20 ' src="https://cdn-icons-png.flaticon.com/128/316/316376.png" alt="" /></div>
              <h2 className='pt-6 pb-4 text-2xl justify-center items-center text-center grid'>Share a tip</h2>
              <p className='justify-content justify-center items-center grid text-justify h-90'>The “Share a Tip” section encourages users to contribute their knowledge and experiences to improve the overall system usage.

                Users can share useful insights such as data preprocessing techniques, model optimization strategies, accuracy improvement methods, or deployment tips. For example, a user might suggest better image augmentation techniques to improve model performance or recommend specific hyperparameter settings.

                By sharing tips, users not only help others but also contribute to building a stronger and more efficient ecosystem around the Multi-Disease Detection System.</p>
            </div>
          </div>

          {/* contact */}
          <div className='justify-center items-center text-center grid pt-6  text-2xl text-amber-400'>
            <h3>Contact Us:</h3>
            <p className='pt-3'>Email: support@example.com</p>
          </div>

        </header>
      </div>

      <div className='pt-4 text-blue-500 text-2xl'>
        <a href="/profile/g"> 1-About More</a>
      </div>

      <div className='pt-4 text-blue-500 text-2xl'>
        <a href="/profile/policy">2- Terms And Conditions</a>
      </div>


      <div className='grid grid-cols-2 justify-center items-center content-center gap-10 pt-10 pb-10 w-full h-full fit-content bg-[linear-gradient(to_right,rgba(255,0,0,0.5),rgba(0,0,255,0.8))]'>

        <div className='grid place-items-center max-w-80 h-60 p-4 bg-white rounded-lg shadow-lg mx-auto transition hover:scale-105 hover:shadow-xl hover:bg-purple-500 hover:text-white'>

          <img className=' w-20 h-20 pb-2' src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" />
          <h2 className='text-xl'>My account</h2>
          <p className='justify-content grid justify-center items-center'> Create and manage your account settings</p>
        </div>

        <div className='grid place-items-center max-w-80 h-60  p-4 bg-white rounded-lg shadow-lg mx-auto transition hover:scale-105 hover:shadow-xl hover:bg-purple-500 hover:text-white'>
          <img className=' w-20 h-20 pb-2' src="https://cdn-icons-png.flaticon.com/128/4144/4144845.png" alt="" />
          <h2 className='text-xl'>Email campaigns</h2>
          <p className='justify-content grid justify-center items-center'>Manage your email campaigns and communications</p>
        </div>

        <div className='grid place-items-center max-w-80 h-60  p-4 bg-white rounded-lg shadow-lg mx-auto fit-content transition hover:scale-105 hover:shadow-xl hover:bg-purple-500 hover:text-white'>
          <img className=' w-20 h-20 pb-2' src="https://cdn-icons-png.flaticon.com/128/7945/7945013.png" alt="" />
          <h2 className='text-xl'>Contacts</h2>
          <p className='justify-content grid justify-center items-center'>View and manage your contact list</p>
        </div>

        <div className='grid place-items-center max-w-80 h-60 p-4 bg-white rounded-lg shadow-lg mx-auto fit-content transition hover:scale-105 hover:shadow-xl hover:bg-purple-500 hover:text-white  '>
          <img className=' pb-2 h-20  w-20' src="https://cdn-icons-png.flaticon.com/128/3745/3745205.png" alt="" />
          <h2 className='text-xl'>Automation</h2>
          <p className='justify-content grid justify-center items-center'>Automate your marketing processes using emails, SMS and more</p>
        </div>
      </div>

    </div>
  )
}

export default page