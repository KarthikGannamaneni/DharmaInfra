import React from 'react';
import HouseIcon from './icons/HouseIcon';

const Footer: React.FC = () => {

    return (
        <footer id="contact" style={{
            padding: '4rem 1rem',
            backgroundColor: '#F2F1EF', // Slightly darker than bg
            textAlign: 'left'
        }}>
            <div className={`container footer-content`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', flexWrap: 'wrap', gap: '0' }}>
                {/* Left Side: Logo & Tagline */}
                <div className="footer-left" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <HouseIcon size={60} strokeWidth={2.5} style={{ color: '#4A4E51' }} />
                            <span style={{
                                fontFamily: "'Cinzel', serif",
                                fontSize: '2.5rem',
                                color: '#4A4E51',
                                letterSpacing: '0.05em',
                                lineHeight: 1,
                                textTransform: 'uppercase',
                                textAlign: 'center'
                            }}>
                                Dharma Infra
                            </span>
                        </div>
                        <p style={{ color: 'var(--color-accent)', margin: 0, textAlign: 'center' }}>Every home has a story. Let’s build yours.</p>
                    </div>
                </div>

                {/* Vertical Separator */}
                <div className="footer-separator" style={{ width: '1px', backgroundColor: 'rgba(74, 78, 81, 0.2)', margin: '0 2rem' }} />

                {/* Right Side: Contact Info */}
                <div className="footer-right" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: '#4A4E51',
                    fontSize: '0.9rem'
                }}>
                    <h3 className="footer-header" style={{
                        marginTop: 0,
                        marginBottom: '0.5rem',
                        fontFamily: "'Cinzel', serif",
                        color: '#4A4E51',
                        fontSize: '1.2rem',
                        borderBottom: '1px solid rgba(74, 78, 81, 0.2)',
                        paddingBottom: '0.5rem',
                        width: 'fit-content',
                        textAlign: 'right'
                    }}>
                        Contact Info
                    </h3>
                    <p><strong>Contact No:</strong> +91 7799654545</p>
                    <p><strong>Email:</strong> dharmainfra1999@gmail.com</p>
                    <div className="footer-address" style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                        <strong>Address:</strong>
                        <div style={{ textAlign: 'right' }}>
                            Plot No: 82, 83 Balakrishna Nagar,<br />
                            Kukatpally, Hyderabad,<br />
                            Telangana 500072
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '4rem' }} className="mobile-only-spacer" />
        </footer>
    );
};

export default Footer;
