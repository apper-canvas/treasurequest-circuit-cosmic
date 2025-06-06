import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import GameProgress from '@/components/molecules/GameProgress'
import NavigationPill from '@/components/molecules/NavigationPill'
import { toast } from 'react-toastify'

const GameControls = ({ score, treasuresFoundCount, totalTreasures, onResetGame, onShowInstructions }) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Coins" className="text-primary w-6 h-6" />
            <Text as="span" className="text-2xl font-bold text-secondary dark:text-primary">
              {score}
            </Text>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <NavigationPill 
            icon="RotateCcw" 
            label="New Game" 
            action={onResetGame} 
            variant="secondary" 
          />
          <NavigationPill 
            icon="HelpCircle" 
            label="Instructions" 
            action={onShowInstructions} 
            variant="secondary" 
          />
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