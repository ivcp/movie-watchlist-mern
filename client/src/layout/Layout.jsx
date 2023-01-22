import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

const Layout = () => {
  return (
    <>
      <header>
        <div>Watchlist</div>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
