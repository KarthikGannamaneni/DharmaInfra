import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Leadership', path: '/leadership' },
  ];

  return (
    <nav style={{
      padding: '2rem 1rem',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      zIndex: 10
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', justifySelf: 'start' }}>
        <img
          src="/images/logo-full.png"
          alt="Dharma Infra"
          style={{ height: '40px', objectFit: 'contain', mixBlendMode: 'multiply' }}
        />
      </Link>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', justifySelf: 'center' }}>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              style={{
                color: location.pathname === link.path ? 'var(--color-text)' : 'var(--color-accent-light)',
                transition: 'color 0.3s ease',
                fontWeight: 500
              }}
            >
              {link.name}
            </Link>
            {location.pathname === link.path && (
              <motion.div
                layoutId="underline"
                style={{
                  height: '1px',
                  backgroundColor: 'var(--color-text)',
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
