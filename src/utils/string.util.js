export const stringToURL = (str) =>
  str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");

export const youtubeLink = (string) => {
  const youtubeRegex =
    /(?:http:|https:)*?\/\/(?:www\.|)(?:youtube\.com|m\.youtube\.com|youtu\.|youtube-nocookie\.com).*(?:v=|v%3D|v\/|(?:a|p)\/(?:a|u)\/\d.*\/|watch\?|vi(?:=|\/)|\/embed\/|oembed\?|be\/|e\/)([^&?%#\/\n]*)/gm;
  const embedRegex = /(\/|%3D|v=)([0-9A-z-_]{11})([%#?&]|$)/;

  const youtubeMatch = string.match(youtubeRegex);
  if (youtubeMatch?.length) {
    const youtubeSplit = youtubeMatch[0].match(embedRegex);
    return youtubeSplit?.length ? youtubeSplit[2] : undefined;
  }

  return undefined;
};
