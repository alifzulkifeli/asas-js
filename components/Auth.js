import { useRouter } from 'next/router';
import pb from './../lib/pocketbase';
const Auth = () => {
const router = useRouter();
  // let provs = providers.authProviders
    let redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL

  const startLogin = async () => {
    // localStorage.setItem("provider", JSON.stringify(prov));
    //     const url = provs[0].authUrl + redirectUrl
    //     if (typeof window !== 'undefined') {
    //         window.location.href = url;
    //     }

    const authMethods = await pb.collection('users').listAuthMethods();
    localStorage.setItem('provider', JSON.stringify(authMethods.authProviders[0]))
    router.push(authMethods.authProviders[0].authUrl+redirectUrl);
  }

  return (<div>
    <div className='w-full h-full flex-col-center'>
      <div className='text-3xl font-bold '>LOGIN</div>
      {
        //  provs&&provs?.map((item,index)=>{
        //   return (
          
        <button
          className='bg-blue-500 text-white rounded-lg w-1/2 h-12 mt-4'
          border={'1px solid'}
          padding={'2%'}
          textSize={'1.2 rem'}
          onClick={() => startLogin()}
          
        >login</button>
        //     )
        // })
      }
    </div>
  </div>);
}

export default Auth;