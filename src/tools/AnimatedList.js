import { motion, AnimatePresence } from 'framer-motion';

function AnimatedList({ items }) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.text}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default AnimatedList;
