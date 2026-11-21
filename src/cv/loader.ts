import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Loader } from "astro/loaders";
import { parse } from "yaml";

/**
 * Loads `cv.yaml` from the longkimhoang/cv repository, the single source of
 * truth for CV content (it is also what renders the PDF).
 *
 * Where the YAML comes from, in order:
 * 1. `CV_YAML_PATH`: a local file, e.g. `../cv/cv.yaml` while editing the CV
 *    and the site side by side.
 * 2. The GitHub contents API at `CV_REF` (default `main`). The cv repository
 *    is private, so this needs `CV_GITHUB_TOKEN`: a fine-grained token with
 *    read-only "Contents" access to longkimhoang/cv.
 *
 * The build fails loudly if neither works, rather than publishing stale data.
 */
const REPO = "longkimhoang/cv";
const FILE = "cv.yaml";

async function readCvYaml(): Promise<{ source: string; text: string }> {
  // Pick up a local .env for `pnpm dev`; Vercel sets real env vars instead.
  try {
    process.loadEnvFile();
  } catch {
    // No .env file: fine.
  }

  const localPath = process.env.CV_YAML_PATH;
  if (localPath) {
    const path = resolve(localPath);
    return { source: path, text: await readFile(path, "utf8") };
  }

  const ref = process.env.CV_REF || "main";
  const token = process.env.CV_GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      `Cannot load ${FILE}: set CV_GITHUB_TOKEN (read access to ${REPO}) ` +
        `or CV_YAML_PATH (a local copy).`,
    );
  }

  const url = `https://api.github.com/repos/${REPO}/contents/${FILE}?ref=${encodeURIComponent(ref)}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.raw+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) {
    throw new Error(`Fetching ${REPO}/${FILE}@${ref} failed: ${res.status} ${res.statusText}`);
  }
  return { source: `${REPO}/${FILE}@${ref}`, text: await res.text() };
}

export function cvLoader(): Loader {
  return {
    name: "cv-yaml",
    load: async ({ store, parseData, generateDigest, logger }) => {
      const { source, text } = await readCvYaml();
      logger.info(`Loaded CV from ${source}`);

      const data = await parseData({ id: "cv", data: parse(text) });
      store.clear();
      store.set({ id: "cv", data, digest: generateDigest(text) });
    },
  };
}
