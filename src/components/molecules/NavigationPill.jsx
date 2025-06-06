import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'

const NavigationPill = ({ icon, label, active, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-2xl shadow-card ${
        active
          ? 'bg-primary text-white shadow-lg'
          : 'bg-white dark:bg-gray-700 text-secondary dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-gray-600'
      }`}
    >
      <Icon name={icon} size={18} />
      <Text as="span" className="font-medium">
        {label}
      </Text>
    </Button>
  )
}

export default NavigationPill