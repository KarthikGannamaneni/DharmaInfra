import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { processedData as data } from '../utils/data';
import { getAssetPath } from '../utils/paths';

const Home = () => {
    const { company } = data;
    const heroImage = data.projects.find(p => p.id === 'jewel-crest')?.image || getAssetPath('/images/jewel-crest.png');

    return (
        <>
            {/* Hero Section */}
            <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0
                    }}
                >
                    <source src={getAssetPath("/videos/hero.mp4")} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.3)', // Overlay
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ textAlign: 'center', color: '#fff', padding: '0 1rem' }}
                    >
                        <h1 style={{
                            fontSize: '3.5rem',
                            fontWeight: 300,
                            marginBottom: '1rem',
                            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                        }}>
                            {company.tagline}
                        </h1>
                        <Link to="/portfolio">
                            <button style={{
                                padding: '1rem 2rem',
                                fontSize: '1rem',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: '#2D2D2D',
                                border: 'none',
                                borderRadius: '4px',
                                marginTop: '1rem',
                                transition: 'background 0.3s'
                            }}>
                                View Projects
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ marginBottom: '2rem', color: 'var(--color-accent)', fontSize: '3rem' }}>{company.philosophy}</h2>
                        <p style={{
                            fontSize: '1.25rem',
                            lineHeight: 1.8,
                            color: 'var(--color-text)',
                            marginBottom: '2rem'
                        }}>
                            At {company.name}, we believe that every structure is more than just bricks and mortar—it's a canvas for life's most cherished moments. Founded in {company.founded}, we are dedicated to creating spaces that blend modern luxury with the timeless principles of Vastu, ensuring light, ventilation, and harmony in every home.
                        </p>
                        <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-accent)', margin: '0 auto' }}></div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Home;
