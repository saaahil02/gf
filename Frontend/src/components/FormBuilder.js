

import React, { useState } from "react";
import "../styles/FormBuilder.css";

function FormBuilder({ questions, setQuestions }) {
  const [editingIndex, setEditingIndex] = useState(null);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questext: "", type: "text", options: [], required: false },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    if ((type === "radio" || type === "checkbox") && !updatedQuestions[index].options) {
      updatedQuestions[index].options = [];
    }
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const toggleRequired = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].required = !updatedQuestions[index].required;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const saveForm = async () => {
    try {
      // Ensure the frontend matches the expected field names in the backend
      const formattedQuestions = questions.map((q) => ({
        text: q.text, // Keep the field name as 'text'
        type: q.type, // Keep the field name as 'type'
        options: q.options || [], // If there are options (e.g., for radio/checkbox), include them
        required: q.required,
      }));
  
      const response = await fetch('http://localhost:5000/api/forms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: formattedQuestions }), // Send the correctly named questions
      });
  
      if (!response.ok) throw new Error('Failed to save form');
      alert('Form saved successfully');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  
  // const saveForm = async () => {
  //   try {
  //     // Ensure the frontend matches the expected field names in the backend
  //     const formattedQuestions = questions.map((q) => ({
  //       questionText: q.text, // Rename 'text' to 'questionText'
  //       questionType: q.type, // Rename 'type' to 'questionType'
  //       options: q.options || [], // If there are options (e.g., for radio/checkbox), include them
  //       required: q.required,
  //     }));
  
  //     const response = await fetch('http://localhost:5000/api/forms/create', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ questions: formattedQuestions }), // Send the renamed questions
  //     });
  
  //     if (!response.ok) throw new Error('Failed to save form');
  //     alert('Form saved successfully');
  //   } catch (error) {
  //     alert(`Error: ${error.message}`);
  //   }
  // };
  
  // const validateForm = (questions) => {
  //   for (const question of questions) {
  //     if (!question.text.trim()) return "Question text cannot be empty.";
  //     if ((question.type === "radio" || question.type === "checkbox") && !question.options.length) {
  //       return "Options are required for multiple-choice questions.";
  //     }
  //   }
  //   return null;
  // };
  
  // const saveForm = async () => {
  //   const error = validateForm(questions);
  //   if (error) {
  //     alert(error);
  //     return;
  //   }
  
  //   try {
  //     const formattedQuestions = questions.map((q) => ({
  //       questionText: q.text,
  //       questionType: q.type,
  //       options: q.options || [],
  //       required: q.required,
  //     }));
  
 
  

  return (
    <div className="form-builder">
      <h2>Build Your Form</h2>
      <button onClick={addQuestion}>Add Question</button>
      <div className="questions-list">
        {questions.map((q, index) => (
          <div key={index} className="question">
            <input
              type="text"
              placeholder="Enter question text"
              value={q.text}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            <select
              value={q.type}
              onChange={(e) => handleTypeChange(index, e.target.value)}
            >
              <option value="text">Short Answer</option>
              <option value="paragraph">Paragraph</option>
              <option value="radio">Multiple Choice</option>
              <option value="checkbox">Checkbox</option>
              <option value="file">File Upload</option>
            </select>
            {(q.type === "radio" || q.type === "checkbox") && (
              <div className="options">
                {q.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder="Enter option text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, oIndex, e.target.value)
                    }
                  />
                ))}
                <button onClick={() => addOption(index)}>Add Option</button>
              </div>
            )}
            <div className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={() => toggleRequired(index)}
                />
                Required
              </label>
              <button onClick={() => deleteQuestion(index)}>Delete</button>
            </div>

          </div>

        ))}
      </div>
      <button onClick={() => saveForm()}>submit</button>

    </div>
  );
}

export default FormBuilder;
