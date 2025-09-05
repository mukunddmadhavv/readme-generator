// utils/github.js
import { Octokit } from "octokit";

export async function fetchRepoData(repoUrl) {
  // Extract owner/repo from URL
  const match = repoUrl.match(/github\.com\/(.+?)\/(.+?)(?:$|\/)/);
  if (!match) throw new Error("Invalid GitHub repo URL");

  const [_, owner, repo] = match;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN || undefined, // optional token
  });

  // Fetch repository metadata
  const { data: repoData } = await octokit.rest.repos.get({ owner, repo });

  // Fetch languages
  const { data: languages } = await octokit.rest.repos.listLanguages({
    owner,
    repo,
  });

  // Fetch topics
  const { data: topics } = await octokit.rest.repos.getAllTopics({
    owner,
    repo,
  });

  return {
    name: repoData.name,
    full_name: repoData.full_name,
    description: repoData.description,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    license: repoData.license?.name || "Not specified",
    topics: topics.names,
    languages: Object.keys(languages),
    url: repoUrl,
  };
}
