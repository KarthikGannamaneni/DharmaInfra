const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            padding: '4rem 1rem',
            backgroundColor: '#F2F1EF', // Slightly darker than bg
            marginTop: '4rem',
            textAlign: 'center'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <img
                        src="/images/logo-full.png"
                        alt="Dharma Infra"
                        style={{ height: '50px', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    />
                </div>
                <p style={{ color: 'var(--color-accent)', marginBottom: '2rem' }}>Every home has a story. Let’s build yours.</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-accent-light)' }}>
                    &copy; {currentYear} Dharma Infra. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
