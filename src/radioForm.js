// RadioForm.js
import React from 'react';

const RadioForm = ({ questionsAndAnswers }) => (
  <div>
    {questionsAndAnswers.map((qa, index) => (
      <div key={index}>
        <p>{qa.question}</p>
        {qa.answers.map((answer) => (
          <div className="form-check" key={answer.id}>
            <input
              className="form-check-input"
              type="radio"
              name={`flexRadioDefault${index}`}
              id={answer.id}
            />
            <label className="form-check-label" htmlFor={answer.id}>
              {answer.label}
            </label>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default RadioForm;
