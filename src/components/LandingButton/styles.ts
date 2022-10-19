import styled, { css } from "styled-components";

export const LandingButton = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  margin: 5px;
  font-size: calc(14px + 0.3vw);
  text-decoration: none;
  border-radius: 4px;
  background: transparent;
  color: var(--blackboard);
  border: 1px solid var(--blackboard);

  ${(props) =>
    props.disabled &&
    css`
      background: grey;
      color: darkgrey;
      border: 1px solid grey;
    `}

  ${(props) =>
    !props.disabled &&
    css`
      &:hover {
        color: white;
        background: var(--oxblood);
        border: 1px solid var(--oxblood);
        cursor: pointer;
      }

      &:focus {
        outline: none;
      }
    `}
`;
