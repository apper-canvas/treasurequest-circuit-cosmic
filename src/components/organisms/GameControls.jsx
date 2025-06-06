import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Text from '@/components/atoms/Text'
import GameProgress from '@/components/molecules/GameProgress'

const GameControls = ({ score, treasuresFoundCount, totalTreasures, onResetGame }) => {
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
          <div className="flex items-center space-x-2">
            <Icon name="Map" className="text-accent w-5 h-5" />
            <Text as="span" className="text-sm text-secondary dark:text-surface-300">
              {treasuresFoundCount}/{totalTreasures} Treasures
            </Text>
          </div>
        </div>
        <Button
          onClick={onResetGame}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-xl shadow-card"
        >
          <Icon name="RotateCcw" size={16} className="inline mr-2" />
          New Game
        </Button>
      </div>
      <GameProgress found={treasuresFoundCount} total={totalTreasures} />
    </>
  )
}

export default GameControls