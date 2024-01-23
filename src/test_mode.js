
import RadioForm from './radioForm';
const questionsAndAnswers = [
    {
      question: "What is your favorite color?",
      answers: [
        { id: "color1", label: "Blue" },
        { id: "color2", label: "Red" },
        { id: "color3", label: "Green" },
      ],
    },
    {
      question: "What is your favorite animal?",
      answers: [
        { id: "animal1", label: "Dog" },
        { id: "animal2", label: "Cat" },
        { id: "animal3", label: "Bird" },
      ],
    
    },
    {
        question: "What is your favorite animal?",
        answers: [
          { id: "animal1", label: "Dog" },
          { id: "animal2", label: "Cat" },
          { id: "animal3", label: "Bird" },
        ],
      
      },
  ];

export default function TestMode(){
    return (
        <div>
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <RadioForm questionsAndAnswers={questionsAndAnswers} />
              </div>
              {/* ... other form elements ... */}
            </div>
          </div>
    
          {/* ... additional rows and form elements ... */}
    
          <button className="register-button">
            <a href="\SelectLesson" className="link-primary">Select Another Lesson</a>
          </button>
        </div>
      );
};