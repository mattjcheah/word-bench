import styled from "styled-components";

export const LandingInputContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 0.5rem;
  }
`;

export const LandingInput = styled.input`
  padding: 0.75rem;
  font-size: calc(14px + 0.3vw);
  border-radius: 4px;
  background: transparent;
  color: var(--blackboard);
  border: 1px solid var(--darktan);

  &:focus {
    outline: none;
    border: 1px solid var(--tan);
  }
`;
