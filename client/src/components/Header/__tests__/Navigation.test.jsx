import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../../store/user-context';

describe('Navigation component', () => {
  const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <BrowserRouter>
        <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>
      </BrowserRouter>,
      renderOptions
    );
  };
  it.todo('not visible when on mobile', () => {});
  it.todo('visible when on desktop', () => {});
  it('logs out user', async () => {
    const providerProps = {
      value: { user: 'Test user', setUser: vi.fn() },
    };
    customRender(<Navigation />, { providerProps });
    //does not show login btn if user logged in
    expect(screen.queryByRole('link', { name: /log in/i })).not
      .toBeInTheDocument;
    const user = userEvent.setup();
    //logout btn shown if user logged in
    const logoutBtn = screen.getByRole('button');
    await user.click(logoutBtn);
    //loginBtn visible, and setUser called with correct arg
    expect(screen.queryByRole('link', { name: /log in/i })).toBeInTheDocument;
    expect(providerProps.value.setUser).toBeCalledWith(null);
  });
  it.todo('triggers notification', () => {});
});
