import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HouseIcon from './icons/HouseIcon';

const FloatingNavbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const location = useLocation();

    const navItems = [
        { name: 'Projects', path: '/projects' },
        { name: 'Home', path: '/' },
        { name: 'Contact Us', path: '#contact' }
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (path.startsWith('#')) {
            e.preventDefault();
            const element = document.getElementById(path.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(path.substring(1));
            }
        }
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    useEffect(() => {
        // Reset active section when path changes
        if (!location.hash) {
            setActiveSection('');
        }
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    } else {
                        if (entry.target.id === 'contact') {
                            setActiveSection((prev) => (prev === 'contact' ? '' : prev));
                        }
                    }
                });
            },
            { threshold: 0.5 }
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
        if (path === '/') {
            return location.pathname === '/' && !activeSection;
        }
        return location.pathname.startsWith(path) && !activeSection;
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    pointerEvents: 'none', // Allow clicking through around the nav
                    zIndex: 100
                }}>
                    <motion.nav
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            padding: '0.75rem 2rem',
                            borderRadius: '50px',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                            pointerEvents: 'auto', // Re-enable clicks
                            border: '1px solid rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
                            {navItems.map((link) => {
                                const active = isActive(link.path);
                                return (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            onClick={(e) => handleNavClick(e, link.path)}
                                            style={{
                                                color: active ? 'var(--color-text)' : 'var(--color-accent-light)',
                                                transition: 'color 0.3s ease',
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {link.name === 'Home' ? (
                                                <HouseIcon size={24} />
                                            ) : (
                                                link.name
                                            )}
                                            {active && (
                                                <motion.div
                                                    layoutId="floating-underline"
                                                    style={{
                                                        height: '2px',
                                                        width: '100%',
                                                        backgroundColor: 'var(--color-text)',
                                                        marginTop: '2px',
                                                        borderRadius: '2px'
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.nav>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FloatingNavbar;
