import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api_path } from './constant';

const RadioForm = ({submitClicked }) => {
  const [helpIndex, setHelpIndex] = useState(null);
  let user_id = localStorage.getItem('user_id')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_path + '/api/test');
        const rows = [];
        for (let index = 0; index < response.data.length; index += 8) {
          rows.push(response.data.slice(index, index + 8));
        }
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);

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