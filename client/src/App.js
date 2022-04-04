import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    Axios.post("http://localhost:3002/create-user", { username, password });
  }
  return (
    <div className="App">
      <div className="register-container">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="line">
            <label htmlFor="">Username</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="line">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name=""
              id=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;
