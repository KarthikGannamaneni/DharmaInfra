import { motion } from 'framer-motion';
import data from '../data.json';

const Leadership = () => {
    const { leadership } = data.company;

    return (
        <section className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 style={{ marginBottom: '1rem' }}>About Us</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-accent)' }}>
                        Guided by visionaries dedicated to excellence and innovation.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    {leadership.map((leader, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                width: '100%',
                                height: '400px',
                                backgroundColor: '#eee',
                                marginBottom: '1.5rem',
                                overflow: 'hidden',
                                borderRadius: '8px'
                            }}>
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{leader.name}</h3>
                            <p style={{ color: 'var(--color-accent)', fontWeight: 500, marginBottom: '0.5rem' }}>{leader.role}</p>
                            <p style={{ color: 'var(--color-accent-light)' }}>{leader.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;
