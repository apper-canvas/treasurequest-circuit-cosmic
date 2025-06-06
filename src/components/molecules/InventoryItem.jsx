import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import { motion } from 'framer-motion'

const InventoryItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface-50 dark:bg-gray-700 rounded-xl p-3 text-center"
    >
      <Icon name={item?.icon || 'Gem'} className="text-primary w-8 h-8 mx-auto mb-2" />
      <Text as="p" className="text-xs font-medium text-secondary dark:text-surface-300">
        {item?.name || 'Unknown'}
      </Text>
      <Text as="p" className="text-xs text-primary font-bold">
        {item?.value || 0}g
      </Text>
    </motion.div>
  )
}

export default InventoryItem