import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {/* TODO:add check if !isDesktop */}
      {location.pathname.includes('/movie/') ? null : (
        <header>
          <div>Watchlist</div>
          <Navigation />
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
