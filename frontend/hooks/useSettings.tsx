import { useEffect } from "react";

const useSettings=(
  soundEnabled: boolean,
  notificationsEnabled: boolean)=>{
    useEffect(() => {
        localStorage.setItem("soundEnabled", JSON.stringify(soundEnabled));
      }, [soundEnabled]);
    
      useEffect(() => {
        localStorage.setItem(
          "notificationsEnabled",
          JSON.stringify(notificationsEnabled),
        );
      }, [soundEnabled,notificationsEnabled]);
}
export default useSettings;