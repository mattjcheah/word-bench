import { quotes } from "./Constants";

const getQuote = () => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
};

export default getQuote;
