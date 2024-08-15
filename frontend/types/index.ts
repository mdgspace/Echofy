export interface SettingsPopupProps {
    onClose: () => void;              
    soundEnabled: boolean;           
    setSoundEnabled: (enabled: boolean) => void;
    notificationsEnabled: boolean;    
    setNotificationsEnabled: (enabled: boolean) => void; 
  }

export interface Project {
    Category: string;
    Name: string;
    ShortDesc: string;
    LongDesc: string;
    ImageLink: string;
    AppStoreLink?: string;
    GithubLink?: string;
    PlayStoreLink?: string;
 }
export interface Message {
    isSent: boolean;
    avatar?: string; 
    username: string;
    text: string;
    timestamp: number;
  }

