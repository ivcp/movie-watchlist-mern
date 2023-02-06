import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from '.';

vi.mock('../../../../hooks/useMediaQuery');

describe('pagination component', () => {
  it('disables prevBtn initially', () => {
    const page = 1;

    render(<Pagination page={page} />);

    const prevBtn = screen.getByRole('button', { name: 'previous page' });
    const nextBtn = screen.getByRole('button', { name: 'next page' });

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
  });

  it('disables nextBtn if no more pages', () => {
    const moviesPage = 500;

    render(<Pagination moviesPage={moviesPage} />);

    const prevBtn = screen.getByRole('button', { name: 'previous page' });
    const nextBtn = screen.getByRole('button', { name: 'next page' });

    expect(nextBtn).toBeDisabled();
    expect(prevBtn).not.toBeDisabled();
  });
});
