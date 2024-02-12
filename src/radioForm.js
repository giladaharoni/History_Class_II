import React, { useState } from 'react';

const RadioForm = ({ questionsAndAnswers, submitClicked }) => {
  const [helpIndex, setHelpIndex] = useState(null);

  return (
    <div>
      {questionsAndAnswers.map((qa, index) => (
        <div key={index}>
          <p>
            {qa.question}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setHelpIndex(index)}
            >
              Help
            </button>
          </p>
          {qa.answers.map((answer) => (
            <div className="form-check" key={answer.id}>
              <input
                className="form-check-input"
                type="radio"
                name={`flexRadioDefault${index}`}
                id={answer.id}
              />
              <label
                className={`form-check-label ${
                  helpIndex === index && answer.id === qa.correctAnswerId ? 'text-danger' : '',
                  submitClicked && answer.id === qa.correctAnswerId ? 'text-success' : ''
                }`}

                htmlFor={answer.id}
              >
                {answer.label}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RadioForm;