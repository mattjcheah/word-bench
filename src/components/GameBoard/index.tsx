import { useRef, useState } from "react";
import Popup from "reactjs-popup";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Board from "../Board";
import LetterBench from "../LetterBench";
import PlayerInput from "../PlayerInput";
import PlayerList from "../PlayerList";
import ShuffleButton from "../ShuffleButton";
import GameLayout from "../GameLayout";
import LandingButton from "../LandingButton";
import GiveUpSection from "../GiveUpSection";
import { FormattedRoom, Player } from "../../models/Room";
import {
  PopupContainer,
  BoardContainer,
  SidebarContainer,
  SidebarTitle,
  InputContainer,
  LetterContainer,
  LandingButtonContainer,
} from "./styles";

type Props = {
  currentPlayer: Player;
  room: FormattedRoom;
  completeWord: (word: string) => void;
  shuffleLetters: () => void;
  replayGame: (name: string) => void;
  giveUp: () => void;
};

const GameBoard = ({
  currentPlayer,
  room: { stage, players, board },
  completeWord,
  shuffleLetters,
  replayGame,
  giveUp,
}: Props) => {
  const isComplete = stage === "COMPLETE";
  const [open, setOpen] = useState(true);

  const isWinner = currentPlayer.completedWords.length === board.words.length;

  const { width, height } = useWindowSize();

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitWord = (word: string): boolean => {
    const lowerCaseWord = word.toLowerCase();
    if (
      board.words.find((w) => w.word === lowerCaseWord) &&
      !currentPlayer.completedWords.includes(lowerCaseWord)
    ) {
      completeWord(lowerCaseWord);
      return true;
    }
    return false;
  };

  return (
    <>
      {isComplete && isWinner && open && (
        <Confetti width={width} height={height} />
      )}
      {isComplete && (
        <Popup open={open} onClose={() => setOpen(false)} closeOnDocumentClick>
          <PopupContainer>{isWinner ? "You Win!" : "You Lose!"}</PopupContainer>
        </Popup>
      )}
      <GameLayout
        main={
          <BoardContainer>
            <Board
              board={board}
              completedWords={currentPlayer.completedWords}
              isComplete={isComplete}
            />
          </BoardContainer>
        }
        sidebar={
          <SidebarContainer>
            {isComplete || <GiveUpSection giveUp={giveUp} />}
            <SidebarTitle>PLAYERS</SidebarTitle>
            <PlayerList
              players={players}
              totalNumberOfWords={board.words.length}
            />
          </SidebarContainer>
        }
        bottom={
          isComplete ? (
            <LandingButtonContainer>
              <LandingButton onClick={() => replayGame(currentPlayer.name)}>
                REPLAY
              </LandingButton>
            </LandingButtonContainer>
          ) : (
            <InputContainer>
              <LetterContainer>
                <LetterBench letters={board.letters} />
                <ShuffleButton
                  onClick={() => {
                    shuffleLetters();
                    inputRef.current?.focus();
                  }}
                />
              </LetterContainer>
              <PlayerInput ref={inputRef} onSubmit={onSubmitWord} />
            </InputContainer>
          )
        }
      />
    </>
  );
};

export default GameBoard;
