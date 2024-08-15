import {useEffect} from 'react';

interface UseLoadSettingProps {
  
}

const useLoadSetting=(setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  setNotificationsEnabled: React.Dispatch<React.SetStateAction<boolean>>)=>{
    useEffect(() => {
        const savedSoundEnabled = localStorage.getItem("soundEnabled");
        const savedNotificationsEnabled = localStorage.getItem(
          "notificationsEnabled",
        );
    
        if (savedSoundEnabled !== null) {
          setSoundEnabled(JSON.parse(savedSoundEnabled));
        }
        if (savedNotificationsEnabled !== null) {
          setNotificationsEnabled(JSON.parse(savedNotificationsEnabled));
        }
      }, []);
}
export default useLoadSetting;