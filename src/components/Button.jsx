import { motion } from 'framer-motion';

const Button = ({ children, onClick, style = {}, className = "", ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={className}
            style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#2D2D2D',
                border: 'none',
                borderRadius: '4px',
                marginTop: '1rem',
                transition: 'background 0.3s',
                cursor: 'pointer',
                ...style
            }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
