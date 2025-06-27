import { useCallback } from 'react';
import { useNotifications } from '@/contexts/useNotifications.ts';

export interface RealTimeData {
  habits?: number;
  focus?: number;
}


export const useRealTimeData = () => {
  const { addNotification } = useNotifications();

  const updateData = useCallback((key: string, value: unknown) => {
    // Placeholder for data update
  }, []);

  return {
    data: { habits: 75, focus: 2.5 },
    isConnected: true,
    updateData,
    addNotification
  };
};
