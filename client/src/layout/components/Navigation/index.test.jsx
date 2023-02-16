import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '.';
import { BrowserRouter } from 'react-router-dom';
import useMovieList from '../../../hooks/useMovieList';

vi.mock('../../../hooks/useMovieList');
vi.mock('../../../hooks/useMediaQuery');
const returnValue = {
  user: {
    name: 'test',
  },
  setUser: vi.fn(),
  movieList: [],
  isSuccess: true,
};
describe('Navigation component', () => {
  it.todo('not visible when on mobile', () => {});
  it.todo('visible when on desktop', () => {});
  it('logs out user', async () => {
    useMovieList.mockReturnValue(returnValue);
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    //does not show login btn if user logged in
    expect(screen.queryByRole('button', { name: /log in/i })).not
      .toBeInTheDocument;
    //my movies link shown
    screen.getByRole('link', { name: /my movies/i });
    const user = userEvent.setup();
    //logout btn shown if user logged in
    const logoutBtn = screen.getByRole('button', { name: /log out/i });
    await user.click(logoutBtn);
    //setUser called with correct arg
    expect(returnValue.setUser).toBeCalledWith(null);
  });
});
