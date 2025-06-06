import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'

const HeaderBranding = () => {
  return (
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        <Icon name="Map" className="text-primary w-12 h-12" />
        <Icon
          name="Dot"
          className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div>
        <Text as="h1" className="text-4xl md:text-5xl font-heading text-secondary-dark dark:text-primary">
          TreasureQuest
        </Text>
        <Text as="p" className="text-secondary dark:text-surface-300 text-sm">
          Embark on the Ultimate Adventure
        </Text>
      </div>
    </motion.div>
  )
}

export default HeaderBranding