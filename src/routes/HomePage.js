import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import LogoutButton from '../components/LogoutButton';

function AnimatedList({ items }) {
  return (
    <AnimatePresence>
      {items.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.text}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

const HomePage = () => {
  const [items, setItems] = useState([]);
  
  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), text: `Item ${items.length + 1}` }]);
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={addItem}>Add item</button>
      <AnimatedList items={items} />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
