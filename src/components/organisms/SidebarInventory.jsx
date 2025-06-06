import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import InventoryItem from '@/components/molecules/InventoryItem'
import { motion } from 'framer-motion'

const SidebarInventory = ({ inventory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-card p-6"
    >
      <Text as="h3" className="text-xl font-heading text-secondary dark:text-primary mb-4 flex items-center">
        <Icon name="Package" className="mr-2" />
        Treasure Chest
      </Text>
      <div className="grid grid-cols-2 gap-3">
        {inventory?.length > 0 ? (
          inventory.map((item, index) => <InventoryItem key={item?.id || index} item={item} index={index} />)
        ) : (
          <div className="col-span-2 text-center py-8 text-secondary/60 dark:text-surface-400">
            <Icon name="Package" className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <Text as="p" className="text-sm">
              No treasures yet
            </Text>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default SidebarInventory