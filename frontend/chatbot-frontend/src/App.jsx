import { memo, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [replies, setReplies] = useState([]);
  const [getResponse, setGetResponse] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    }).then(async (res) => {
      const json = await res.json();
      setReplies((prevReplies) => [...prevReplies, json.response]);
      setHistory((prevHistory) => [...prevHistory, userInput]);
      setUserInput("");
    });
  }, [getResponse]);

  return (
    <>
      <input
        placeholder="What you want to know about Samrat?"
        value={userInput}
        name="userInput"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={() => setGetResponse(!getResponse)}>Send</button>
      <div>
        {replies.map((item, index) => (
          <RenderItems key={index} message={item} />
        ))}
      </div>
      <h1>History:</h1>
      <div>
        {history.map((item, index) => (
          <RenderItems key={index} message={item} />
        ))}
      </div>
    </>
  );
}

const RenderItems = memo(({ message,index }) => {
  return <div>{message}</div>;
});

export default App;
