
import { useState } from 'react';
import { useRouter } from 'next/router';
import pb from './../lib/pocketbase';
const Handler = ({children}) => {
  const router = useRouter();
  
  useState(() => {
    if(!router.isReady) return;
    if (!pb.authStore.isValid) {
      router.push('/login');
    }
  },  [router.isReady])




  return ( 
  <div>
    {children}
  </div> );
}
 
export default Handler;