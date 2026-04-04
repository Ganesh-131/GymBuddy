import { useState } from "react";
import axios from "axios";

function Workout() {
  const [target, setTarget] = useState(10);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const startWorkout = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/ai/bicep?target=${target}`
      );

      setResult(res.data);
    } catch (err) {
      alert("Error starting workout");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🏋️ Gym Buddy</h1>

      <h2>Bicep Curl 💪</h2>

      <p>Select Target Reps:</p>

      <button onClick={() => setTarget(10)}>10</button>
      <button onClick={() => setTarget(15)}>15</button>

      <h3>Selected: {target}</h3>

      <button onClick={startWorkout} disabled={loading}>
        {loading ? "Workout Running..." : "Start Workout"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Workout Completed ✅</h2>
          <p>Target: {result.target}</p>
          <p>Reps Done: {result.reps}</p>
        </div>
      )}
    </div>
  );
}

export default Workout;