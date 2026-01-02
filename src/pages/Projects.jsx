import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { processedData as data } from '../utils/data';
import { getAssetPath } from '../utils/paths';
import ui from '../config/ui';

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker Icon for Active/Hover State
const createCustomIcon = (isActive) => L.divIcon({
    className: 'custom-marker',
    html: `<div style="
        background-color: ${isActive ? '#FFD700' : '#2c3e50'};
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
const MapController = ({ center, bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
        } else if (center) {
            map.flyTo(center, 15, { duration: 1.5, easeLinearity: 0.25 });
        }
    }, [center, bounds, map]);
    return null;
};

const Experimentation = () => {
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [hoveredProjectId, setHoveredProjectId] = useState(null);
    const [mapCenter, setMapCenter] = useState([17.45, 78.45]);
    const [mapBounds, setMapBounds] = useState(null);

    // Mock coordinates for projects
    const projectCoordinates = {
        'tara-sitara': [17.5414, 78.4694],
        'rs-residences': [17.5284, 78.4215],
        'vrindavan-a': [17.4866, 78.4244],
        'vrindavan-b': [17.4866, 78.4245],
        'silver-square': [17.5148, 78.4206],
        'orchard': [17.4580, 78.3009],
        'jewel-crest': [17.5148, 78.4174]
    };

    const projectsWithCoords = data.projects.map(p => ({
        ...p,
        coordinates: projectCoordinates[p.id] || [17.3850, 78.4867]
    }));

    useEffect(() => {
        // Set specific map bounds to show all projects on load
        if (projectsWithCoords.length > 0) {
            const bounds = projectsWithCoords.map(p => p.coordinates);
            setMapBounds(bounds);
        }
    }, []); // Run only on mount

    const handleProjectClick = (project) => {
        setSelectedProjectId(project.id);
        // Clear bounds to allow flyTo center to take precedence or ensuring we focus on one point
        setMapBounds(null);
        setMapCenter(project.coordinates);
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
            // Using global background from body/index.css for consistency
        }}>

            {/* Main Page Content Wrapper with padding for Navbar */}
            <div style={{ paddingTop: '120px', paddingBottom: '48px', paddingLeft: '32px', paddingRight: '32px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                    <header style={{ marginBottom: '32px' }}>
                        <h1 className="font-cinzel" style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '8px' }}>Projects</h1>
                        <p style={{ color: '#718096', fontFamily: 'sans-serif' }}>Explore our signature developments.</p>
                    </header>

                    {/* Split Layout Container */}
                    <div style={{
                        display: 'flex',
                        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                        gap: '24px',
                        height: '80vh',
                        padding: '0',
                        borderRadius: '12px',
                        backgroundColor: 'transparent',
                    }}>

                        {/* LEFT CONTAINER (60%) - Scrollable */}
                        <div
                            style={{
                                width: window.innerWidth < 768 ? '100%' : '60%',
                                height: '100%',
                                borderRadius: '12px',
                                overflowY: 'auto',
                                position: 'relative',
                                scrollbarWidth: 'thin',
                                paddingRight: '16px',
                                // Subtle shadow for the container itself
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)'
                            }}
                        >
                            {/* Inner Padding container */}
                            <div style={{ padding: '8px 4px' }}>


                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {projectsWithCoords.map((project) => (
                                        <motion.div
                                            key={project.id}
                                            onClick={() => handleProjectClick(project)}
                                            onMouseEnter={() => setHoveredProjectId(project.id)}
                                            onMouseLeave={() => setHoveredProjectId(null)}
                                            className="glass-card" // Using the class from index.css
                                            style={{
                                                cursor: 'pointer',
                                                height: '240px',
                                                // Removed hard border, relying on ambient shadow glow
                                                border: '1px solid rgba(255,255,255,0.5)',
                                                position: 'relative',
                                                overflow: 'visible' // Allow glow to bleed out
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* Ambient Shadow Layer - Dynamic Glow for Selected State */}
                                            {project.image && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        // Selected: Expand outwards (-5px). Default: Contract inwards (10px)
                                                        inset: selectedProjectId === project.id ? '-5px' : '10px',
                                                        backgroundImage: `url('${project.image}')`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        // Selected: Sharp blur + High Saturation. Default: Soft blur
                                                        filter: selectedProjectId === project.id
                                                            ? 'blur(20px) saturate(150%)'
                                                            : 'blur(30px) saturate(120%)',
                                                        // Selected: High Opacity. Default: Low Opacity
                                                        opacity: selectedProjectId === project.id ? 0.8 : 0.35,
                                                        zIndex: 0,
                                                        transform: 'translateY(10px)',
                                                        transition: 'all 0.4s ease' // Smooth transition for the glow effect
                                                    }}
                                                />
                                            )}

                                            {/* Glass Panel Content Wrapper */}
                                            <div className="glass-panel" style={{
                                                display: 'flex',
                                                height: '100%',
                                                borderRadius: '20px',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                zIndex: 1,
                                                background: 'rgba(255, 255, 255, 0.6)' // Slightly lighter backing for readability
                                            }}>
                                                {/* Thumbnail (Left) */}
                                                <div style={{ width: '40%', height: '100%', position: 'relative' }}>
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

                                                {/* Metadata (Right) */}
                                                <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <h2 className="font-cinzel" style={{ fontSize: '1.75rem', color: '#1a202c', letterSpacing: '-0.02em' }}>
                                                            {project.name}
                                                        </h2>
                                                        <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            {project.location}
                                                        </p>

                                                        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                            <div>
                                                                <p style={{ fontSize: '0.75rem', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Units</p>
                                                                <p style={{ fontWeight: 600, color: '#4a5568', fontSize: '1.1rem' }}>{project.units}</p>
                                                            </div>
                                                            <div>
                                                                <p style={{ fontSize: '0.75rem', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Area</p>
                                                                <p style={{ fontWeight: 600, color: '#4a5568', fontSize: '1.1rem' }}>{project.size}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        to={`/projects/${project.id}`}
                                                        style={{
                                                            alignSelf: 'flex-start',
                                                            marginTop: '16px',
                                                            fontSize: '0.875rem',
                                                            fontWeight: 600,
                                                            color: '#4A4E51', // Accent color
                                                            background: 'transparent',
                                                            border: '1px solid #CBD5E0',
                                                            padding: '8px 16px',
                                                            borderRadius: '20px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            textDecoration: 'none',
                                                            display: 'inline-block'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.background = '#4A4E51';
                                                            e.target.style.color = '#fff';
                                                            e.target.style.borderColor = '#4A4E51';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.background = 'transparent';
                                                            e.target.style.color = '#4A4E51';
                                                            e.target.style.borderColor = '#CBD5E0';
                                                        }}
                                                        onClick={(e) => e.stopPropagation()} // Prevent triggering the card click
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}


                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTAINER (40%) - Map */}
                        <div
                            className="glass-card"
                            style={{
                                width: window.innerWidth < 768 ? '100%' : '40%',
                                height: '100%',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                position: 'relative',
                                // Glass panel styling to match ProjectCard
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
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
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

                                    return (
                                        <Marker
                                            key={project.id}
                                            position={project.coordinates}
                                            icon={createCustomIcon(isHighlighted)}
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

export default Experimentation;
