import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Vote.css";

export default function Vote({ username }) {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const options = ["Option A", "Option B", "Option C"];
  const emojis = ["👤", "👩", "🧑"];

  // Optional: check if user already voted
  useEffect(() => {
    if (!username) return;
    // You can add backend check here if needed
  }, [username]);

  const handleVote = async () => {
    if (!selectedOption) return alert("Select an option!");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, option: selectedOption }),
      });
      const result = await res.json(); // use `result` for error check
      if (result.error) alert(result.error);
      else setVoted(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting vote");
    } finally {
      setLoading(false);
    }
  };

  if (!username) {
    return (
      <div className="vote-container">
        <div className="vote-card">
          <div className="vote-header">
            <h2>Please log in first</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vote-container">
      <div className="vote-card">
        <div className="vote-header">Vote</div>
        <div className="vote-body">
          <h3 className="welcome-text">Welcome, {username}</h3>

          {voted ? (
            <button
              className="vote-button"
              onClick={() => navigate("/results")}
            >
              See Results
            </button>
          ) : (
            <>
              <div className="options-row">
                {options.map((opt, index) => (
                  <div
                    key={opt}
                    className={`option-card ${
                      selectedOption === opt ? "selected" : ""
                    }`}
                    onClick={() => setSelectedOption(opt)}
                  >
                    <span className="emoji">{emojis[index]}</span>
                    <span className="option-text">{opt}</span>
                  </div>
                ))}
              </div>
              <button
                className="vote-button"
                onClick={handleVote}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Vote"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
