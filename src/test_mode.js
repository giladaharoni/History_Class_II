
import RadioForm from './radioForm';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { api_path } from './constant';
import { useNavigate } from 'react-router-dom';
// const questionsAndAnswers = [
//   {
//     question: "What is your favorite color?",
//     answers: [
//       { id: "color1", label: "Blue" },
//       { id: "color2", label: "Red" },
//       { id: "color3", label: "Green" },
//     ],
//     correctAnswerId: "color1"
//   },
//   {
//     question: "What is your favorite animal?",
//     answers: [
//       { id: "animal1", label: "Dog" },
//       { id: "animal2", label: "Cat" },
//       { id: "animal3", label: "Bird" },
//     ],
//     correctAnswerId: "animal2"

//   },
//   {
//     question: "What is your favorite animal?",
//     answers: [
//       { id: "animal1", label: "Dog" },
//       { id: "animal2", label: "Cat" },
//       { id: "animal3", label: "Bird" },
//     ],
//     correctAnswerId: "animal1"

//   },
// ];

export default function TestMode() {
  let navigate = useNavigate();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [score, setScore] = useState(0);

  const [questionsAndAnswers, setQuestionAndAnswers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let lesson = localStorage.getItem('lesson_id')
        const params = {lesson_id: lesson}
        const response = await axios.get(api_path + '/api/test',{ params });
        setQuestionAndAnswers(response.data['questions'])

      } catch (error) {

      } finally {

      }
    };

    fetchData();
  }, []);

  // Define your questionsAndAnswers array here

  const handleFormSubmit = () => {
    // Handle form submission logic here
    setSubmitClicked(true);
    alert("your grade is:"+ score);
    let lesson = localStorage.getItem('lesson_id')
    const jsondata = {lesson_id: lesson, score: score}
    
    axios.post(api_path+"/api/submit_test",jsondata)
    .then(response => {
        if (response.status === 200) {
            navigate('/ScoreBoard');
        } else {
        }
    })
    .catch(error => {
        if (error.status=400) {
            alert(error.response.data['message'])
        } else {
            alert("Error occurred: " + error.message);

        }
        // Handle the error here
        
    });
  };
  if (questionsAndAnswers.length==0) {
    return <div>loading</div>
    
  } else {
    console.log(questionsAndAnswers)
    return (
      <div>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              {/* {questionsAndAnswers[0]['question']} */}
              
  
              <RadioForm questionsAndAnswers={questionsAndAnswers} submitClicked={submitClicked} setscore = {setScore} />
            </div>
            {/* ... other form elements ... */}
          </div>
        </div>
  
        {/* ... additional rows and form elements ... */}
  
        <button className="register-button">
          <a href="\SelectLesson" className="link-primary">Select Another Lesson</a>
        </button>
        <button className="register-button" onClick={handleFormSubmit}>
          <a className="link-primary">Submit</a>
        </button>
        <button className="register-button">
          <a href="\ScoreBoard" className="link-primary">ScoreBoard</a>
        </button>
      </div>
    );
  }


};