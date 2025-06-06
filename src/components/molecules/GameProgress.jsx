import { motion } from 'framer-motion'
import Text from '@/components/atoms/Text'

const GameProgress = ({ found, total }) => {
  const completionPercentage = total > 0 ? (found / total) * 100 : 0

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <Text as="span" className="text-sm font-medium text-secondary dark:text-surface-300">
          Adventure Progress
        </Text>
        <Text as="span" className="text-sm text-secondary dark:text-surface-300">
          {Math.round(completionPercentage)}%
        </Text>
      </div>
      <div className="w-full bg-surface-200 dark:bg-gray-700 rounded-full h-3">
        <motion.div
          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full treasure-glow"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default GameProgress