import { ContactData, emptyContact } from "@/lib/vcard";
import { createContext, ReactNode, useEffect, useState } from "react";

type GlobalContextType = {
  hydrated: boolean;
  contact: ContactData;
  setContact: (contact?: ContactData) => void;
};

export const GlobalContext = createContext<GlobalContextType>({} as any);

export default function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [contact, setContact] = useState<ContactData>(emptyContact);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  
  return (
    <GlobalContext.Provider
      value={{
        contact,
        hydrated,
        setContact: (contact) => {
          setContact(contact || emptyContact);
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
