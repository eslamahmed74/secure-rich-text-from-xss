import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <main className="app-shell">
      <h1>Text Input Demo</h1>

      <div className="formFields">
        <label htmlFor="name">Name</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="message">Message</label>

        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
        />
      </div>

      <section
        className="preview"
        role="region"
        aria-labelledby="preview-heading"
      >
        <h2 id="preview-heading">Live Preview</h2>
        <p>
          <strong>Name:</strong> {name || "Nothing entered yet"}
        </p>

        <p>
          <strong>Message:</strong> {message || "Nothing enterd yet"}
        </p>
      </section>
    </main>
  );
}

export default App;
