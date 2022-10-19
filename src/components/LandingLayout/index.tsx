import { Quote } from "../../config/constants";
import Head from "../Head";
import {
  LandingContainer,
  LandingTitle,
  ContentContainer,
  QuoteContainer,
  QuoteText,
} from "./styles";

type Props = {
  title: string;
  quote: Quote;
  children: JSX.Element;
};

const LandingLayout = ({ title, quote, children }: Props) => {
  return (
    <LandingContainer>
      <Head />
      <LandingTitle>{title}</LandingTitle>
      <ContentContainer>{children}</ContentContainer>
      <QuoteContainer>
        <QuoteText>{quote.quote}</QuoteText>
        <QuoteText>
          <strong>{quote.author}</strong>
        </QuoteText>
      </QuoteContainer>
    </LandingContainer>
  );
};

export default LandingLayout;
