import Playground from 'javascript-playgrounds'
import * as data from './data'  
import { useRouter } from 'next/router';

const Code = () => {
    const router = useRouter()
    const { code_no } = router.query
    const code = data[code_no]
    
    console.log(data[code_no]);
    return (
        <>
        {
            code ? (
                <div>
                <div className='md:block hidden w-full h-full min-h-max ' >
                    <Playground code={code} style={{ width: "100%", height: "89vh" }} />
                </div>
    
                <div className='block md:hidden w-full h-full min-h-max  ' >
                    <Playground code={code} style={{ width: "100%", height: "78vh", font: "16px" }} />
                </div>
            </div>
            ) : 
            (
                <div className=' text-white text-center text-2xl ' >
                    No code found, Plaese check the url
                </div>
            )

        }
       </>
    );
}

export default Code;