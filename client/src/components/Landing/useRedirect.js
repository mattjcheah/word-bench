import { useEffect } from "react";

function useRedirect(location, roomID, setRoomID, setStage) {
  useEffect(() => {
    if (!roomID) {
      const urlRoomID = new URLSearchParams(location.search).get("roomID");
      if (urlRoomID) {
        setRoomID(urlRoomID);
        setStage("joinGame");
      }
    }
  });
}

export default useRedirect;
