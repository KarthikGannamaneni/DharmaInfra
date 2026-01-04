// Define Project Themes
export interface ProjectTheme {
    primary: string;
    secondary?: string;
    glassGradient: string;
}

export const projectThemes: Record<string, ProjectTheme> = {
    'tara-sitara': {
        primary: '#E2B96F', // Pastel Gold
        secondary: '#fdfbf7',
        glassGradient: 'linear-gradient(135deg, rgba(226, 185, 111, 0.08) 0%, rgba(226, 185, 111, 0.04) 40%, rgba(255, 255, 255, 0.6) 100%)'
    },
    'rs-residences': {
        primary: '#7F9CF5', // Pastel Indigo
        secondary: '#f5f7ff',
        glassGradient: 'linear-gradient(135deg, rgba(127, 156, 245, 0.08) 0%, rgba(127, 156, 245, 0.04) 40%, rgba(255, 255, 255, 0.6) 100%)'
    },
    'vrindavan-a': {
        primary: '#4FD1C5', // Pastel Teal
        secondary: '#f2fffd',
        glassGradient: 'linear-gradient(135deg, rgba(79, 209, 197, 0.08) 0%, rgba(79, 209, 197, 0.04) 40%, rgba(255, 255, 255, 0.6) 100%)'
    },
    'vrindavan-b': {
        primary: '#F687B3', // Pastel Pink
        secondary: '#fff5f7',
        glassGradient: 'linear-gradient(135deg, rgba(246, 135, 179, 0.08) 0%, rgba(246, 135, 179, 0.04) 40%, rgba(255, 255, 255, 0.6) 100%)'
    },
    'silver-square': {
        primary: '#63B3ED', // Pastel Sky Blue
        secondary: '#f0f9ff',
        glassGradient: 'linear-gradient(135deg, rgba(99, 179, 237, 0.08) 0%, rgba(99, 179, 237, 0.04) 40%, rgba(255, 255, 255, 0.6) 100%)'
    },
    'orchard': {
        primary: '#68D391', // Pastel Green
        secondary: '#f0fff4',
        glassGradient: 'linear-gradient(135deg, rgba(104, 211, 145, 0.08) 0%, rgba(104, 211, 145, 0.04) 40%, rgba(255, 255, 255, 0.6) 100%)'
    },
    'jewel-crest': {
        primary: '#B794F4', // Pastel Lavender
        secondary: '#fbf5ff',
        glassGradient: 'linear-gradient(135deg, rgba(183, 148, 244, 0.08) 0%, rgba(183, 148, 244, 0.04) 40%, rgba(255, 255, 255, 0.6) 100%)'
    }
};

export const defaultTheme: ProjectTheme = {
    primary: '#4A4E51',
    secondary: '#f8f9fa',
    glassGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.05) 100%)'
};
