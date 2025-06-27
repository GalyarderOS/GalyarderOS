// Local storage for journal entries
import { JournalEntry } from '../types/journal';

const JOURNAL_STORAGE_KEY = 'chrono_journal_entries';

export const getJournalEntries = (): JournalEntry[] => {
  try {
    const storedEntries = localStorage.getItem(JOURNAL_STORAGE_KEY);
    return storedEntries ? JSON.parse(storedEntries) : [];
  } catch (error) {
    console.error("Failed to parse journal entries from localStorage", error);
    return [];
  }
};

export const saveJournalEntries = (entries: JournalEntry[]): void => {
  try {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Failed to save journal entries to localStorage", error);
  }
};
 