import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Modal from '@/components/molecules/Modal'

const Instructions = ({ isOpen, onClose }) => {
  const instructionSections = [
    {
      icon: 'Map',
      title: 'Exploring the Island',
      items: [
        'Click on unlocked locations (green markers) to explore them',
        'Locked locations (red markers) require finding treasures to unlock',
        'Your current location is highlighted with a special marker',
        'Each location has unique clues and hidden treasures'
      ]
    },
    {
      icon: 'Search',
      title: 'Finding Treasures',
      items: [
        'Search each location thoroughly by clicking "Search for Treasure"',
        'Solve mini-game puzzles to unlock treasure chests',
        'Each treasure has different gold values and rarity',
        'Successfully found treasures are added to your inventory'
      ]
    },
    {
      icon: 'Package',
      title: 'Inventory Management',
      items: [
        'View all collected treasures in your inventory sidebar',
        'Each item shows its name, value, and rarity level',
        'Rare treasures are worth more gold and unlock special areas',
        'Your total gold score increases with each treasure found'
      ]
    },
    {
      icon: 'Gamepad2',
      title: 'Mini-Games & Puzzles',
      items: [
        'Each treasure chest requires solving a number combination',
        'Enter the 3-digit code to unlock the treasure',
        'Look for clues in location descriptions and hints',
        'Wrong combinations will reset - try different numbers!'
      ]
    },
    {
      icon: 'Trophy',
      title: 'Scoring & Progress',
      items: [
        'Earn gold by finding treasures (values vary by rarity)',
        'Track your progress with treasures found vs total available',
        'Unlock new locations by finding treasures in previous areas',
        'Reset your adventure anytime to start a new treasure hunt'
      ]
    },
    {
      icon: 'Lightbulb',
      title: 'Hints & Tips',
      items: [
        'You start with 3 hints - use them wisely for tough puzzles',
        'Read location descriptions carefully for treasure clues',
        'Some treasures require specific combinations based on the story',
        'Explore systematically - don\'t skip any unlocked locations!'
      ]
    }
  ]

return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[70vh] overflow-y-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-3">
            <Icon name="Map" size={32} className="text-primary mr-2" />
            <Text as="h2" className="text-2xl font-heading text-primary">
              Treasure Hunt Guide
            </Text>
          </div>
          <Text className="text-secondary">
            Master the art of treasure hunting with this comprehensive guide!
          </Text>
        </motion.div>

        <div className="grid gap-6">
          {instructionSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 border-l-4 border-l-primary">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <Icon name={section.icon} size={24} className="text-primary" />
                  </div>
                  <Text as="h3" className="text-lg font-heading text-secondary">
                    {section.title}
                  </Text>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <Icon name="ChevronRight" size={16} className="text-accent mt-0.5 mr-2 flex-shrink-0" />
                      <Text className="text-gray-700 text-sm leading-relaxed">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl"
        >
          <Icon name="Star" size={24} className="text-primary mx-auto mb-2" />
          <Text as="h4" className="font-heading text-lg text-secondary mb-2">
            Ready for Adventure?
          </Text>
          <Text className="text-gray-600 mb-4">
            Now that you know the rules, start your treasure hunting journey!
          </Text>
          <Button
            onClick={onClose}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg"
          >
            Start Treasure Hunt!
          </Button>
        </motion.div>
      </div>
    </Modal>
  )
}

export default Instructions