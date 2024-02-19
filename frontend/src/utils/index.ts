// We will be using this file to write all utility functions, that can be used across the codebase

// this function will trim all the whitespaces from the string
const trimWhitespace = (str: string) => str.replace(/\s+/g, " ").trim();

export default {
  trimWhitespace,
};
