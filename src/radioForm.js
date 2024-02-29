import React, { useState } from 'react';

const RadioForm = ({ questionsAndAnswers, submitClicked, setscore }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsAndAnswers.length).fill(null));

  const handleAnswerSelection = (index, selectedOption) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = selectedOption;
    setSelectedAnswers(updatedSelectedAnswers);
    calculateScore();
  };

  const calculateScore = () => {
    let grade = 0
    questionsAndAnswers.forEach((qa, index) => {
      if (selectedAnswers[index] === qa.right_answer[0]) {
        grade++;
      }
    });
    setscore((grade/questionsAndAnswers.length)*100)
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
              onClick={() => alert(qa.right_answer[0])}
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
                onChange={() => handleAnswerSelection(index, answer)}
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
