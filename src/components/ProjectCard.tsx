import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ui from '../config/ui';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
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
            style={{ height: '100%' }}
            className="glass-card"
        >
            {/* Ambient Shadow Layer */}
            {project.image && (
                <div
                    className="absolute-inset"
                    style={{
                        inset: '20px',
                        backgroundImage: `url('${project.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(30px) saturate(120%)',
                        opacity: 0.35,
                        transform: 'translateY(15px)',
                        zIndex: 0
                    }}
                />
            )}

            {/* Glass Panel */}
            <div className="glass-panel" style={{ position: 'relative', zIndex: 1, height: '100%', borderRadius: '30px', overflow: 'hidden' }}>
                <Link to={`/projects/${project.id}`} style={{ display: 'block', height: '100%' }}>
                    {/* Image Container */}
                    <div className="aspect-3-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                        {project.image ? (
                            <>
                                <img src={project.image} alt={project.name} className="object-cover" />
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
                                    {ui.common.clickDetails}
                                </motion.div>
                            </>
                        ) : (
                            <div className="flex-center" style={{ width: '100%', height: '100%', color: '#7A7E81', backgroundColor: 'rgba(240,240,240,0.5)', flexDirection: 'column' }}>
                                {project.name}
                                <span style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{ui.common.noImage}</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>{project.name}</h3>
                        <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 500 }}>{project.location}</p>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
