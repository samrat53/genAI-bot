import React, { memo } from "react";

const RenderItems = memo(({ arr }) => {
  return (
    <div className="render-items-container overflow-y-auto max-h-[100vh]">
      {arr.map((item, index) => {
        return (
          <div className="render-item" key={index}>
            <div className="chat chat-end response">
              <div className="chat-bubble w-[50rem] rounded-md text-lg">
                <span className="underline font-extrabold">
                  You:
                  <br />
                </span>{" "}
                {item.question}
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble question w-[50rem] rounded-md text-lg">
                <span className="underline font-extrabold">
                  Bot:
                  <br />
                </span>{" "}
                {item.response}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default RenderItems;
