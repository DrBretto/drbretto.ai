import { motion } from 'framer-motion';

export function SlideTransitionWrapper({ children, key }) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default SlideTransitionWrapper;
