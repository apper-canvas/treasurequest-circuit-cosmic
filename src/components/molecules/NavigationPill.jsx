import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'

const NavigationPill = ({ icon, label, active, onClick, variant = 'default', className = '' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return active
          ? 'bg-blue-500 text-white shadow-lg'
          : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
      case 'success':
        return active
          ? 'bg-green-500 text-white shadow-lg'
          : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
      default:
        return active
          ? 'bg-primary text-white shadow-lg'
          : 'bg-white dark:bg-gray-700 text-secondary dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-gray-600'
    }
  }

  return (
    <Button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-2xl shadow-card transition-all duration-200 ${getVariantStyles()} ${className}`}
    >
      <Icon name={icon} size={18} />
      <Text as="span" className="font-medium">
        {label}
      </Text>
    </Button>
  )
}

export default NavigationPill