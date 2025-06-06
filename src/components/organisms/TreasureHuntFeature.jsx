import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import locationService from '@/services/api/locationService'
import treasureService from '@/services/api/treasureService'
import gameStateService from '@/services/api/gameStateService'
import Icon from '@/components/atoms/Icon'
import Card from '@/components/atoms/Card'
import GameControls from '@/components/organisms/GameControls'
import IslandMap from '@/components/organisms/IslandMap'
import SidebarInventory from '@/components/organisms/SidebarInventory'
import HintDisplay from '@/components/molecules/HintDisplay'
import LocationDetailModal from '@/components/organisms/LocationDetailModal'
import MiniGameModal from '@/components/organisms/MiniGameModal'
import Text from '@/components/atoms/Text'

const TreasureHuntFeature = () => {
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
        gameStateService.getAll(),
      ])

      setLocations(locationsData || [])
      setTreasures(treasuresData || [])
      setGameState(
        gameStateData?.[0] || {
          score: 0,
          treasuresFound: [],
          currentLocation: '',
          inventory: [],
          hintsRemaining: 3,
        },
      )
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
        currentLocation: location.id,
      }
      await gameStateService.update(gameState?.id || 'game-1', updatedGameState)
      setGameState(updatedGameState)

      toast.info(`Exploring ${location.name}...`)
    } catch (err) {
      console.error('Error updating location:', err)
    }
  }

  const handleTreasureFound = async (treasureId) => {
    const treasure = treasures.find((t) => t?.id === treasureId)
    if (!treasure || gameState?.treasuresFound?.includes(treasureId)) return

    try {
      const updatedGameState = {
        ...gameState,
        score: (gameState?.score || 0) + (treasure.value || 0),
        treasuresFound: [...(gameState?.treasuresFound || []), treasureId],
        inventory: [...(gameState?.inventory || []), treasure],
      }

      await gameStateService.update(gameState?.id || 'game-1', updatedGameState)
      setGameState(updatedGameState)
      setShowMiniGame(false)
      setSelectedLocation(null)

      toast.success(`🏆 Found ${treasure.name}! +${treasure.value} gold!`)

      // Unlock next location
      const nextLocationIndex = locations.findIndex((l) => !l?.isUnlocked)
      if (nextLocationIndex !== -1) {
        const updatedLocations = [...locations]
        updatedLocations[nextLocationIndex] = {
          ...updatedLocations[nextLocationIndex],
          isUnlocked: true,
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
        hintsRemaining: 3,
      }

      await gameStateService.update('game-1', newGameState)
      setGameState(newGameState)
      setSelectedLocation(null)
      setShowMiniGame(false)
      setMiniGameCode(['', '', ''])

      // Reset locations
      const resetLocations = locations.map((location, index) => ({
        ...location,
        isUnlocked: index === 0, // Only first location unlocked
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
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <Icon name="Loader" size={48} className="text-primary" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
        <Text as="p" className="text-lg text-red-600">
          Error: {error}
        </Text>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Map Area */}
      <div className="lg:col-span-3">
        <Card initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="parchment-bg">
          <GameControls
            score={gameState?.score || 0}
            treasuresFoundCount={gameState?.treasuresFound?.length || 0}
            totalTreasures={treasures.length}
            onResetGame={resetGame}
          />
          <IslandMap locations={locations} gameState={gameState} onLocationClick={handleLocationClick} />
        </Card>
      </div>

      {/* Sidebar - Inventory & Info */}
      <div className="space-y-6">
        <SidebarInventory inventory={gameState?.inventory} />
        <HintDisplay hintsRemaining={gameState?.hintsRemaining || 0} />
      </div>

      <LocationDetailModal
        selectedLocation={selectedLocation}
        onClose={() => setSelectedLocation(null)}
        onSearchTreasure={() => setShowMiniGame(true)}
      />

      <MiniGameModal
        isOpen={showMiniGame}
        onClose={() => setShowMiniGame(false)}
        miniGameCode={miniGameCode}
        updateMiniGameCode={updateMiniGameCode}
        onSubmit={handleMiniGameSubmit}
      />
    </div>
  )
}

export default TreasureHuntFeature