import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import Card from '@/components/atoms/Card'
import { motion } from 'framer-motion'

const HintDisplay = ({ hintsRemaining }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-card p-6"
    >
      <Text as="h3" className="text-xl font-heading text-secondary dark:text-primary mb-4 flex items-center">
        <Icon name="Lightbulb" className="mr-2" />
        Hints Remaining
      </Text>
      <div className="flex space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
              index < hintsRemaining
                ? 'border-primary bg-primary text-white'
                : 'border-surface-300 dark:border-gray-600'
            }`}
          >
            <Icon name="HelpCircle" size={16} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default HintDisplay