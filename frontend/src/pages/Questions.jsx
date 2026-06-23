import { useEffect, useState } from "react";
import API_URL from "../services/Api.jsx";

function Questions() {

  const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Get Questions
  const getQuestions = () => {
    fetch(`${API_URL}/questions`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  };

  // Add Question
  const addQuestion = () => {
      if (
    !question.trim() ||
    !answer.trim() ||
    !topic.trim() ||
    !difficulty.trim()
  ) {
    alert("All fields are required");
    return;
  }
    fetch(`${API_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
        topic,
        difficulty,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setQuestion("");
        setAnswer("");
        setTopic("");
        setDifficulty("");

        getQuestions();
      });
  };

  // Update Question
  const updateQuestion = () => {
    fetch(`${API_URL}/question/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
        topic,
        difficulty,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setEditId(null);

        setQuestion("");
        setAnswer("");
        setTopic("");
        setDifficulty("");

        getQuestions();
      });
  };

  // Delete Question
  const deleteQuestion = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this question?"
  );

  if (!confirmDelete) {
     return;
  }
    fetch(`${API_URL}/question/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        getQuestions();
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const filteredQuestions = questions.filter((q) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    if (!isNaN(searchText)) {
      return q.id.toString() === searchText;
    }

    return (
      q.question.toLowerCase().includes(searchText) ||
      q.topic.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="page">

      <h2>Questions Management</h2>

      <div className="form-container">

        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <input
          type="text"
          placeholder="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />

<div className="button-group">

  <button
    onClick={() => {
      if (editId) {
        updateQuestion();
      } else {
        addQuestion();
      }
    }}
  >
    {editId ? "Update Question" : "Add Question"}
  </button>

  {editId && (
    <button
      onClick={() => {
        setEditId(null);
        setQuestion("");
        setAnswer("");
        setTopic("");
        setDifficulty("");
      }}
    >
      Cancel
    </button>
  )}

</div>

      </div>

      <br />

      <input
        type="text"
        placeholder="Search Question..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Topic</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>

<tbody>

  {filteredQuestions.length === 0 ? (

    <tr>
      <td colSpan="5">
        No Questions Found
      </td>
    </tr>

  ) : (

    filteredQuestions.map((q) => (
      <tr key={q.id}>
        <td>{q.id}</td>
        <td>{q.question}</td>
        <td>{q.topic}</td>
        <td>{q.difficulty}</td>

        <td>

          <button
            className="edit-btn"
            onClick={() => {
              setEditId(q.id);
              setQuestion(q.question);
              setAnswer(q.answer || "");
              setTopic(q.topic);
              setDifficulty(q.difficulty);
            }}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteQuestion(q.id)}
          >
            Delete
          </button>

        </td>
      </tr>
    ))

  )}

</tbody>

      </table>

    </div>
  );
}

export default Questions;