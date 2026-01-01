import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { processedData as data } from '../utils/data';

const ImageCarousel = ({ images }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', overflow: 'hidden', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
            <AnimatePresence mode='wait'>
                <motion.img
                    key={index}
                    src={images[index]}
                    alt={`Gallery Image ${index + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }}
                />
            </AnimatePresence>

            {/* Dots Indicator */}
            <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                {images.map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.5)',
                            transition: 'background-color 0.3s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = data.projects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="section container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2>Project Not Found</h2>
                <Link to="/portfolio" style={{ marginTop: '1rem', color: 'var(--color-accent)', textDecoration: 'underline' }}>Back to Projects</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: '4rem', paddingTop: '8rem' }}>
            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                    height: '60vh',
                    backgroundColor: '#e0e0e0',
                    position: 'relative',
                    marginBottom: '4rem'
                }}
            >
                {project.image ? (
                    <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', color: '#999' }}>
                        No Image Available
                    </div>
                )}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '2rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                }}>
                    <div className="container">
                        <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '0.5rem' }}>{project.name}</h1>
                        <p style={{ color: '#ddd', fontSize: '1.25rem' }}>{project.location}</p>
                    </div>
                </div>
            </motion.div>

            {/* Details Grid */}
            <div className="container">
                <Link to="/portfolio" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--color-accent)', fontWeight: 500 }}>
                    &larr; Back to Projects
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
                    <div>
                        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Project Overview</h3>
                        <p style={{ lineHeight: 1.8, color: 'var(--color-text)', marginBottom: '2rem' }}>
                            {project.description || `${project.name} is a ${project.status.toLowerCase()} residential project by Dharma Infra, located in ${project.location}. Designed by ${project.architect}, it offers premium living spaces with a focus on Vastu compliance and modern amenities.`}
                        </p>
                    </div>

                    <div>
                        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Specifications</h3>
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--color-accent)' }}>Status</span>
                                <span style={{ fontWeight: 500 }}>{project.status}</span>
                            </li>
                            {project.units && (
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>Units</span>
                                    <span style={{ fontWeight: 500 }}>{project.units}</span>
                                </li>
                            )}
                            {project.size && (
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>Plot Size</span>
                                    <span style={{ fontWeight: 500 }}>{project.size}</span>
                                </li>
                            )}
                            {project.architect && (
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>Architect</span>
                                    <span style={{ fontWeight: 500 }}>{project.architect}</span>
                                </li>
                            )}
                            {project.startDate && (
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>Start Date</span>
                                    <span style={{ fontWeight: 500 }}>{project.startDate}</span>
                                </li>
                            )}
                            {project.handover && (
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>Handover</span>
                                    <span style={{ fontWeight: 500 }}>{project.handover}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Location Map */}
                {project.locationMap && (
                    <div style={{ marginBottom: '4rem' }}>
                        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Location</h3>
                        <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f5f5f5', borderRadius: '8px', overflow: 'hidden' }}>
                            <iframe
                                src={project.locationMap}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`${project.name} Location`}
                            ></iframe>
                        </div>
                    </div>
                )}

                {/* Gallery Carousel */}
                {project.gallery && project.gallery.length > 0 && (
                    <div style={{ marginBottom: '4rem' }}>
                        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Gallery</h3>
                        <ImageCarousel images={project.gallery} />
                    </div>
                )}

                {/* Floor Plans */}
                {project.floorPlans && project.floorPlans.length > 0 && (
                    <div>
                        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Floor Plans</h3>
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            {project.floorPlans.map((plan, index) => (
                                <div key={index} style={{ height: '600px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}>
                                    <iframe
                                        src={plan}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 'none' }}
                                        title={`Floor Plan ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
