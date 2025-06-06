import Modal from '@/components/molecules/Modal'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'

const LocationDetailModal = ({ selectedLocation, onClose, onSearchTreasure }) => {
  return (
    <Modal isOpen={!!selectedLocation} onClose={onClose}>
      <div className="text-center mb-6">
        <Text as="h2" className="text-2xl font-heading text-secondary dark:text-primary mb-2">
          {selectedLocation?.name || 'Unknown Location'}
        </Text>
        <Text as="p" className="text-secondary/80 dark:text-surface-300">
          {selectedLocation?.description || 'A mysterious place...'}
        </Text>
      </div>

      <div className="bg-surface-50 dark:bg-gray-700 rounded-2xl p-4 mb-6">
        <Text as="h3" className="font-semibold text-secondary dark:text-surface-200 mb-2">
          Ancient Clue:
        </Text>
        <Text as="p" className="text-secondary/80 dark:text-surface-300 italic">
          "{selectedLocation?.clue || 'The secrets lie hidden...'}"
        </Text>
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={onSearchTreasure}
          className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium"
        >
          Search for Treasure
        </Button>
        <Button
          onClick={onClose}
          className="px-6 bg-surface-200 dark:bg-gray-600 hover:bg-surface-300 dark:hover:bg-gray-500 text-secondary dark:text-surface-200 py-3 rounded-xl font-medium"
        >
          Leave
        </Button>
      </div>
    </Modal>
  )
}

export default LocationDetailModal