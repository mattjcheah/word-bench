import styled, { keyframes } from "styled-components";

export const LandingContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LandingTitle = styled.h1`
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

export const ContentContainer = styled.div`
  border-top: 1px solid var(--oxblood);
  border-bottom: 1px solid var(--oxblood);
  padding: 2rem;

  width: 50vw;
  max-width: 600px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QuoteContainer = styled.div`
  margin: 1.5rem;
`;

export const QuoteText = styled.p`
  animation: ${fadeInUp} 0.5s ease-in-out;
`;
