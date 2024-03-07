const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

app.listen(PORT);

app.post("/text", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  //   const prompt = "Write a story about a magic backpack.";
  const prompt = req.body.prompt;

  try {

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).json({ answer: text });

  } catch (error) {
    res.status(400).send("Bad request");
  }

});

// async function run(prompt) {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   //   const prompt = "Write a story about a magic backpack.";

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();
