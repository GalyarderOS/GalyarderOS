import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useChronoLogic } from './useChronoLogic';
import type { TimeBlock } from '../types/timeblock';

const existingBlock: TimeBlock = {
  id: '1',
  label: 'Existing Block',
  start: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
  end: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
  completed: false,
};

// Kunci yang digunakan di localChrono.ts
const LOCAL_STORAGE_KEY = 'chrono_timeblocks';

describe('useChronoLogic Hook', () => {

  beforeEach(() => {
    localStorage.clear();
    // Menyiapkan localStorage dengan data awal
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([existingBlock]));
  });

  it('should prevent adding a new time block if there is a time conflict', async () => {
    const { result } = renderHook(() => useChronoLogic());

    // Tunggu hingga blok awal dimuat dari localStorage oleh useEffect
    await waitFor(() => {
      expect(result.current.todaysBlocks.length).toBe(1);
    });

    const conflictingBlock = {
      label: 'Conflicting Block',
      start: new Date(new Date().setHours(9, 30, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
    };

    act(() => {
      result.current.addTimeBlock(conflictingBlock);
    });

    // Asserasi: Jumlah blok tidak bertambah
    expect(result.current.todaysBlocks.length).toBe(1);
  });

  it('should successfully add a new time block if there is no time conflict', async () => {
    const { result } = renderHook(() => useChronoLogic());

    await waitFor(() => {
        expect(result.current.todaysBlocks.length).toBe(1);
    });

    const nonConflictingBlock = {
      label: 'New Valid Block',
      start: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
    };

    act(() => {
      result.current.addTimeBlock(nonConflictingBlock);
    });

    // Asserasi: Jumlah blok bertambah
    expect(result.current.todaysBlocks.length).toBe(2);
    expect(result.current.todaysBlocks[1].label).toBe('New Valid Block');
  });
}); 