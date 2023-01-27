import { useEffect } from "react";
import pb from './../lib/pocketbase';
import { useRouter } from 'next/router';


const Redirect = () => {
  const router = useRouter();
  let redirectUrl = 'http://localhost:3000/redirect'


  useEffect(() => {
    const params = (new URL(window.location)).searchParams;
    const provider = JSON.parse(localStorage.getItem('provider'))
    console.log(provider);
    if (provider.state !== params.get('state')) {
      throw "State parameters don't match.";

      
  }



  pb.collection('users').authWithOAuth2(
    provider.name,
    params.get('code'),
    provider.codeVerifier,
    redirectUrl,
    // pass optional user create data
    {
        emailVisibility: false,
    }
).then( async (authData) => {
    // document.getElementById('content').innerText = JSON.stringify(authData, null, 2);
    
    try {
      const record = await pb.collection('verified_email').getFirstListItem('email="'+authData.meta.email + '"');
      console.log(authData.meta.email);
      console.log(record);
      router.push('/');
      
    } catch (error) {
      pb.authStore.clear()
      router.push('/404');
    }
    
}).catch((err) => {
    // document.getElementById('content').innerText = "Failed to exchange code.\n" + err;
    console.log(err);
});

  }, [])


  return ( <div>

  </div> );
}
 
export default Redirect;