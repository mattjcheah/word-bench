import React from "react";
import styled, { keyframes } from "styled-components";

import getQuote from "./getQuote";

const LandingContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingTitle = styled.h1`
  font-size: 2rem;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 0.5rem, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const ContentContainer = styled.div`
  border-top: 1px solid var(--oxblood);
  border-bottom: 1px solid var(--oxblood);
  padding: 2rem;

  width: 50vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuoteContainer = styled.div`
  margin: 1.5rem;
`;

const QuoteText = styled.p`
  animation: ${fadeInUp} 0.5s ease-in-out;
`;

const LandingLayout = ({ title, children }) => {
  const quoteObject = getQuote();

  return (
    <LandingContainer>
      <LandingTitle>{title}</LandingTitle>
      <ContentContainer>{children}</ContentContainer>

      <QuoteContainer>
        <QuoteText>{quoteObject.quote}</QuoteText>
        <QuoteText>
          <strong>{quoteObject.author}</strong>
        </QuoteText>
      </QuoteContainer>
    </LandingContainer>
  );
};

export default LandingLayout;
