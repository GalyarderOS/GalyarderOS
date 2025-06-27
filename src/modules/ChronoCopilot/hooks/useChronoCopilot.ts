import { useState } from 'react';
import { useTimeBlocks } from './useTimeBlocks';
import { useJournalEntries } from './useJournalEntries';
import { useHabitReminders } from './useHabitReminders';

export const useChronoCopilot = () => {
  const { timeBlocks, addTimeBlock, updateTimeBlock, deleteTimeBlock } = useTimeBlocks();
  const { journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useJournalEntries();
  const { habitReminders, addHabitReminder, updateHabitReminder, deleteHabitReminder } = useHabitReminders();

  // State for UI elements, e.g., currently selected module view
  const [activeModule, setActiveModule] = useState('timeBlocks'); // 'timeBlocks', 'journal', 'habits'

  // TODO: implement integration of time blocks, journal, and habits

  return {
    timeBlocks,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
    journalEntries,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    habitReminders,
    addHabitReminder,
    updateHabitReminder,
    deleteHabitReminder,
    activeModule,
    setActiveModule,
  };
};
 