import { useEffect } from "react";
import pb from './../lib/pocketbase';

const Redirect = () => {
  let redirectUrl = 'http://localhost:3000/redirect'


  useEffect(() => {
    const params = (new URL(window.location)).searchParams;
    const provider = JSON.parse(localStorage.getItem('provider'))

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
).then((authData) => {
    // document.getElementById('content').innerText = JSON.stringify(authData, null, 2);
    console.log(authData);
}).catch((err) => {
    // document.getElementById('content').innerText = "Failed to exchange code.\n" + err;
    console.log(err);
});

  }, [])


  return ( <div>

  </div> );
}
 
export default Redirect;