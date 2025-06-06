import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'
import HeaderBranding from '@/components/molecules/HeaderBranding'
import NavigationPill from '@/components/molecules/NavigationPill'
import TreasureHuntFeature from '@/components/organisms/TreasureHuntFeature'

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-100 to-surface-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 parchment-bg"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <HeaderBranding />

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-surface-50 dark:bg-gray-700 shadow-card hover:shadow-soft"
              >
                <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} className="text-secondary dark:text-primary" />
              </Button>

              <Button className="p-2 rounded-xl bg-surface-50 dark:bg-gray-700 shadow-card hover:shadow-soft">
                <Icon name="Settings" size={20} className="text-secondary dark:text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { icon: 'Home', label: 'Home', active: true },
            { icon: 'Play', label: 'New Game' },
            { icon: 'BookOpen', label: 'Instructions' },
            { icon: 'Trophy', label: 'Achievements' },
          ].map((item, index) => (
            <NavigationPill key={item.label} icon={item.icon} label={item.label} active={item.active} />
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <TreasureHuntFeature />
      </main>

      {/* Decorative Compass */}
      <motion.div
        className="fixed bottom-8 right-8 z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-lg flex items-center justify-center">
          <Icon name="Navigation" size={24} className="text-white" />
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Icon
          name="Star"
          size={32}
          className="absolute top-20 left-10 w-8 h-8 text-primary/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Icon
          name="Gem"
          size={24}
          className="absolute top-40 right-20 w-6 h-6 text-accent/20"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <Icon
          name="Compass"
          size={40}
          className="absolute bottom-40 left-20 w-10 h-10 text-secondary/20"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}

export default HomePage