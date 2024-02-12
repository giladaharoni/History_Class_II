
import RadioForm from './radioForm';
import { useState } from 'react';
const questionsAndAnswers = [
    {
      question: "What is your favorite color?",
      answers: [
        { id: "color1", label: "Blue" },
        { id: "color2", label: "Red" },
        { id: "color3", label: "Green" },
      ],
      correctAnswerId: "color1"
    },
    {
      question: "What is your favorite animal?",
      answers: [
        { id: "animal1", label: "Dog" },
        { id: "animal2", label: "Cat" },
        { id: "animal3", label: "Bird" },
      ],
      correctAnswerId: "animal2"
    
    },
    {
        question: "What is your favorite animal?",
        answers: [
          { id: "animal1", label: "Dog" },
          { id: "animal2", label: "Cat" },
          { id: "animal3", label: "Bird" },
        ],
        correctAnswerId: "animal1"
      
      },
  ];

export default function TestMode(){
  const [submitClicked, setSubmitClicked] = useState(false);

  // Define your questionsAndAnswers array here

  const handleFormSubmit = () => {
    // Handle form submission logic here
    setSubmitClicked(true);
    alert("your grade is:")
  };

    return (
        <div>
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <RadioForm questionsAndAnswers={questionsAndAnswers} submitClicked={submitClicked}/>
              </div>
              {/* ... other form elements ... */}
            </div>
          </div>
    
          {/* ... additional rows and form elements ... */}
    
          <button className="register-button">
            <a href="\SelectLesson" className="link-primary">Select Another Lesson</a>
          </button>
          <button className="register-button"  onClick={handleFormSubmit}>
            <a className="link-primary">Submit</a>
          </button>
          <button className="register-button">
            <a href="\ScoreBoard" className="link-primary">ScoreBoard</a>
          </button>
        </div>
      );
};