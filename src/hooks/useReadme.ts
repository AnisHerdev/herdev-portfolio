import { useState, useEffect } from 'react';

const readmeCache = new Map<string, string>();

export const useReadme = (repoName: string | undefined) => {
  const [markdown, setMarkdown] = useState<string | null>(
    repoName ? readmeCache.get(repoName) || null : null
  );
  const [loading, setLoading] = useState(!markdown && !!repoName);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!repoName || readmeCache.has(repoName)) {
      if (repoName && readmeCache.has(repoName)) {
        setMarkdown(readmeCache.get(repoName)!);
        setLoading(false);
      }
      return;
    }

    const fetchReadme = async () => {
      const pat = import.meta.env.VITE_GITHUB_PAT;
      const isValidPat = pat && pat !== 'your_pat_here';
      setLoading(true);
      setError(false);

      try {
        const headers: HeadersInit = isValidPat ? { Authorization: `Bearer ${pat}` } : {};
        const response = await fetch(`https://api.github.com/repos/AnisHerdev/${repoName}/readme`, {
          headers
        });

        if (!response.ok) throw new Error('Readme fetch failed');

        const data = await response.json();
        const binaryString = atob(data.content.replace(/\r?\n/g, ''));
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const decodedMarkdown = new TextDecoder().decode(bytes);

        readmeCache.set(repoName, decodedMarkdown);
        setMarkdown(decodedMarkdown);
      } catch (err) {
        console.error(`Error fetching readme for ${repoName}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [repoName]);

  return { markdown, loading, error };
};
