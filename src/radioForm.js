import React, { useState } from 'react';

const RadioForm = ({ questionsAndAnswers, submitClicked, setscore }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsAndAnswers.length).fill(null));

	const handleAnswerSelection = (index, selectedOption) => {
	  setSelectedAnswers(prevSelectedAnswers => {
		const updatedSelectedAnswers = [...prevSelectedAnswers];
		updatedSelectedAnswers[index] = selectedOption;
		calculateScore(updatedSelectedAnswers); // Pass the updated answers to calculateScore
		return updatedSelectedAnswers;
	  });
	};


  const calculateScore = (updatedSelectedAnswers) => {
    let grade = 0
    questionsAndAnswers.forEach((qa, index) => {
	
      if (updatedSelectedAnswers[index] === qa.right_answer) {
        grade++;
      }
    });
    setscore((grade/8)*100)
  };

  return (
    <div>
      {questionsAndAnswers.map((qa, index) => (
        <div key={index} className='p-2 border'>
          <p className='fw-bold'>
            {qa.question}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => alert(qa.right_answer)}
            >
              Help
            </button>
          </p>
          {qa.options.map((answer) => (
            <div className="form-check" key={answer}>
              <input
                className="form-check-input"
                type="radio"
                name={`flexRadioDefault${index}`}
                id={answer}
                onClick={() => handleAnswerSelection(index, answer)}
              />
              <label
                className={`form-check-label ${
                  submitClicked && answer === qa.right_answer[0] ? 'text-success' : ''
                }`}
                htmlFor={answer}
              >
                {answer}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RadioForm;
