import { useEffect } from "react";
import { UseSettingsProps } from "../interface/interface";
function useSettings({ soundEnabled, notificationsEnabled }: UseSettingsProps) {
  useEffect(() => {
    localStorage.setItem("soundEnabled", JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);
}

export default useSettings;
