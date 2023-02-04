import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenreFilter from '.';

vi.mock('../../../../hooks/useMediaQuery');

describe('genreFilter component', () => {
  it('checks "all" category by default', () => {
    render(<GenreFilter />);
    const allRadioBtn = screen.getByLabelText('All');
    expect(allRadioBtn).toBeChecked();
  });

  it('calls the setGenre and setPage fns with the right arguments', async () => {
    const mockSetGenre = vi.fn();
    const mockSetPage = vi.fn();

    render(<GenreFilter setGenre={mockSetGenre} setPage={mockSetPage} />);

    const user = userEvent.setup();
    const genre = screen.getByLabelText('Horror');
    await user.click(genre);
    expect(mockSetGenre).toHaveBeenCalledWith('27');
    expect(mockSetPage).toHaveBeenCalledWith(1);
    expect(genre).toBeChecked();
  });
});
