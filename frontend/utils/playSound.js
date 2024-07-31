import notif from "../assets/sounds/notif.mp3";
import notifRecieve from "../assets/sounds/notif-recieve.mp3";
import { useCallback } from "react";

const playSound = (soundEnabled)=>{ 
    useCallback(
    (isSent) => {
      const sound = isSent ? new Audio(notif) : new Audio(notifRecieve);
      sound.play();
    },
    [soundEnabled],
  );
}
export default playSound;