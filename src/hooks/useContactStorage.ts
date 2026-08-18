import { useContext, useEffect } from "react";
import { emptyContact } from "@/lib/vcard";
import { GlobalContext } from "@/context/GlobalContext";

// const STORAGE_KEY = "tapcard.contact.v1";
const STORAGE_KEY = "tapcard.contact.v2";

export function useContactStorage() {
  const { hydrated, contact, setContact } = useContext(GlobalContext);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setContact({ ...emptyContact, ...JSON.parse(raw) });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contact));
    } catch {
      /* ignore */
    }
  }, [contact, hydrated]);

  return { contact, setContact, hydrated };
}
