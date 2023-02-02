import q from "../../data/js.json";
import { useState } from 'react';
import { useRouter } from 'next/router'
import pb from './../../lib/pocketbase';
import { useEffect } from 'react';

const Quiz = () => {
  const router = useRouter()
  const { quiz_no } = router.query
  const questions = q[quiz_no]
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

    

  useEffect(() => {
    if (!localStorage.getItem('provider')) {
      router.push('/login')
  
    }
  }, [])


  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };


  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };


  useState(() => {
    if(!router.isReady) return;
    if (!pb.authStore.isValid) {
      router.push('/login');
    }
  },  [router.isReady])


  return (

    <>
    { questions ? (
      <div className=" grid md:grid-cols-9" >

      
      <div className="col-span-2 hidden md:block bg-[#1A1A1A] h-screen w-full ">
      </div>
      <div className="flex flex-col md:col-span-5  flex-grow px-5 justify-center items-center pb-10 w-auto ">
      
      {showScore ? (
        <h1 className="text-3xl font-semibold text-center text-white">
          You scored {score} out of {questions.length}
        </h1>
      ) : (
        <>

          <div className="flex flex-col items-start w-full">
            <h4 className="mt-10 text-xl text-white/60">
              Question {currentQuestion + 1} of {questions.length}
            </h4>
            <div className="mt-4 text-2xl text-white">
              {questions[currentQuestion].question}
            </div>
          </div>



          <div className="flex flex-col w-full display-linebreak">
            {questions[currentQuestion].answerOptions.map((answer, index) => (
              <div
                key={index}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                onClick={(e) => handleAnswerOption(answer.answer)}
              >
                <input
                  type="radio"
                  name={answer.answer}
                  value={answer.answer}
                  onChange={(e) => handleAnswerOption(answer.answer)}
                  checked={
                    answer.answer === selectedOptions[currentQuestion]?.answerByUser
                  }
                  className="w-6 h-6 bg-black"
                />
                <p className="ml-6 text-white">{answer.answer}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between w-full mt-4 text-white">
            <button
              onClick={handlePrevious}
              className="w-[49%] py-3 bg-indigo-600 rounded-lg"
            >
              Previous
            </button>
            <button
              onClick={
                currentQuestion + 1 === questions.length ? handleSubmitButton : handleNext
              }
              className="w-[49%] py-3 bg-indigo-600 rounded-lg"
            >
              {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
            </button>


          </div>
        </>
      )
      }
      
    </div>
    </div> 
    ) : (
     <div>
        <h1 className="text-center text-white font-bold text-3xl " >Quiz not found</h1>
     </div> 
    )}
    </>
   

    );
}

export default Quiz;

