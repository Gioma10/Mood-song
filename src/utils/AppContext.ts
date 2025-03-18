import { createContext, Dispatch, SetStateAction  } from "react";

// Definisci il tipo per il context
interface AppContextType {
  isStarted: boolean;
  setIsStarted: Dispatch<SetStateAction<boolean>>;
}

// Crea il Context
const AppContext = createContext<AppContextType>({
  isStarted: false,
  setIsStarted: () => {}
});

export default AppContext;