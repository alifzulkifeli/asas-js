
import Auth from './../components/Auth';
import pb from './../lib/pocketbase';
export default function Home({records}) {

  console.log(pb.authStore.isValid);

  // example create data
  const data = {
      "users": "RELATION_RECORD_ID",
      "no": 123,
      "data": "JSON"
  };

  const logout = async () => {
    await pb.authStore.clear();
    console.log(pb.authStore.isValid);
  }

  const handleClick = async () => {


  const record = await pb.collection('question_set').create(data);

  console.log(record);
  }
  return (
    <>
    <Auth/>
    <button onClick={handleClick} >add</button>
    <button onClick={logout} >logout</button>
    </>
  );
}

