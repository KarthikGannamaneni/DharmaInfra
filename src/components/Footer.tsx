import React from 'react';
import HouseIcon from './icons/HouseIcon';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            padding: '4rem 1rem',
            backgroundColor: '#F2F1EF', // Slightly darker than bg
            textAlign: 'center'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <HouseIcon size={60} strokeWidth={2.5} style={{ color: '#4A4E51' }} />
                        <span style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: '2.5rem',
                            color: '#4A4E51',
                            letterSpacing: '0.05em',
                            lineHeight: 1,
                            textTransform: 'uppercase'
                        }}>
                            Dharma Infra
                        </span>
                    </div>
                </div>
                <p style={{ color: 'var(--color-accent)', marginBottom: '2rem' }}>Every home has a story. Let’s build yours.</p>
            </div>
        </footer>
    );
};

export default Footer;
