import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Compass,
    Ruler,
    HardHat,
    Calendar,
    Flag,
    FileText,
    Download,
    ArrowLeft,
    Maximize,
    HeartPulse,
    Train,
    ShoppingBag,
    Building2,
    MapPin,
    Plane,
    School
} from 'lucide-react';
import { processedData as data } from '../utils/data';
import ui from '../config/ui';
import ImageCarousel from '../components/common/ImageCarousel';
import { projectThemes, defaultTheme } from '../utils/theme';
import { hexToRgba } from '../utils/colors';

// Helper: Parse "X mins" to integer for sorting
const parseDuration = (timeStr: string): number => {
    const match = timeStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 999;
};

// Helper: Get Icon based on location name
const getIconForLocation = (location: string) => {
    const lowerLoc = location.toLowerCase();
    if (lowerLoc.includes('school') || lowerLoc.includes('college') || lowerLoc.includes('university')) return <School size={20} />;
    if (lowerLoc.includes('hospital') || lowerLoc.includes('clinic') || lowerLoc.includes('medical')) return <HeartPulse size={20} />;
    if (lowerLoc.includes('metro') || lowerLoc.includes('station') || lowerLoc.includes('train')) return <Train size={20} />;
    if (lowerLoc.includes('airport')) return <Plane size={20} />;
    if (lowerLoc.includes('mall') || lowerLoc.includes('shopping') || lowerLoc.includes('market')) return <ShoppingBag size={20} />;
    if (lowerLoc.includes('park') || lowerLoc.includes('district') || lowerLoc.includes('office') || lowerLoc.includes('hitech')) return <Building2 size={20} />;
    return <MapPin size={20} />;
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
        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '4rem', transition: 'background-color 0.5s ease' }}>

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
                <ImageCarousel images={[project.image, ...(project.gallery || [])].filter(img => img && img.toLowerCase().includes('elevation'))} />

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
                            { label: ui.common.plotSize, value: project.size, icon: <Maximize size={24} strokeWidth={1.5} /> },
                            { label: 'Flat Size', value: project.flatSize || 'N/A', icon: <Ruler size={24} strokeWidth={1.5} /> },
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
                                    { k: 'Power Backup', v: project.hasGenerator ? '100%' : 'N/A' },
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
                            {project.floorPlans && project.floorPlans.map((plan, i) => {
                                const fileName = decodeURIComponent(plan.split('/').pop() || 'Document');
                                return (
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
                                            <div style={{ fontWeight: 600 }}>{fileName}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>PDF Document</div>
                                        </div>
                                        <span style={{ marginLeft: 'auto', color: theme.primary }}>
                                            <Download size={18} />
                                        </span>
                                    </a>
                                )
                            })}
                            {(!project.floorPlans || project.floorPlans.length === 0) && (
                                <p style={{ color: '#888', fontStyle: 'italic' }}>No technical documents available.</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Map and Distance Matrix Section */}
            {(project.locationMap || (project.distances && project.distances.length > 0)) && (
                <div className="container" style={{ marginBottom: '4rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem',
                        alignItems: 'stretch'
                    }}>
                        {/* Map - Left Side */}
                        {project.locationMap && (
                            <motion.div
                                style={{
                                    width: '100%',
                                    minHeight: '350px',
                                    height: '100%',
                                    position: 'relative',
                                    ...cardBaseStyle,
                                    padding: '0.5rem',
                                    overflow: 'hidden'
                                }}
                                whileHover={cardHoverVariant}
                            >
                                <iframe
                                    src={project.locationMap}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, borderRadius: '20px', display: 'block' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`${project.name} Location`}
                                ></iframe>
                            </motion.div>
                        )}

                        {/* Distance Matrix - Right Side */}
                        {project.distances && project.distances.length > 0 && (
                            <motion.div
                                style={{
                                    ...cardBaseStyle,
                                    height: '100%'
                                }}
                                whileHover={cardHoverVariant}
                            >
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.5rem', display: 'inline-block', color: '#333' }}>Location Highlights</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[...project.distances]
                                        .sort((a: any, b: any) => parseDuration(a.distance) - parseDuration(b.distance))
                                        .map((item: any, idx: number) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
                                                <div style={{
                                                    width: '40px', height: '40px', borderRadius: '50%', backgroundColor: hexToRgba(theme.primary, 0.15), color: theme.primary,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                                }}>
                                                    {getIconForLocation(item.location)}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600, color: '#333' }}>{item.location}</div>
                                                </div>
                                                <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>{item.distance}</div>
                                            </div>
                                        ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
            {/* Specifications Section */}
            {(() => {
                const globalSpecs = data.specifications || [];
                const projectSpecs = project.specifications || [];
                const hiddenSpecs = project.hiddenSpecifications || [];

                // 1. Merge global with overrides
                let finalSpecs = globalSpecs.map(gs => {
                    const override = projectSpecs.find(ps => ps.category === gs.category);
                    return override || gs;
                });

                // 2. Append strictly new categories from project
                const newSpecs = projectSpecs.filter(ps => !globalSpecs.some(gs => gs.category === ps.category));
                finalSpecs = [...finalSpecs, ...newSpecs];

                // 3. Filter out hidden specifications
                finalSpecs = finalSpecs.filter(s => !hiddenSpecs.includes(s.category));

                if (finalSpecs.length === 0) return null;

                return (
                    <div className="container" style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: `2px solid ${theme.primary}`, paddingBottom: '0.5rem', display: 'inline-block', color: '#333' }}>Specifications</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1.5rem',
                            alignItems: 'start'
                        }}>
                            {finalSpecs.map((spec, idx) => (
                                <motion.div
                                    key={idx}
                                    style={{
                                        ...cardBaseStyle,
                                        padding: '1.5rem',
                                        height: '100%'
                                    }}
                                    whileHover={cardHoverVariant}
                                >
                                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: theme.primary, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '8px', height: '8px', backgroundColor: theme.primary, borderRadius: '50%' }}></div>
                                        {spec.category}
                                    </h4>
                                    <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6', margin: 0 }}>
                                        {spec.details}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            })()}
        </div >
    );
};

export default ProjectDetail;
