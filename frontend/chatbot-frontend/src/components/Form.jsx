import { useEffect, useState } from "react";
import RenderItems from "./RenderItems";
import Skeleton from "./Skeleton";

const Form = () => {
  const [getResponse, setGetResponse] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (userInput !== "") {
      fetch(`http://localhost:3000/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      }).then(async (res) => {
        const json = await res.json();
        setHistory((prevHistory) => [
          { question: userInput, response: json.response },
          ...prevHistory,
        ]);
        setUserInput("");
        setGetResponse(false);
      });
    }
  }, [getResponse]);

  return (
    <>
      <div className="main-container flex">
        <div className="input-container ml-8">
          <input
            placeholder="What you want to know about Samrat?"
            value={userInput}
            name="userInput"
            onChange={(e) => setUserInput(e.target.value)}
            className="input input-bordered input-info w-[30vw] mt-1"
          />
          <button className="btn mt-2" onClick={() => setGetResponse(true)}>
            {getResponse ? <Skeleton /> : "Send"}
          </button>
        </div>
        <div className="history-container w-1/2">
          <div className="history fixed top-0 w-full flex flex-col items-center justify-center">
            {/* <h3 className="my-8 mr-[40rem] text-2xl font-mono font-semibold">Responses:</h3> */}
            <div className="mt-12 w-[50vw] -ml-[40rem]">
              <RenderItems arr={history} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
