import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import data from '../data.json';

const Portfolio = () => {
    const { projects } = data;
    const completedProjects = projects.filter(p => p.status === 'Completed');
    const ongoingProjects = projects.filter(p => p.status === 'Ongoing');

    const ProjectCard = ({ project }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                cursor: 'pointer'
            }}
        >
            <Link to={`/projects/${project.id}`}>
                <div style={{ height: '240px', backgroundColor: '#e0e0e0', position: 'relative' }}>
                    {project.image ? (
                        <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#7A7E81',
                            backgroundColor: '#F0F0F0'
                        }}>
                            {project.name}
                        </div>
                    )}
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        backgroundColor: project.status === 'Completed' ? '#4A4E51' : '#D4AF37',
                        color: '#fff',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {project.status}
                    </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                    <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem' }}>{project.location}</p>
                </div>
            </Link>
        </motion.div>
    );

    return (
        <section className="section">
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>Ongoing Projects</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {ongoingProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>Completed Projects</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {completedProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
