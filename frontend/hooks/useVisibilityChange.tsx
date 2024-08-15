import { useEffect } from "react";
interface UseVisibilityChangeProps {
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const useVisibilityChange=({setUnreadCount}:UseVisibilityChangeProps)=>{
    useEffect(() => {
        const handleVisibilityChange = () => {
          if (!document.hidden) {
            setUnreadCount(0);
          }
        };
        window.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("focus", handleVisibilityChange);
        return () => {
          window.removeEventListener("visibilitychange", handleVisibilityChange);
          window.removeEventListener("focus", handleVisibilityChange);
        };
      }, []);   
}
export default useVisibilityChange;