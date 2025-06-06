import LocationMarker from '@/components/molecules/LocationMarker'

const IslandMap = ({ locations, gameState, onLocationClick }) => {
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

  return (
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
        const position = positions[index] || { top: '50%', left: '50%' }
        const isFound = gameState?.treasuresFound?.includes(location?.treasureId)

        return (
          <LocationMarker
            key={location?.id || index}
            location={location}
            index={index}
            onClick={onLocationClick}
            isFound={isFound}
            position={position}
          />
        )
      })}
    </div>
  )
}

export default IslandMap