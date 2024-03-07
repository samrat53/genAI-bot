import { memo, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [replies, setReplies] = useState([]);
  const [getResponse, setGetResponse] = useState(false);
  const [userInput, setUserInput] = useState("");

  const sendRequest = async () => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }), // Send userInput in the request body
      });

      const data = await response.json();
      setReplies(prevReplies => [...prevReplies, data.response]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        placeholder="What you want to know about Samrat?"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={sendRequest}>Send</button>
      <div>
        {replies.map((item, index) => (
          <RenderItems key={index} message={item} />
        ))}
      </div>
    </>
  );

  // useEffect(() => {
  //   fetch(`http://localhost:3000/`).then(async (res) => {
  //     const json = await res.json();
  //     setReplies(prevReplies => [...prevReplies, json.response]);
  //   });
  // }, [getResponse]);
  

  // return (
  //   <>
  //     <input
  //       placeholder="What you want to know about Samrat?"
  //       value={userInput}
  //       name="userInput"
  //       onChange={(e) => setUserInput(e.target.value)}
  //     />
  //     <button onClick={() => setGetResponse(!getResponse)}>Send</button>
  //     <div>
  //       {replies.map((item, index) => (
  //         <RenderItems key={index} message={item} />
  //       ))}
  //     </div>
  //   </>
  // );
}

const RenderItems = memo(({ message }) => {
  return <div>{message}</div>;
});

export default App;
