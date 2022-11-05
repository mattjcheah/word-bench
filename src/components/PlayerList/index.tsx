import differenceInMilliseconds from "date-fns/differenceInMilliseconds";
import { Player } from "../../models/Room";
import { List, ListItem, Progress } from "./styles";

const COLOURS = ["#ff9e2c", "#4ecdc4", "#ff6b6b", "#5fce64"];

type Props = {
  players: Player[];
  totalNumberOfWords: number;
};

const PlayerList = ({ players, totalNumberOfWords }: Props) => {
  const sortedPlayers = players
    .map((player) => ({
      ...player,
      completion: Math.round(
        (player.completedWords.length / totalNumberOfWords) * 100
      ),
    }))
    .sort((a, b) => {
      const lengthDifference = b.completion - a.completion;
      if (lengthDifference !== 0) {
        return lengthDifference;
      }
      return differenceInMilliseconds(
        new Date(a.modifiedAt),
        new Date(b.modifiedAt)
      );
    });

  return (
    <List>
      {sortedPlayers.map((player, i) => {
        return (
          <ListItem key={player.id}>
            <Progress
              percentage={player.completion}
              colour={COLOURS[i % COLOURS.length]}
            >
              <h3>{player.name}</h3>
            </Progress>
          </ListItem>
        );
      })}
    </List>
  );
};

export default PlayerList;
