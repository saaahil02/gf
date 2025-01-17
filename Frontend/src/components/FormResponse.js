import React, { useState } from "react";
import "../styles/FormResponse.css";

function FormResponse({ questions }) {
  const [responses, setResponses] = useState([]);

  // const handleChange = (index, value) => {
  //   setResponses({ ...responses, [index]: value });
  // };
  const handleChange = (questionId, value) => {
    // Find if the response for this question already exists
    const existingResponseIndex = responses.findIndex(
      (response) => response.questionId === questionId
    );
  
    if (existingResponseIndex !== -1) {
      // If a response exists for this question, update it
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = {
        questionId,
        answerText: value,
      };
      setResponses(updatedResponses);
    } else {
      // If no response exists for this question, add a new one
      setResponses([
        ...responses,
        { questionId, answerText: value },
      ]);
    }
  };
  

  
  // const handleSubmit = async () => {
  //   try {
  //     // Prepare the responses by formatting them into an array that includes the question IDs and answers
  //     const formattedResponses = responses.map((response) => ({
  //       questionId: response.questionId,  // Ensure you include the question ID
  //       answerText: response.answerText,  // Include the user's answer text
  //     }));
  
  //     // Assuming `formId` is the ID of the form you are submitting to
  //     const formId = 'yourFormIdHere';  // Replace with the actual form ID
  
  //     // Send the responses to the backend via POST request
  //     const response = await fetch(`http://localhost:5000/api/responses/submit/${formId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ answers: formattedResponses }),
  //     });
  
  //     if (!response.ok) throw new Error('Failed to submit responses');
  //     alert('Form submitted successfully!');
  //   } catch (error) {
  //     alert(`Error: ${error.message}`);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      const formId = 'yourFormIdHere'; // Replace with the actual form ID
  
      // Send the responses to the backend via POST request
      const response = await fetch(`http://localhost:5000/api/responses/submit/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: responses }), // Send the responses array
      });
  
      if (!response.ok) throw new Error('Failed to submit responses');
      alert('Form submitted successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  
  
  return (
    <div className="form-response">
      <h2>Submit Your Response</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* {questions.map((q, index) => (
          <div key={index} className="question">
            <p>
              {q.text} {q.required && <span className="required">*</span>}
            </p>
            {q.type === "text" && (
              <input
                type="text"
                onChange={(e) => handleChange(index, e.target.value)}
                required={q.required}
              />
            )}
            {q.type === "paragraph" && (
              <textarea
                rows={4}
                onChange={(e) => handleChange(index, e.target.value)}
                required={q.required}
              ></textarea>
            )}
            {q.type === "radio" &&
              q.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <input
                    type="radio"
                    id={`${index}-${oIndex}`}
                    name={`question-${index}`}
                    onChange={(e) => handleChange(index, option)}
                  />
                  <label htmlFor={`${index}-${oIndex}`}>{option}</label>
                </div>
              ))}
            {q.type === "checkbox" &&
              q.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <input
                    type="checkbox"
                    id={`${index}-${oIndex}`}
                    name={`question-${index}`}
                    onChange={(e) =>
                      handleChange(index, [
                        ...(responses[index] || []),
                        option,
                      ])
                    }
                  />
                  <label htmlFor={`${index}-${oIndex}`}>{option}</label>
                </div>
              ))}
            {q.type === "file" && (
              <input
                type="file"
                onChange={(e) => handleChange(index, e.target.files[0])}
                required={q.required}
              />
            )}
          </div>
        ))} */}
        {questions.map((q, index) => (
  <div key={index} className="question">
    <p>
      {q.text} {q.required && <span className="required">*</span>}
    </p>
    {q.type === "text" && (
      <input
        type="text"
        onChange={(e) => handleChange(q._id, e.target.value)} // Use q._id for question ID
        required={q.required}
      />
    )}
    {q.type === "paragraph" && (
      <textarea
        rows={4}
        onChange={(e) => handleChange(q._id, e.target.value)} // Use q._id for question ID
        required={q.required}
      ></textarea>
    )}
    {q.type === "radio" &&
      q.options.map((option, oIndex) => (
        <div key={oIndex}>
          <input
            type="radio"
            id={`${q._id}-${oIndex}`} // Use q._id for question ID
            name={`question-${q._id}`} // Use q._id for question ID
            onChange={(e) => handleChange(q._id, option)}
          />
          <label htmlFor={`${q._id}-${oIndex}`}>{option}</label>
        </div>
      ))}
    {q.type === "checkbox" &&
      q.options.map((option, oIndex) => (
        <div key={oIndex}>
          <input
            type="checkbox"
            id={`${q._id}-${oIndex}`} // Use q._id for question ID
            name={`question-${q._id}`} // Use q._id for question ID
            onChange={(e) =>
              handleChange(q._id, [
                ...(responses.find((response) => response.questionId === q._id)?.answerText || []),
                option,
              ])
            }
          />
          <label htmlFor={`${q._id}-${oIndex}`}>{option}</label>
        </div>
      ))}
    {q.type === "file" && (
      <input
        type="file"
        onChange={(e) => handleChange(q._id, e.target.files[0])} // Use q._id for question ID
        required={q.required}
      />
    )}
  </div>
))}

        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default FormResponse;
