import { motion } from 'framer-motion'

const Button = ({ children, onClick, className = '', whileHover = { scale: 1.05 }, whileTap = { scale: 0.95 }, disabled, type = 'button' }) => {
  return (
    <motion.button
      whileHover={whileHover}
      whileTap={whileTap}
      onClick={onClick}
      className={`transition-all duration-300 ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  )
}

export default Button