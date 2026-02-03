import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import HouseIcon from './icons/HouseIcon';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [activeSection, setActiveSection] = React.useState<string>('');

    const navItems = [
        { name: 'Projects', path: '/projects' },
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '#contact' }
    ];

    const isHome = location.pathname === '/';
    const isProjectDetail = location.pathname.startsWith('/projects/');

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (path.startsWith('#')) {
            e.preventDefault();
            const element = document.getElementById(path.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Manually set active section for immediate feedback
                setActiveSection(path.substring(1));
            }
        }
    };

    React.useEffect(() => {
        // Reset active section when path changes
        if (!location.hash) {
            setActiveSection('');
        }
    }, [location.pathname, location.hash]);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    } else {
                        // If scrolling UP and leaving footer, clear active section
                        if (entry.target.id === 'contact') {
                            setActiveSection((prev) => (prev === 'contact' ? '' : prev));
                        }
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the footer is visible
        );

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            observer.observe(contactSection);
        }

        return () => {
            if (contactSection) {
                observer.unobserve(contactSection);
            }
        };
    }, []);

    const isActive = (path: string) => {
        if (path.startsWith('#')) {
            return activeSection === path.substring(1);
        }
        // Strict check for Home to avoid matching everything since '/' checks for start
        if (path === '/') {
            return location.pathname === '/' && !activeSection;
        }
        return location.pathname.startsWith(path) && !activeSection;
    };

    return (
        <nav className={`top-navbar ${isProjectDetail ? 'is-project-detail' : ''}`} style={{
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
                {navItems.map((link) => {
                    const active = isActive(link.path);
                    return (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                onClick={(e) => handleNavClick(e, link.path)}
                                style={{
                                    color: active
                                        ? ((isHome || isProjectDetail) ? '#fff' : 'var(--color-text)')
                                        : ((isHome || isProjectDetail) ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-accent-light)'),
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
                            {active && (
                                <motion.div
                                    layoutId="underline"
                                    style={{
                                        height: '1px',
                                        backgroundColor: (isHome || isProjectDetail) ? '#fff' : 'var(--color-text)',
                                        marginTop: '4px'
                                    }}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
