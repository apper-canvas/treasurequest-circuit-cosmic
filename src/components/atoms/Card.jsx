import { motion } from 'framer-motion'

const Card = ({ children, className = '', initial, animate, transition }) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={`bg-white dark:bg-gray-800 rounded-3xl shadow-card p-8 relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card