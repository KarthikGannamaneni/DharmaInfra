import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link, useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { BedDouble as IconBed, Ruler as IconRuler, Maximize as IconMaximize } from 'lucide-react';
import L from 'leaflet';
import { processedData as data } from '../utils/data';
import { getAssetPath } from '../utils/paths';
import { Project } from '../types';
import { projectThemes, defaultTheme } from '../utils/theme';
import { hexToRgba } from '../utils/colors';

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker Icon for Active/Hover State
const createCustomIcon = (isActive: boolean, color: string) => L.divIcon({
    className: 'custom-marker',
    html: `<div style="
        background-color: ${isActive ? color : '#2c3e50'};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    ">
        <div style="
            width: 10px;
            height: 10px;
            background-color: white;
            border-radius: 50%;
            transform: rotate(45deg);
        "></div>
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

// Helper to control map view programmatically
interface MapControllerProps {
    center: L.LatLngExpression;
    bounds: L.LatLngBoundsExpression | null;
}

const MapController: React.FC<MapControllerProps> = ({ center, bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.flyToBounds(bounds, { padding: [20, 20], duration: 1.5 });
        } else if (center) {
            map.flyTo(center, 15, { duration: 1.5, easeLinearity: 0.25 });
        }
    }, [center, bounds, map]);
    return null;
};

interface ProjectWithCoords extends Project {
    coordinates: L.LatLngTuple;
}


// Mock coordinates and themes for projects

// Mock coordinates and themes for projects
const projectCoordinates: Record<string, L.LatLngTuple> = {
    'tara-sitara': [17.5414, 78.4694],
    'rs-residences': [17.5284, 78.4215],
    'vrindavan-a': [17.4866, 78.4244],
    'vrindavan-b': [17.4866, 78.4245],
    'silver-square': [17.5148, 78.4206],
    'orchard': [17.4580, 78.3009],
    'jewel-crest': [17.5148, 78.4174]
};

const Projects: React.FC = () => {
    const navigate = useNavigate();
    const projectsWithCoords: ProjectWithCoords[] = React.useMemo(() => data.projects.map(p => ({
        ...p,
        coordinates: projectCoordinates[p.id] || [17.3850, 78.4867]
    })), []);

    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState<L.LatLngExpression>([17.45, 78.45]);
    const [mapBounds, setMapBounds] = useState<L.LatLngBoundsExpression | null>(() => {
        if (projectsWithCoords.length > 0) {
            return projectsWithCoords.map(p => p.coordinates);
        }
        return null;
    });

    const handleProjectClick = (project: ProjectWithCoords) => {
        if (selectedProjectId === project.id) {
            // If already selected, navigate to detail page
            navigate(`/projects/${project.id}`);
        } else {
            // First click: Select project
            setSelectedProjectId(project.id);
            // Clear bounds to allow flyTo center to take precedence
            setMapBounds(null);
            setMapCenter(project.coordinates);
        }
    };

    const handleGlobalView = () => {
        if (projectsWithCoords.length > 0) {
            const bounds = projectsWithCoords.map(p => p.coordinates);
            setSelectedProjectId(null);
            setMapBounds(bounds);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
        }}>

            {/* Main Page Content Wrapper */}
            <div className="projects-page-wrapper">
                <div style={{ maxWidth: '1800px', margin: '0 auto' }}>

                    <header style={{ marginBottom: '32px' }}>
                        <h1 className="font-cinzel" style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '8px' }}>Projects</h1>
                        <p style={{ color: '#718096', fontFamily: 'sans-serif' }}>Explore our signature developments.</p>
                    </header>

                    <div className="projects-layout">

                        {/* LEFT CONTAINER - Scrollable (List) */}
                        <div className="projects-list-container">
                            {/* Inner Padding container */}
                            <div style={{ padding: '8px 4px' }}>


                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {projectsWithCoords.map((project) => {
                                        const theme = projectThemes[project.id] || defaultTheme;
                                        const isSelected = selectedProjectId === project.id;
                                        const isHovered = hoveredProjectId === project.id;

                                        const isActive = isSelected || isHovered;

                                        return (
                                            <motion.div
                                                key={project.id}
                                                onClick={() => handleProjectClick(project)}
                                                onMouseEnter={() => setHoveredProjectId(project.id)}
                                                onMouseLeave={() => setHoveredProjectId(null)}
                                                className="project-card-wrapper"
                                                initial={false}
                                                animate={{
                                                    background: isActive ? theme.glassGradient : '#fff',
                                                    backdropFilter: isActive ? 'blur(30px) saturate(120%)' : 'blur(0px)',
                                                    borderColor: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0,0,0,0.05)',
                                                    boxShadow: isActive ? '0 10px 25px rgba(0, 0, 0, 0.08)' : '0 4px 6px rgba(0,0,0,0.02)',
                                                    scale: isHovered ? 1.01 : 1
                                                }}
                                                style={{
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    overflow: 'visible',
                                                    borderRadius: '24px',
                                                    border: '1px solid rgba(0,0,0,0.05)',
                                                    transition: 'all 0.4s ease'
                                                }}
                                            >
                                                {/* Ambient Shadow Layer */}
                                                {project.image && isSelected && (
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            inset: '-5px',
                                                            backgroundImage: `url('${project.image}')`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            filter: 'blur(20px) saturate(150%)',
                                                            opacity: 0.2,
                                                            zIndex: -1,
                                                            transform: 'translateY(5px)',
                                                            borderRadius: '24px',
                                                            transition: 'opacity 0.4s ease'
                                                        }}
                                                    />
                                                )}

                                                {/* Content Wrapper */}
                                                <div className="project-card-content" style={{
                                                    overflow: 'hidden',
                                                    zIndex: 1,
                                                    borderRadius: '24px',
                                                    background: 'transparent'
                                                }}>
                                                    {/* Thumbnail */}
                                                    <div className="project-card-image" style={{
                                                        position: 'relative'
                                                    }}>
                                                        <img
                                                            src={project.image || getAssetPath('/images/placeholder.png')}
                                                            alt={project.name}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                                            <span style={{
                                                                padding: '4px 12px',
                                                                borderRadius: '9999px',
                                                                fontSize: '10px',
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em',
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                                backgroundColor: project.status === 'Ongoing' ? '#F6E05E' : '#059669',
                                                                color: project.status === 'Ongoing' ? '#000' : '#fff'
                                                            }}>
                                                                {project.status}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Metadata */}
                                                    <div className="project-card-details">
                                                        <div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                                <div>
                                                                    <h2 className="font-cinzel" style={{ fontSize: '1.5rem', color: '#1a202c', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                                                        {project.name}
                                                                    </h2>
                                                                    <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                        {project.location}
                                                                    </p>
                                                                </div>
                                                                {/* Status Badge moved here for better layout balance if needed, or keep on image. Keeping on image for now. */}
                                                            </div>

                                                            {/* Horizontal Stats Row - Reference Style */}
                                                            <div style={{
                                                                marginTop: '24px',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                flexWrap: 'wrap', // Allow wrap on very small screens
                                                                gap: '24px',
                                                            }}>
                                                                {/* Size */}
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                    <IconRuler size={20} strokeWidth={1.5} color="#4A5568" />
                                                                    <div>
                                                                        <p style={{ fontSize: '0.7rem', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Area</p>
                                                                        <p style={{ fontWeight: 500, color: '#2D3748', fontSize: '0.9rem' }}>{project.flatSize || 'TBA'}</p>
                                                                    </div>
                                                                </div>

                                                                {/* Configuration */}
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                    <IconBed size={20} strokeWidth={1.5} color="#4A5568" />
                                                                    <div>
                                                                        <p style={{ fontSize: '0.7rem', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Type</p>
                                                                        <p style={{ fontWeight: 500, color: '#2D3748', fontSize: '0.9rem' }}>{project.configuration || '2 & 3 BHK'}</p>
                                                                    </div>
                                                                </div>
                                                                {/* Plot Size */}
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                    <IconMaximize size={20} strokeWidth={1.5} color="#4A5568" />
                                                                    <div>
                                                                        <p style={{ fontSize: '0.7rem', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Plot</p>
                                                                        <p style={{ fontWeight: 500, color: '#2D3748', fontSize: '0.9rem' }}>{project.size}</p>
                                                                    </div>
                                                                </div></div>
                                                        </div>

                                                        {/* Action Button - Full Width / Explicit */}
                                                        <div style={{ marginTop: '24px', width: '100%' }}>
                                                            <Link
                                                                to={`/projects/${project.id}`}
                                                                className="view-details-btn"
                                                                style={{
                                                                    display: 'block',
                                                                    width: '100%',
                                                                    textAlign: 'center',
                                                                    padding: '12px 24px',
                                                                    fontSize: '0.9rem',
                                                                    fontWeight: 600,
                                                                    color: theme.primary,
                                                                    background: isActive ? hexToRgba(theme.primary, 0.12) : 'transparent',
                                                                    border: `1px solid ${theme.primary}`,
                                                                    borderRadius: '8px', // Slightly squared off like reference
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s ease',
                                                                    textDecoration: 'none',
                                                                }}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                View Details
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}


                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTAINER - Map */}
                        <div className="glass-card projects-map-container"
                            style={{
                                background: 'var(--glass-bg-gradient)',
                                backdropFilter: 'blur(30px) saturate(200%)',
                                WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                                borderTop: '1px solid var(--glass-border)',
                                borderLeft: '1px solid var(--glass-border)',
                                borderBottom: '1px solid var(--glass-border-subtle)',
                                borderRight: '1px solid var(--glass-border-subtle)',
                                boxShadow: 'var(--glass-shadow)',
                            }}>
                            <div style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                zIndex: 999,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                backdropFilter: 'blur(4px)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, background-color 0.2s',
                            }}
                                onClick={handleGlobalView}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4A4E51', textTransform: 'uppercase', letterSpacing: '0.05em', pointerEvents: 'none' }}>Global View</span>
                            </div>

                            <MapContainer
                                center={mapCenter}
                                zoom={12}
                                style={{ height: '100%', width: '100%' }}
                                zoomControl={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                />
                                <MapController center={mapCenter} bounds={mapBounds} />

                                {projectsWithCoords.map(project => {
                                    const isActive = selectedProjectId === project.id;
                                    const isHovered = hoveredProjectId === project.id;
                                    const isHighlighted = isActive || isHovered;
                                    const theme = projectThemes[project.id] || defaultTheme;

                                    return (
                                        <Marker
                                            key={project.id}
                                            position={project.coordinates}
                                            icon={createCustomIcon(isHighlighted, theme.primary)}
                                            eventHandlers={{
                                                click: () => handleProjectClick(project),
                                            }}
                                            zIndexOffset={isHighlighted ? 1000 : 0}
                                        >
                                            {(isActive || isHovered) && (
                                                <Popup autoPan={false} closeButton={false} className="custom-popup" offset={[0, -20]}>
                                                    <div className="text-center px-2 py-1">
                                                        <span className="font-cinzel font-bold text-sm block">{project.name}</span>
                                                        <span className="text-xs text-gray-500 font-sans">{project.size}</span>
                                                    </div>
                                                </Popup>
                                            )}
                                        </Marker>
                                    );
                                })}
                            </MapContainer>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer removed implicitly as it is provided by layout */}
        </div>
    );
};

export default Projects;
