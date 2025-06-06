import ApperIcon from '@/components/ApperIcon'
import { motion } from 'framer-motion'

const Icon = ({ name, size, className, animate, transition, pulse = false }) => {
  return (
    <motion.div
      animate={animate || (pulse ? { scale: [1, 1.2, 1] } : {})}
      transition={transition || (pulse ? { duration: 2, repeat: Infinity } : {})}
      className={className}
    >
      <ApperIcon name={name} size={size} className={className} />
    </motion.div>
  )
}

export default Icon