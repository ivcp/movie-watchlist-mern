import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenreFilter from './GenreFilter';

test('calls the setGenre and setPage fns with the right arguments', async () => {
  const mockSetGenre = vi.fn();
  const mockSetPage = vi.fn();

  render(<GenreFilter setGenre={mockSetGenre} setPage={mockSetPage} />);

  const user = userEvent.setup();
  const genre = screen.getByLabelText('Horror');
  await user.click(genre);
  expect(mockSetGenre.mock.calls[0]).toContain('27');
  expect(mockSetPage.mock.calls[0]).toContain(1);
});
