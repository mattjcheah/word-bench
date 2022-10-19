import { quotes } from "../config/constants";

const getQuote = () => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
};

export default getQuote;
