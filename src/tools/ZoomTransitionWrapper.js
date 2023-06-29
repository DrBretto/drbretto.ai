import { motion } from 'framer-motion';

export function ZoomTransitionWrapper({ children, key }) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default ZoomTransitionWrapper;