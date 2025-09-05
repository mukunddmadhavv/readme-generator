// tests/test.js
import { fetchRepoData } from "../utils/github.js";
import { generateReadme } from "../utils/gemini.js";

async function runTests() {
  try {
    const repoUrl = ""; // test repo

    console.log("🔍 Fetching repo data...");
    const repoData = await fetchRepoData(repoUrl);
    console.log("✅ GitHub API Data:", repoData);

    console.log("\n📝 Generating README content...");
    const readmeContent = await generateReadme(repoData);
    console.log("✅ Gemini Output:\n", readmeContent);
  } catch (error) {
    console.error("❌ Error in test:", error.message);
  }
}

runTests();
