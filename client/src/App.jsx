import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserContextProvider } from './context/user-context';
import { ModalContextProvider } from './context/modal-context';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          <RouterProvider router={router} />
          <ToastContainer
            autoClose={2500}
            hideProgressBar
            theme="dark"
            position="top-center"
          />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </ModalContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
