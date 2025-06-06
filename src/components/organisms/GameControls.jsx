import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import GameProgress from '@/components/molecules/GameProgress'
import NavigationPill from '@/components/molecules/NavigationPill'
import { toast } from 'react-toastify'
const GameControls = ({ score, treasuresFoundCount, totalTreasures, onResetGame, onShowInstructions }) => {
  return (
    <>
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Coins" className="text-primary w-6 h-6" />
            <Text as="span" className="text-2xl font-bold text-secondary dark:text-primary">
              {score}
            </Text>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <NavigationPill 
            icon="HelpCircle" 
            label="Instructions" 
            onClick={onShowInstructions}
            variant="info"
          />
          <NavigationPill icon="RotateCcw" label="New Game" onClick={onResetGame} />
          <NavigationPill icon="Trophy" label="Achievements" onClick={() => toast.info('Achievements coming soon!')} />
          <NavigationPill icon="Settings" label="Settings" onClick={() => toast.info('Settings coming soon!')} />
        </div>
      </div>
      
      <GameProgress 
        found={treasuresFoundCount} 
        total={totalTreasures} 
      />
    </>
  )
}

export default GameControls