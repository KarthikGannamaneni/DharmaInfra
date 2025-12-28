import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import data from '../data.json';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = data.projects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="section container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2>Project Not Found</h2>
                <Link to="/portfolio" style={{ marginTop: '1rem', color: 'var(--color-accent)', textDecoration: 'underline' }}>Back to Portfolio</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: '4rem' }}>
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
                    &larr; Back to Portfolio
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
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
            </div>
        </div>
    );
};

export default ProjectDetail;
