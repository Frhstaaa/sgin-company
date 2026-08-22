import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({
    children,
    width = '100%',
    direction = 'up',
    delay = 0,
    duration = 0.5,
    distance = 40,
    className = ''
}) {
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1],
            }
        },
    };

    return (
        <div style={{ width }} className={`w-full max-w-full overflow-hidden ${className}`}>
            <motion.div
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
