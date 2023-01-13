import React from 'react';
//import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '../AuthForm';

describe('Auth component', () => {
  it('renders login form initially', async () => {
    render(<AuthForm />);
    screen.getByRole('heading', /log in/i);
    screen.getByPlaceholderText(/email/i);
    screen.getByPlaceholderText(/password/i);
    expect(
      screen.queryByPlaceholderText(/first name/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/last name/i)).not.toBeInTheDocument();
  });

  it('changes form when clicked to show register', async () => {
    render(<AuthForm />);
    screen.getByRole('heading', { name: /log in/i });
    const user = userEvent.setup();
    const changeFormBtn = screen.getByRole('button', {
      name: /don't have an account\? register/i,
    });

    await user.click(changeFormBtn);
    screen.getByPlaceholderText(/first name/i);
    screen.getByPlaceholderText(/last name/i);
    expect(
      screen.queryByRole('heading', { name: /log in/i })
    ).not.toBeInTheDocument();
  });
  it('changes password visibility', async () => {
    render(<AuthForm />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    const user = userEvent.setup();
    const showPasswordBtn = screen.getByRole('button', {
      name: /show password/i,
    });
    await user.click(showPasswordBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it.todo('request called with corret values', async () => {
    //render(<AuthForm />);
    // const user = userEvent.setup();
    // const emailInput = screen.getByPlaceholderText(/email/i);
    // const passwordInput = screen.getByPlaceholderText(/password/i);
    //const submitBtn = screen.getByRole('button', { name: /log in/i });
    // await user.type(emailInput, 'test@email.com');
    // await user.type(passwordInput, '123456');
  });
});
