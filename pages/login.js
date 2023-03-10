import { useRouter } from 'next/router';
import pb from './../lib/pocketbase';

const Login = () => {
  const router = useRouter();
  // let provs = providers.authProviders
  let redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL
  
  const handleLogin = async () => {
    const authMethods = await pb.collection('users').listAuthMethods();
    localStorage.setItem('provider', JSON.stringify(authMethods.authProviders[0]))
    router.push(authMethods.authProviders[0].authUrl+redirectUrl);
  }

  return ( 

    <div className='grid lg:pt-80  pt-80' >
 <div class="my-6 place-content-center flex  items-center "onClick={handleLogin} >
    <button class="flex self-center rounded-3xl border-none bg-gray-200 p-1 text-black hover:bg-gray-400 sm:p-2"><img src="https://freesvg.org/img/1534129544.png" class="mr-2 w-6 object-fill"  />Sign in with Google</button>
  </div>
    </div>
   
   );
}
 
export default Login;