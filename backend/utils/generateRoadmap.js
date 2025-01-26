const axios = require("axios");

// Mock resource recommendations
const mockResources = [
  "Coursera: Full-Stack Web Development by IBM",
  "Udemy: The Complete JavaScript Course 2023",
  "GitHub: Open-source projects to contribute",
];

// Replace with your Hugging Face API key
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

const generateRoadmap = async (userInput) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",  // You can use other models like GPT-Neo as well
      {
        inputs: `Generate a career roadmap for: ${userInput}`,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
      }
    );

    // Assuming the model returns the text under 'generated_text'
    const roadmapText = response.data[0].generated_text.trim();

    // Append mock resources to the generated roadmap
    return `${roadmapText}\n\nRecommended Resources:\n${mockResources.join("\n")}`;
  } catch (error) {
    console.error("Error generating roadmap:", error.message);
    throw new Error("Failed to generate roadmap. Try again later.");
  }
};

module.exports = generateRoadmap;
