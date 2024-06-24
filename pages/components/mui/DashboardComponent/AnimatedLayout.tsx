import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
};

const AnimatedLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { asPath } = useRouter();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={asPath}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.5 }} // Adjust duration as needed
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatedLayout;
