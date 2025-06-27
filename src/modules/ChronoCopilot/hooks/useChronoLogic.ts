import { useState, useEffect } from 'react'
import { TimeBlock } from '../types/timeblock'
import { getTimeBlocks, saveTimeBlocks } from '../api/localChrono'
import { sampleTimeBlocks } from '../api/sampleData'
import { isToday } from 'date-fns'

export function useChronoLogic() {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([])
  const [todaysBlocks, setTodaysBlocks] = useState<TimeBlock[]>([])
  const [remindedBlocks, setRemindedBlocks] = useState<Set<string>>(new Set());

  useEffect(() => {
    let blocks = getTimeBlocks()
    if (blocks.length === 0) {
      blocks = sampleTimeBlocks
      saveTimeBlocks(blocks)
    }
    setTimeBlocks(blocks)
  }, [])

  useEffect(() => {
    const filteredBlocks = timeBlocks.filter(block => isToday(new Date(block.start)))
    setTodaysBlocks(filteredBlocks)
  }, [timeBlocks])

  useEffect(() => {
    const REMINDER_LEAD_TIME_MINUTES = 5; // Notifikasi 5 menit sebelum mulai
    const CHECK_INTERVAL_MS = 60 * 1000; // Cek setiap 1 menit

    const intervalId = setInterval(() => {
      const now = new Date();
      
      timeBlocks.forEach(block => {
        // Check if block is completed using either property
        const isBlockCompleted = block.completed || block.isCompleted;
        // Hanya cek blok yang belum selesai dan belum dikirim reminder
        if (!isBlockCompleted && !remindedBlocks.has(block.id)) {
          const startTime = new Date(block.start);
          const timeDifferenceMs = startTime.getTime() - now.getTime();
          const timeDifferenceMinutes = Math.floor(timeDifferenceMs / 1000 / 60);

          if (timeDifferenceMinutes >= 0 && timeDifferenceMinutes <= REMINDER_LEAD_TIME_MINUTES) {
            // Untuk sekarang, kita gunakan alert. Nanti bisa diganti Web Notifications API.
            console.log(`Reminder: "${block.label}" akan dimulai dalam ${timeDifferenceMinutes} menit!`);
            
            // Tandai bahwa reminder untuk blok ini sudah terkirim
            setRemindedBlocks(prev => new Set(prev).add(block.id));
          }
        }
      });
    }, CHECK_INTERVAL_MS);

    // Cleanup function yang krusial
    return () => {
      clearInterval(intervalId);
    };
  }, [timeBlocks, remindedBlocks]);

  const isTimeConflict = (newBlock: Omit<TimeBlock, 'id' | 'completed'>): boolean => {
    for (const existingBlock of timeBlocks) {
      const newStartTime = new Date(newBlock.start).getTime();
      const newEndTime = new Date(newBlock.end).getTime();
      const existingStartTime = new Date(existingBlock.start).getTime();
      const existingEndTime = new Date(existingBlock.end).getTime();

      // Check for overlap
      if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
        // alert() ini hanya untuk development, nanti kita ganti dengan notifikasi yang lebih baik
        console.error(`Konflik terdeteksi dengan: "${existingBlock.label}"`);
        return true; // Konflik ditemukan
      }
    }
    return false; // Tidak ada konflik
  };

  const addTimeBlock = (newBlock: Omit<TimeBlock, 'id' | 'completed'>) => {
    if (isTimeConflict(newBlock)) {
      console.error("Gagal menambahkan blok: Terjadi konflik waktu.");
      return; // Hentikan eksekusi jika ada konflik
    }

    const blockWithId: TimeBlock = {
      ...newBlock,
      id: Date.now().toString(),
      completed: false,
      isCompleted: newBlock.isCompleted || false,
    }
    const updatedBlocks = [...timeBlocks, blockWithId]
    setTimeBlocks(updatedBlocks)
    saveTimeBlocks(updatedBlocks)
  }

  return { timeBlocks, todaysBlocks, addTimeBlock }
} 