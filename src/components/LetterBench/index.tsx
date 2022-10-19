import { Container, LetterTile } from "./styles";

type Props = {
  letters: string[];
};

const LetterBench = ({ letters }: Props) => {
  return (
    <Container>
      {letters.map((letter, ind) => {
        return (
          <LetterTile key={letter + ind}>{letter.toUpperCase()}</LetterTile>
        );
      })}
    </Container>
  );
};

export default LetterBench;
