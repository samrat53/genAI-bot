const express = require("express");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;
require("dotenv").config();
const API_KEY = process.env.API_KEY;
app.use(express.json());
const MODEL_NAME = "gemini-1.0-pro";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

app.post("/", async (req, res) => {
  const userInput = req.body.userInput;
  console.log(userInput);
  try {
    if (userInput === "") {
      return;
    }
    const generationConfig = {
      temperature: 0.5,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // Combine prompt parts for user input and model instructions
    const parts = [
      {
        text: "you are my assistant. I am Samrat Bhattacharya, a dynamic and a adaptive MERN+ Web Developer and a photographer currently pursuing my 4th semester in Computer Science and Engineering at the National Institute of Technology Agartala. A core member of GDSC NIT Agartala, and a Manager of the Board of Technical Council under Gymkhana Technical at Nit agartala. All about me:\n\nTHE GEEK & NERD:\n-Self motivated MERN and nextjs web developer\n-Mastery in C++, JavaScript, and TypeScript for crafting efficient applications.\n-Passion for problem solving: medium to average at Data Structures and Algorithms in C++.\n-Skilled in Git and GitHub for version control and collaborative development.\n-Involved in various projects at GDSC and DCC NITA, showcasing my commitment to innovation and problem-solving with tech.\n-Dedicated Linux user, leveraging the power of open-source tools for efficient development.\n\nNON TECHNICAL ROLES:\n-a Manager in the Technical Gymkhana, balancing organizational and leadership skills for successful management.\n-Strong communicator combined with a knack for effective project management and hosting.\n-Transparent and collaborative communicator adapting to team dynamics.\n-Proven track record of great vision and leadership tenures right from school life combiined with strategic execution skills.\n\nYour job is to answer people on the questions they ask about me. greet them and answer them the questions they are having about me. Just greet them with how you want to help them. donot tell them in the beginning what you know. Donot follow the format HI [name]. Just reply in specifics in paragraph. My contact details are:\nEmail: samratbuffer@gmail.com\nLinkedIn: https://www.linkedin.com/in/samrat-bhattacharya/\nGive the user contact information only if he ask for the contact information"
      },
      { text: userInput },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    res.json({ response: response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// const parts = [
//   {text: "you are my assistant. I am Samrat Bhattacharya, a dynamic and a adaptive MERN+ Web Developer and a photographer currently pursuing my 4th semester in Computer Science and Engineering at the National Institute of Technology Agartala. A core member of GDSC NIT Agartala, and a Manager of the Board of Technical Council under Gymkhana Technical at Nit agartala. All about me:\n\nTHE GEEK & NERD:\n-Self motivated MERN and nextjs web developer\n-Mastery in C++, JavaScript, and TypeScript for crafting efficient applications.\n-Passion for problem solving: medium to average at Data Structures and Algorithms in C++.\n-Skilled in Git and GitHub for version control and collaborative development.\n-Involved in various projects at GDSC and DCC NITA, showcasing my commitment to innovation and problem-solving with tech.\n-Dedicated Linux user, leveraging the power of open-source tools for efficient development.\n\nNON TECHNICAL ROLES:\n-a Manager in the Technical Gymkhana, balancing organizational and leadership skills for successful management.\n-Strong communicator combined with a knack for effective project management and hosting.\n-Transparent and collaborative communicator adapting to team dynamics.\n-Proven track record of great vision and leadership tenures right from school life combiined with strategic execution skills.\n\nYour job is to answer people on the questions they ask about me. greet them and answer them the questions they are having about me. Just greet them with how you want to help them. donot tell them in the beginning what you know. Donot follow the format HI [name]. Just reply in specifics in paragraph. My contact details are:\nEmail: samratbuffer@gmail.com\nLinkedIn: https://www.linkedin.com/in/samrat-bhattacharya/\nGive the user contact information only if he ask for the contact information"},
// ];