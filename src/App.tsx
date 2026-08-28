import { useState, type FormEvent } from "react";
import DOMPurify from "dompurify";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sanitizedMessage = DOMPurify.sanitize(message);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="app-shell">
      <h1>Text Input Demo</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            value={name}
            required
            maxLength={60}
            onChange={(event) => {
              setName(event.target.value);
              setSubmitted(false);
            }}
          />

          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setSubmitted(false);
            }}
            rows={5}
            required
            maxLength={500}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p className="success" role="status">
          Thank you, {name}. Your message is ready.
        </p>
      )}

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
          <strong>Message:</strong> {message || "Nothing entered yet"}
        </p>
      </section>

      <section
        className="protected-preview"
        role="region"
        aria-labelledby="protected-html-heading"
      >
        <h2 id="protected-html-heading">Protected HTML </h2>
        <div
          className="protected-output"
          dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
        />
      </section>

      <section
        className="safe-preview"
        role="region"
        aria-labelledby="safe-html-heading"
      >
        <h2 id="safe-html-heading">Safe React</h2>

        <div className="safe-output">{message}</div>
      </section>

      <section
        className="vulnerable-preview"
        role="region"
        aria-labelledby="vulnerable-html-heading"
      >
        <h2 id="vulnerable-html-heading">Vulnerable HTML</h2>
        {submitted ? (
          <div
            className="vulnerable-output"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ) : (
          <p>Submit the form to run the local demo.</p>
        )}
      </section>
    </main>
  );
}

export default App;
