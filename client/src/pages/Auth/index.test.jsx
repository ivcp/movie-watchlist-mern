import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '.';
import { QueryClientProvider, QueryClient } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

describe('Auth component', () => {
  const setup = () => {
    const queryClient = new QueryClient();
    render(
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_PUBLIC_GOOGLE_API_TOKEN}
        >
          <QueryClientProvider client={queryClient}>
            <AuthForm />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    );
  };

  it('renders login form initially', async () => {
    setup();
    screen.getByRole('heading', /log in/i);
    screen.getByPlaceholderText(/email/i);
    screen.getByPlaceholderText(/password/i);
    expect(
      screen.queryByPlaceholderText(/first name/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/last name/i)).not.toBeInTheDocument();
  });

  it('changes form when clicked to show register', async () => {
    setup();
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
    setup();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    const user = userEvent.setup();
    const showPasswordBtn = screen.getByRole('button', {
      name: /show password/i,
    });
    await user.click(showPasswordBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
