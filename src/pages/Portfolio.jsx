import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { processedData as data } from '../utils/data';

const Portfolio = () => {
    const { projects } = data;

    const ongoingProjects = projects.filter(p => p.status === 'Ongoing');
    const completedProjects = projects.filter(p => p.status === 'Completed');

    const ProjectCard = ({ project }) => (
        <motion.div
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            variants={{
                initial: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                hover: { scale: 1.02, transition: { duration: 0.2 } }
            }}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)', // 5% opacity white
                backdropFilter: 'blur(100px)', // 100px blur
                WebkitBackdropFilter: 'blur(100px)', // Safari support
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.2)', // 1px solid white border at 20% opacity
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)', // Subtle drop shadow
                cursor: 'pointer'
            }}
        >
            <Link to={`/projects/${project.id}`}>
                {/* Rectangular Tile: More vertical aspect ratio (3:4) */}
                <div style={{ aspectRatio: '3/4', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                    {project.image ? (
                        <>
                            <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {/* Hover Tooltip */}
                            <motion.div
                                variants={{
                                    initial: { opacity: 0, y: 10 },
                                    hover: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    left: '50%',
                                    translateX: '-50%', // Use style prop for non-animating properties or it overrides transform
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    whiteSpace: 'nowrap',
                                    pointerEvents: 'none'
                                }}
                            >
                                Click for more details
                            </motion.div>
                        </>
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#7A7E81',
                            backgroundColor: 'rgba(240,240,240,0.5)',
                            position: 'relative' // Ensure relative positioning for absolute child
                        }}>
                            {project.name}
                            <motion.div
                                variants={{
                                    initial: { opacity: 0, y: 10 },
                                    hover: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    pointerEvents: 'none',
                                    maxWidth: '90%',
                                    textAlign: 'center'
                                }}
                            >
                                Click for more details
                            </motion.div>
                        </div>
                    )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>{project.name}</h3>
                    <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 500 }}>{project.location}</p>
                </div>
            </Link>
        </motion.div>
    );

    return (
        <section className="section" style={{
            minHeight: '100vh',
            paddingTop: '8rem',
            // Adding a sophisticated gradient background to make the glassmorphism pop
            background: 'linear-gradient(to bottom, #f5f7fa 0%, #E8EBF0 50%, #F2F1EF 100%)'
        }}>
            <div className="container">
                <h2 style={{ marginBottom: '3rem', textAlign: 'center', color: '#333' }}>Our Projects</h2>

                {ongoingProjects.length > 0 && (
                    <div style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem', borderLeft: '4px solid var(--color-accent)', paddingLeft: '1rem', color: '#333' }}>Ongoing Projects</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {ongoingProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                )}

                {completedProjects.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem', borderLeft: '4px solid var(--color-accent)', paddingLeft: '1rem', color: '#333' }}>Completed Projects</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {completedProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;
