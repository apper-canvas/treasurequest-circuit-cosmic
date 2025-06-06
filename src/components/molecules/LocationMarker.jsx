import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'

const LocationMarker = ({ location, index, onClick, isFound, position }) => {
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={position}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onClick(location)}
    >
      <div className={`relative ${location?.isUnlocked ? 'opacity-100' : 'opacity-50'}`}>
        <div
          className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center ${
            isFound
              ? 'bg-primary treasure-glow'
              : location?.isUnlocked
                ? 'bg-accent hover:bg-accent/80'
                : 'bg-gray-400'
          }`}
        >
          <Icon
            name={isFound ? 'Crown' : location?.isUnlocked ? 'MapPin' : 'Lock'}
            size={16}
            className="text-white"
          />
        </div>
        {location?.isUnlocked && !isFound && (
          <Icon
            name="Dot"
            className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  )
}

export default LocationMarker