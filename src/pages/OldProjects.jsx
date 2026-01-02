import { motion } from 'framer-motion';
import { processedData as data } from '../utils/data';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import ui from '../config/ui';

const OldProjects = () => {
    const { projects } = data;

    const ongoingProjects = projects.filter(p => p.status === 'Ongoing');
    const completedProjects = projects.filter(p => p.status === 'Completed');

    return (
        <section className="section" style={{
            minHeight: '100vh',
            paddingTop: '8rem',
            // Adding a sophisticated gradient background to make the glassmorphism pop
            background: 'linear-gradient(to bottom, #f5f7fa 0%, #E8EBF0 50%, #F2F1EF 100%)'
        }}>
            <div className="container">
                <h2 style={{ marginBottom: '3rem', textAlign: 'center', color: '#333' }}>{ui.portfolio.title}</h2>

                {ongoingProjects.length > 0 && (
                    <div style={{ marginBottom: '4rem' }}>
                        <SectionHeader title={ui.portfolio.ongoing} />
                        <div className="grid-3-col">
                            {ongoingProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                )}

                {completedProjects.length > 0 && (
                    <div>
                        <SectionHeader title={ui.portfolio.completed} />
                        <div className="grid-3-col">
                            {completedProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                )}

                {ongoingProjects.length === 0 && completedProjects.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--color-accent)' }}>
                        {ui.portfolio.empty}
                    </div>
                )}
            </div>
        </section>
    );
};

export default OldProjects;
