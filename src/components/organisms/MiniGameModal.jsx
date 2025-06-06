import Modal from '@/components/molecules/Modal'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const MiniGameModal = ({ isOpen, onClose, miniGameCode, updateMiniGameCode, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full mx-auto mb-4 flex items-center justify-center">
          <Icon name="Lock" size={32} className="text-white" />
        </div>
        <Text as="h2" className="text-2xl font-heading text-secondary dark:text-primary mb-2">
          Treasure Lock
        </Text>
        <Text as="p" className="text-secondary/80 dark:text-surface-300">
          Enter the 3-digit combination to unlock the treasure chest!
        </Text>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {miniGameCode.map((digit, index) => (
          <Input key={index} value={digit} onChange={(e) => updateMiniGameCode(index, e.target.value)} maxLength={1} />
        ))}
      </div>

      <Text as="p" className="text-center text-sm text-secondary/60 dark:text-surface-400 mb-6">
        Hint: Lucky numbers are 7, 3, and 9
      </Text>

      <div className="flex space-x-3">
        <Button
          onClick={onSubmit}
          disabled={miniGameCode.some((d) => d === '')}
          className="flex-1 bg-accent hover:bg-accent/80 disabled:bg-gray-400 text-white py-3 rounded-xl font-medium"
        >
          Unlock
        </Button>
        <Button
          onClick={onClose}
          className="px-6 bg-surface-200 dark:bg-gray-600 hover:bg-surface-300 dark:hover:bg-gray-500 text-secondary dark:text-surface-200 py-3 rounded-xl font-medium"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default MiniGameModal