import { motion } from 'framer-motion';

export function SlideTransitionWrapper({ children, key }) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: "-100vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100vw" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default SlideTransitionWrapper;