import { useState } from 'react';
import pb from './../lib/pocketbase';
import { useRouter } from 'next/router';
import NoSSR from 'react-no-ssr';
import Link from 'next/link';

const Layout = ({ children }) => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('provider');
    pb.authStore.clear();
    router.push('/login');
  };



  return (
    // create header and footer using tailwind
    <div className=" ">
      
      <nav className="w-full bg-pink-900 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between md:py-3 py-2 md:block">
              <button onClick={() => router.reload('/')}>
                <h2 className="text-2xl font-bold text-white">Asas Javascript</h2>
              </button>
    
              <div className="md:hidden">
                <button
                  className=" text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                }`}
            >


              <NoSSR>
                <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                  {pb.authStore.isValid && (
                    <button
                      onClick={handleLogout}
                      className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                      Logout
                    </button>)
                  }


                </div>
              </NoSSR>
            </div>
          </div>

          <NoSSR>

            <div className="hidden space-x-2 md:inline-block">
              {
                pb.authStore.isValid && (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Logout
                  </button>)
              }

            </div>
          </NoSSR>
        </div>
      </nav>




      {/* Replace with your content */}
      {/* <div className=" ">
        <div className='h-full' > */}
      <div className='grid   bg-[#1A1A1A] content-center' >
      {children}
      </div>
 

        {/* </div>
   

      </div> */}
      {/* /End replace */}




      <nav className="w-full bg-pink-900 shadow footerWrap">
        <div className=' text-center text-white' >
          {/* create copyright footer */}
          <footer>&copy; Copyright {new Date().getFullYear()} Aliff</footer>
        </div>
      </nav>

    </div>




  );
}

export default Layout;