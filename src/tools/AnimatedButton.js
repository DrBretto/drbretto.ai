import { motion } from "framer-motion";

function AnimatedButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Log in
    </motion.button>
  );
}
 export default AnimatedButton;