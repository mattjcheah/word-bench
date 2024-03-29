import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  width: 50%;
  margin: 0.25rem auto;
  flex-direction: row;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  & > * {
    font-size: 1.25rem;
    font-weight: 900;
  }
`;

export const Input = styled.input`
  font-weight: 900;

  flex: 1;
  padding: 0.6em;
  border: 0;
  border-bottom: 0.25rem solid transparent;

  &:focus {
    outline: none;
    border-bottom: 0.25rem solid var(--darktan);
  }
`;

export const Button = styled.button`
  padding: 0.6em 0.8em;
  background-color: var(--darktan);
  color: #fff;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
