import { Quote } from "../../config/constants";
import { Player } from "../../models/Room";
import LandingLayout from "../LandingLayout";
import LandingButton from "../LandingButton";
import { RoomTitle, PlayerList } from "./styles";
import { useRouter } from "next/router";

type Props = {
  roomId: string;
  players: Player[];
  startGame: () => void;
  quote: Quote;
};

const Lobby = ({ roomId, players, startGame, quote }: Props) => {
  const router = useRouter();

  return (
    <LandingLayout title="Waiting for more players..." quote={quote}>
      <div>
        <RoomTitle>Room ID: {roomId}</RoomTitle>
        <PlayerList>
          {players.map((player) => {
            return (
              <li key={player.id}>
                <p>{player.name}</p>
              </li>
            );
          })}
        </PlayerList>
        <div>
          <LandingButton onClick={() => router.replace("/")}>
            QUIT
          </LandingButton>
          <LandingButton onClick={() => startGame()}>START</LandingButton>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Lobby;
