// utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateReadme(repoData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY in .env");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a professional README generator.
Using the following repo metadata, create a complete and clean README.md.
If something is missing, write "TBD".

Repo Data:
${JSON.stringify(repoData, null, 2)}

README should include:

# ${repoData.name}

## Description
${repoData.description || "TBD"}

## Features
- TBD

## Installation Guide
- TBD

## Tech Stack
- ${repoData.languages.join(", ") || "TBD"}

## Project Structure
- TBD

## License
${repoData.license}
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
