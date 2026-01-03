import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Compass,
    Ruler,
    Layers,
    HardHat,
    Calendar,
    Flag,
    FileText,
    Download,
    MapPin,
    ArrowLeft
} from 'lucide-react';
import { processedData as data } from '../utils/data';
import ui from '../config/ui';

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 2000); // Reduced to 2 seconds as requested
        return () => clearInterval(timer);
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
            <AnimatePresence>
                <motion.img
                    key={index}
                    src={images[index]}
                    alt={`Gallery Image ${index + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
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

// Define Project Themes
const projectThemes: Record<string, { primary: string; secondary: string; glassGradient: string }> = {
    'tara-sitara': {
        primary: '#D4AF37', // Gold
        secondary: '#f9f8f6',
        glassGradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 40%, rgba(255, 255, 255, 0.4) 100%)'
    },
    'rs-residences': {
        primary: '#2c3e50', // Dark Blue
        secondary: '#f0f4f8',
        glassGradient: 'linear-gradient(135deg, rgba(44, 62, 80, 0.2) 0%, rgba(44, 62, 80, 0.1) 40%, rgba(255, 255, 255, 0.4) 100%)'
    },
    'vrindavan-a': {
        primary: '#2E8B57', // Sea Green
        secondary: '#f0f9f4',
        glassGradient: 'linear-gradient(135deg, rgba(46, 139, 87, 0.2) 0%, rgba(46, 139, 87, 0.1) 40%, rgba(255, 255, 255, 0.4) 100%)'
    },
    'vrindavan-b': {
        primary: '#2E8B57', // Sea Green
        secondary: '#f0f9f4',
        glassGradient: 'linear-gradient(135deg, rgba(46, 139, 87, 0.2) 0%, rgba(46, 139, 87, 0.1) 40%, rgba(255, 255, 255, 0.4) 100%)'
    },
    'silver-square': {
        primary: '#718096', // Silver/Gray
        secondary: '#f7fafc',
        glassGradient: 'linear-gradient(135deg, rgba(113, 128, 150, 0.2) 0%, rgba(113, 128, 150, 0.1) 40%, rgba(255, 255, 255, 0.4) 100%)'
    },
    'orchard': {
        primary: '#48BB78', // Orchard Green
        secondary: '#f0fff4',
        glassGradient: 'linear-gradient(135deg, rgba(72, 187, 120, 0.2) 0%, rgba(72, 187, 120, 0.1) 40%, rgba(255, 255, 255, 0.4) 100%)'
    },
    'jewel-crest': {
        primary: '#9F7AEA', // Purple/Royal
        secondary: '#faf5ff',
        glassGradient: 'linear-gradient(135deg, rgba(159, 122, 234, 0.2) 0%, rgba(159, 122, 234, 0.1) 40%, rgba(255, 255, 255, 0.4) 100%)'
    }
};

const defaultTheme = {
    primary: '#4A4E51',
    secondary: '#f8f9fa',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.05) 100%)'
};

interface ProjectDetailParams extends Record<string, string | undefined> {
    id: string;
}

const ProjectDetail: React.FC = () => {
    const { id } = useParams<ProjectDetailParams>();
    const project = data.projects.find(p => p.id === id);
    const theme = (id && projectThemes[id]) || defaultTheme;

    // Base Style (Clean White/Neutral)
    const cardBaseStyle = {
        background: '#fff',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
        cursor: 'default', // Or pointer if actionable
    };

    // Hover Variant (Liquid Glass)
    const cardHoverVariant = {
        background: theme.glassGradient,
        backdropFilter: 'blur(30px) saturate(120%)',
        WebkitBackdropFilter: 'blur(30px) saturate(120%)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeOut" as const }
    };

    if (!project) {
        return (
            <div className="section container" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2>{ui.projectDetail.notFound}</h2>
                <Link to="/portfolio" style={{ marginTop: '1rem', color: 'var(--color-accent)', textDecoration: 'underline' }}>{ui.projectDetail.backLink}</Link>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: theme.secondary, minHeight: '100vh', paddingBottom: '4rem', transition: 'background-color 0.5s ease' }}>

            {/* Back Button (Floating top left) */}
            <Link to="/projects" style={{
                position: 'fixed',
                top: '2rem',
                left: '2rem',
                zIndex: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                padding: '0.75rem',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: theme.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
            }}>
                <ArrowLeft size={24} />
            </Link>

            {/* Hero Section with Carousel */}
            <div style={{ position: 'relative', height: '70vh', marginTop: '0' }}>
                <ImageCarousel images={[project.image, ...(project.gallery || [])].filter(Boolean)} />

                {/* Hero Overlay Gradient */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 70%, rgba(0,0,0,0.6))',
                    pointerEvents: 'none'
                }} />

                {/* Project Title Overlay - Bottom Left, Name Only */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '0',
                    width: '100%',
                    padding: '0 2rem',
                    textAlign: 'left',
                    pointerEvents: 'none'
                }}>
                    <div className="container">
                        <h1 style={{
                            color: '#fff',
                            fontSize: '4rem',
                            marginBottom: '0',
                            fontFamily: 'Cinzel, serif',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}>{project.name}</h1>
                    </div>
                </div>
            </div>

            {/* Specs Bar (Now below Hero) */}
            <motion.div
                initial={{ backgroundColor: '#fff', boxShadow: 'none' }}
                whileHover={{
                    background: theme.glassGradient,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}
                style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', transition: 'background 0.3s ease' }}
            >
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid
                        padding: '2rem 0',
                        gap: '2rem'
                    }}>
                        {[
                            { label: 'Facing', value: project.facing || 'N/A', icon: <Compass size={24} strokeWidth={1.5} /> },
                            { label: ui.common.plotSize, value: project.size, icon: <Ruler size={24} strokeWidth={1.5} /> },
                            { label: 'UDS', value: project.uds || 'N/A', icon: <Layers size={24} strokeWidth={1.5} /> },
                            { label: ui.common.status, value: project.status, icon: <HardHat size={24} strokeWidth={1.5} /> }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                justifyContent: 'center' // Center content in grid cell
                            }}>
                                <div style={{ color: theme.primary }}>{item.icon}</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666', letterSpacing: '0.5px' }}>{item.label}</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#333' }}>{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Main Dashboard Grid */}
            <div className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>

                    {/* Column 1: Technical Details */}
                    <motion.div
                        style={cardBaseStyle}
                        whileHover={cardHoverVariant}
                    >
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.5rem', display: 'inline-block', color: '#333' }}>Technical Details</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {[
                                    { k: ui.common.units, v: project.units },
                                    { k: ui.common.architect, v: project.architect },
                                ].map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                        <td style={{ padding: '1rem 0', color: '#555' }}>{row.k}</td>
                                        <td style={{ padding: '1rem 0', fontWeight: 600, textAlign: 'right', color: '#333' }}>{row.v}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    {/* Column 2: Timeline */}
                    <motion.div
                        style={cardBaseStyle}
                        whileHover={cardHoverVariant}
                    >
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.5rem', display: 'inline-block', color: '#333' }}>Project Timeline</h3>
                        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(0,0,0,0.1)', marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '1rem', paddingTop: '0.5rem' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-3.0rem', top: '0', width: '28px', height: '28px', borderRadius: '50%', background: '#fff', border: `2px solid ${theme.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary, zIndex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                    <Calendar size={14} />
                                </div>
                                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: '#333' }}>Start Date</h4>
                                <p style={{ color: '#666', margin: 0, fontWeight: 500 }}>{project.startDate}</p>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-3.0rem', top: '0', width: '28px', height: '28px', borderRadius: '50%', background: project.status === 'Completed' ? '#fff' : '#f5f5f5', border: project.status === 'Completed' ? `2px solid ${theme.primary}` : '2px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: project.status === 'Completed' ? theme.primary : '#999', zIndex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                    <Flag size={14} />
                                </div>
                                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: '#333' }}>Handover</h4>
                                <p style={{ color: '#666', margin: 0, fontWeight: 500 }}>{project.handover}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 3: Downloads */}
                    <motion.div
                        style={cardBaseStyle}
                        whileHover={cardHoverVariant}
                    >
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.5rem', display: 'inline-block', color: '#333' }}>Downloads</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {project.floorPlans && project.floorPlans.map((plan, i) => (
                                <a
                                    key={i}
                                    href={plan}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        backgroundColor: 'rgba(255,255,255,0.5)', // Inner glass
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        color: '#333',
                                        transition: 'background-color 0.2s',
                                        border: '1px solid rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <FileText size={24} color="#666" />
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Floor Plan {i + 1}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>PDF Document</div>
                                    </div>
                                    <span style={{ marginLeft: 'auto', color: theme.primary }}>
                                        <Download size={18} />
                                    </span>
                                </a>
                            ))}
                            {(!project.floorPlans || project.floorPlans.length === 0) && (
                                <p style={{ color: '#888', fontStyle: 'italic' }}>No technical documents available.</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Map Section - Full Width */}
            {project.locationMap && (
                <div className="container" style={{ marginBottom: '4rem' }}>
                    <motion.div
                        style={{
                            width: '100%',
                            height: '500px',
                            position: 'relative',
                            ...cardBaseStyle,
                            padding: '1rem',
                            overflow: 'hidden'
                        }}
                        whileHover={cardHoverVariant}
                    >
                        <iframe
                            src={project.locationMap}
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '16px' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`${project.name} Location`}
                        ></iframe>

                        {/* Get Directions Button Overlay */}
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                position: 'absolute',
                                bottom: '2rem',
                                right: '2rem',
                                backgroundColor: theme.primary,
                                color: '#fff',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '30px',
                                textDecoration: 'none',
                                fontWeight: 600,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1rem'
                            }}
                        >
                            <MapPin size={18} /> <span>Get Directions</span>
                        </a>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
