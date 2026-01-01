import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import HouseIcon from './icons/HouseIcon';

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { name: 'About Us', path: '/leadership' },
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/portfolio' }
  ];

  const isHome = location.pathname === '/';

  return (
    <nav style={{
      position: 'absolute',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      width: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      // Liquid Glass Pill Styles
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      padding: '0.75rem 2rem',
      borderRadius: '50px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.5)'
    }}>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {navItems.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              style={{
                color: location.pathname === link.path
                  ? (isHome ? '#fff' : 'var(--color-text)')
                  : (isHome ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-accent-light)'),
                transition: 'color 0.3s ease',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {link.name === 'Home' ? (
                <HouseIcon size={24} />
              ) : (
                link.name
              )}
            </Link>
            {location.pathname === link.path && (
              <motion.div
                layoutId="underline"
                style={{
                  height: '1px',
                  backgroundColor: isHome ? '#fff' : 'var(--color-text)',
                  marginTop: '4px'
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
