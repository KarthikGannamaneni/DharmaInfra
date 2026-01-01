import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAssetPath } from '../utils/paths';

const Preloader = ({ onComplete }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
            setTimeout(onComplete, 1000); // Wait for exit animation
        }, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: loaded ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#F9F8F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                pointerEvents: loaded ? 'none' : 'all'
            }}
        >
            <motion.img
                src={getAssetPath("/vectors/house-icon.svg")}
                alt="Loading..."
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{ duration: 1.5, times: [0, 0.6, 1], ease: "easeOut" }}
                style={{ width: '80px', height: 'auto' }}
            />
        </motion.div>
    );
};

export default Preloader;
