import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTimeBlockDialog } from './CreateTimeBlockDialog';

const mockTimeBlock = {
    label: 'Valid Label',
    start: '2025-06-18T14:00:00', // Jam 14:00
    end: '2025-06-18T15:00:00',   // Jam 15:00
};

describe('CreateTimeBlockDialog', () => {
  const onAddBlockMock = vi.fn();

  beforeEach(() => {
    // Reset mock sebelum setiap tes
    onAddBlockMock.mockClear();
  });

  it('should show validation errors for empty fields on submit', async () => {
    const user = userEvent.setup();
    render(<CreateTimeBlockDialog onAddBlock={onAddBlockMock} />);

    // 1. Buka dialog
    await user.click(screen.getByRole('button', { name: /add block/i }));
    
    // 2. Klik tombol simpan tanpa mengisi apa-apa
    await user.click(screen.getByRole('button', { name: /save block/i }));

    // 3. Asserasi: Pesan error muncul
    expect(await screen.findByText('Label tidak boleh kosong.')).toBeInTheDocument();
    
    // 4. Asserasi: Fungsi onAddBlock TIDAK dipanggil
    expect(onAddBlockMock).not.toHaveBeenCalled();
  });

  it('should show validation error if end time is before start time', async () => {
    const user = userEvent.setup();
    render(<CreateTimeBlockDialog onAddBlock={onAddBlockMock} />);

    // Buka dialog
    await user.click(screen.getByRole('button', { name: /add block/i }));

    // Isi form dengan waktu yang tidak valid
    await user.type(screen.getByLabelText(/label/i), 'Invalid Time Test');
    await user.type(screen.getByLabelText(/start time/i), '2025-06-18T15:00');
    await user.type(screen.getByLabelText(/end time/i), '2025-06-18T14:00'); // End < Start

    // Klik simpan
    await user.click(screen.getByRole('button', { name: /save block/i }));

    // Asserasi: Pesan error spesifik muncul
    expect(await screen.findByText('Waktu selesai harus setelah waktu mulai.')).toBeInTheDocument();
    expect(onAddBlockMock).not.toHaveBeenCalled();
  });

  it('should call onAddBlock with correct data on valid submission', async () => {
    const user = userEvent.setup();
    render(<CreateTimeBlockDialog onAddBlock={onAddBlockMock} />);

    // Buka dialog
    await user.click(screen.getByRole('button', { name: /add block/i }));

    // Isi form dengan data yang valid
    await user.type(screen.getByLabelText(/label/i), mockTimeBlock.label);
    await user.type(screen.getByLabelText(/start time/i), mockTimeBlock.start);
    await user.type(screen.getByLabelText(/end time/i), mockTimeBlock.end);

    // Klik tombol simpan
    await user.click(screen.getByRole('button', { name: /save block/i }));
    
    // Asserasi: Fungsi onAddBlock DIPANGGIL dengan data yang benar
    expect(onAddBlockMock).toHaveBeenCalledWith({
      label: mockTimeBlock.label,
      start: new Date(mockTimeBlock.start).toISOString(),
      end: new Date(mockTimeBlock.end).toISOString(),
      category: 'General',
      isCompleted: false,
    });

    // Asserasi: Dialog tertutup setelah submit berhasil
    await waitFor(() => {
      expect(screen.queryByText('Create New Time Block')).not.toBeInTheDocument();
    });
  });
}); 