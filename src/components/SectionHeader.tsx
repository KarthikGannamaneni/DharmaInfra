import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    title?: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, children, className = "", style = {} }) => {
    return (
        <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={className}
            style={{
                fontSize: '1.75rem',
                marginBottom: '2rem',
                borderLeft: '4px solid var(--color-accent)',
                paddingLeft: '1rem',
                color: '#333',
                ...style
            }}
        >
            {title || children}
        </motion.h3>
    );
};

export default SectionHeader;
