import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import locationService from '../services/api/locationService'
import treasureService from '../services/api/treasureService'
import gameStateService from '../services/api/gameStateService'

const MainFeature = () => {
  const [locations, setLocations] = useState([])
  const [treasures, setTreasures] = useState([])
  const [gameState, setGameState] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showMiniGame, setShowMiniGame] = useState(false)
  const [miniGameCode, setMiniGameCode] = useState(['', '', ''])
  const [correctCode] = useState(['7', '3', '9'])

  useEffect(() => {
    loadGameData()
  }, [])

  const loadGameData = async () => {
    setLoading(true)
    try {
      const [locationsData, treasuresData, gameStateData] = await Promise.all([
        locationService.getAll(),
        treasureService.getAll(),
        gameStateService.getAll()
      ])
      
      setLocations(locationsData || [])
      setTreasures(treasuresData || [])
      setGameState(gameStateData?.[0] || {
        score: 0,
        treasuresFound: [],
        currentLocation: '',
        inventory: [],
        hintsRemaining: 3
      })
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load game data')
    } finally {
      setLoading(false)
    }
  }

  const handleLocationClick = async (location) => {
    if (!location?.isUnlocked) {
      toast.warn('This location is still locked! Find more clues to unlock it.')
      return
    }

    setSelectedLocation(location)
    
    try {
      const updatedGameState = {
        ...gameState,
        currentLocation: location.id
      }
      await gameStateService.update(gameState?.id || 'game-1', updatedGameState)
      setGameState(updatedGameState)
      
      toast.info(`Exploring ${location.name}...`)
    } catch (err) {
      console.error('Error updating location:', err)
    }
  }

  const handleTreasureFound = async (treasureId) => {
    const treasure = treasures.find(t => t?.id === treasureId)
    if (!treasure || gameState?.treasuresFound?.includes(treasureId)) return

    try {
      const updatedGameState = {
        ...gameState,
        score: (gameState?.score || 0) + (treasure.value || 0),
        treasuresFound: [...(gameState?.treasuresFound || []), treasureId],
        inventory: [...(gameState?.inventory || []), treasure]
      }
      
      await gameStateService.update(gameState?.id || 'game-1', updatedGameState)
      setGameState(updatedGameState)
      setShowMiniGame(false)
      setSelectedLocation(null)
      
      toast.success(`🏆 Found ${treasure.name}! +${treasure.value} gold!`)
      
      // Unlock next location
      const nextLocationIndex = locations.findIndex(l => !l?.isUnlocked)
      if (nextLocationIndex !== -1) {
        const updatedLocations = [...locations]
        updatedLocations[nextLocationIndex] = {
          ...updatedLocations[nextLocationIndex],
          isUnlocked: true
        }
        setLocations(updatedLocations)
        toast.info(`New location unlocked: ${updatedLocations[nextLocationIndex]?.name}!`)
      }
    } catch (err) {
      console.error('Error collecting treasure:', err)
      toast.error('Failed to collect treasure')
    }
  }

  const handleMiniGameSubmit = () => {
    const userCode = miniGameCode.join('')
    const correctCodeStr = correctCode.join('')
    
    if (userCode === correctCodeStr) {
      const treasureId = selectedLocation?.treasureId
      if (treasureId) {
        handleTreasureFound(treasureId)
      }
    } else {
      toast.error('Wrong combination! Try again.')
      setMiniGameCode(['', '', ''])
    }
  }

  const updateMiniGameCode = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...miniGameCode]
      newCode[index] = value
      setMiniGameCode(newCode)
    }
  }

  const resetGame = async () => {
    try {
      const newGameState = {
        score: 0,
        treasuresFound: [],
        currentLocation: '',
        inventory: [],
        hintsRemaining: 3
      }
      
      await gameStateService.update('game-1', newGameState)
      setGameState(newGameState)
      setSelectedLocation(null)
      setShowMiniGame(false)
      setMiniGameCode(['', '', ''])
      
      // Reset locations
      const resetLocations = locations.map((location, index) => ({
        ...location,
        isUnlocked: index === 0 // Only first location unlocked
      }))
      setLocations(resetLocations)
      
      toast.success('New adventure started!')
    } catch (err) {
      console.error('Error resetting game:', err)
      toast.error('Failed to reset game')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Loader" size={48} className="text-primary" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    )
  }

  const completionPercentage = treasures.length > 0 
    ? ((gameState?.treasuresFound?.length || 0) / treasures.length) * 100 
    : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Map Area */}
      <div className="lg:col-span-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-card p-8 parchment-bg relative overflow-hidden"
        >
          {/* Game Controls */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Coins" className="text-primary w-6 h-6" />
                <span className="text-2xl font-bold text-secondary dark:text-primary">
                  {gameState?.score || 0}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Map" className="text-accent w-5 h-5" />
                <span className="text-sm text-secondary dark:text-surface-300">
                  {gameState?.treasuresFound?.length || 0}/{treasures.length} Treasures
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-xl shadow-card transition-all duration-300"
            >
              <ApperIcon name="RotateCcw" size={16} className="inline mr-2" />
              New Game
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-secondary dark:text-surface-300">
                Adventure Progress
              </span>
              <span className="text-sm text-secondary dark:text-surface-300">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <div className="w-full bg-surface-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full treasure-glow"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Island Map */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl overflow-hidden">
            {/* Water background with islands */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 dark:from-blue-800 dark:via-blue-700 dark:to-blue-600">
              {/* Main Island */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-60 bg-gradient-to-br from-green-300 to-green-500 dark:from-green-600 dark:to-green-800 rounded-full shadow-lg">
                {/* Mountain peaks */}
                <div className="absolute top-4 left-12 w-8 h-8 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                <div className="absolute top-6 left-20 w-6 h-6 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Location Markers */}
            {locations.map((location, index) => {
              const positions = [
                { top: '60%', left: '40%' }, // Beach
                { top: '45%', left: '55%' }, // Forest
                { top: '30%', left: '50%' }, // Mountain
                { top: '40%', left: '70%' }, // Cave
                { top: '70%', left: '60%' }, // Ruins
                { top: '25%', left: '35%' }, // Tower
                { top: '80%', left: '45%' }, // Cove
                { top: '20%', left: '65%' }, // Peak
              ]
              
              const position = positions[index] || { top: '50%', left: '50%' }
              const isFound = gameState?.treasuresFound?.includes(location?.treasureId)
              
              return (
                <motion.div
                  key={location?.id || index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={position}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className={`relative ${location?.isUnlocked ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center ${
                      isFound 
                        ? 'bg-primary treasure-glow' 
                        : location?.isUnlocked 
                          ? 'bg-accent hover:bg-accent/80' 
                          : 'bg-gray-400'
                    }`}>
                      <ApperIcon 
                        name={isFound ? "Crown" : location?.isUnlocked ? "MapPin" : "Lock"} 
                        size={16} 
                        className="text-white" 
                      />
                    </div>
                    {location?.isUnlocked && !isFound && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Sidebar - Inventory & Info */}
      <div className="space-y-6">
        {/* Inventory */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-card p-6"
        >
          <h3 className="text-xl font-heading text-secondary dark:text-primary mb-4 flex items-center">
            <ApperIcon name="Package" className="mr-2" />
            Treasure Chest
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {gameState?.inventory?.length > 0 ? (
              gameState.inventory.map((item, index) => (
                <motion.div
                  key={item?.id || index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface-50 dark:bg-gray-700 rounded-xl p-3 text-center"
                >
                  <ApperIcon name={item?.icon || "Gem"} className="text-primary w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs font-medium text-secondary dark:text-surface-300">
                    {item?.name || 'Unknown'}
                  </p>
                  <p className="text-xs text-primary font-bold">
                    {item?.value || 0}g
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-secondary/60 dark:text-surface-400">
                <ApperIcon name="Package" className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No treasures yet</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Hints */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-card p-6"
        >
          <h3 className="text-xl font-heading text-secondary dark:text-primary mb-4 flex items-center">
            <ApperIcon name="Lightbulb" className="mr-2" />
            Hints Remaining
          </h3>
          <div className="flex space-x-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  index < (gameState?.hintsRemaining || 0)
                    ? 'border-primary bg-primary text-white'
                    : 'border-surface-300 dark:border-gray-600'
                }`}
              >
                <ApperIcon name="HelpCircle" size={16} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Location Detail Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading text-secondary dark:text-primary mb-2">
                  {selectedLocation?.name || 'Unknown Location'}
                </h2>
                <p className="text-secondary/80 dark:text-surface-300">
                  {selectedLocation?.description || 'A mysterious place...'}
                </p>
              </div>

              <div className="bg-surface-50 dark:bg-gray-700 rounded-2xl p-4 mb-6">
                <h3 className="font-semibold text-secondary dark:text-surface-200 mb-2">Ancient Clue:</h3>
                <p className="text-secondary/80 dark:text-surface-300 italic">
                  "{selectedLocation?.clue || 'The secrets lie hidden...'}"
                </p>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMiniGame(true)}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Search for Treasure
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLocation(null)}
                  className="px-6 bg-surface-200 dark:bg-gray-600 hover:bg-surface-300 dark:hover:bg-gray-500 text-secondary dark:text-surface-200 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Leave
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Game Modal */}
      <AnimatePresence>
        {showMiniGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ApperIcon name="Lock" size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-heading text-secondary dark:text-primary mb-2">
                  Treasure Lock
                </h2>
                <p className="text-secondary/80 dark:text-surface-300">
                  Enter the 3-digit combination to unlock the treasure chest!
                </p>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                {miniGameCode.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => updateMiniGameCode(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl font-bold bg-surface-50 dark:bg-gray-700 border-2 border-surface-300 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none"
                    maxLength={1}
                  />
                ))}
              </div>

              <div className="text-center text-sm text-secondary/60 dark:text-surface-400 mb-6">
                Hint: Lucky numbers are 7, 3, and 9
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMiniGameSubmit}
                  disabled={miniGameCode.some(d => d === '')}
                  className="flex-1 bg-accent hover:bg-accent/80 disabled:bg-gray-400 text-white py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Unlock
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMiniGame(false)}
                  className="px-6 bg-surface-200 dark:bg-gray-600 hover:bg-surface-300 dark:hover:bg-gray-500 text-secondary dark:text-surface-200 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature