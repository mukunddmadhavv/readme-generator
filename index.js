// index.js
import dotenv from "dotenv";
import { fetchRepoData } from "./utils/github.js";
import { generateReadme } from "./utils/gemini.js";
import fs from "fs";
import path from "path";

dotenv.config();

async function main() {
  const repoUrl = process.argv[2];
  if (!repoUrl) {
    console.error("❌ Please provide a GitHub repo URL");
    console.log("👉 Example: node index.js https://github.com/facebook/react");
    process.exit(1);
  }

  try {
    console.log("📡 Fetching repo data from GitHub...");
    const repoData = await fetchRepoData(repoUrl);

    console.log("🤖 Asking Gemini to generate README...");
    const readmeContent = await generateReadme(repoData);

    const outputDir = path.join(process.cwd(), "output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const filePath = path.join(outputDir, "README.generated.md");
    fs.writeFileSync(filePath, readmeContent);

    console.log(`✅ README generated successfully: ${filePath}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

main();
