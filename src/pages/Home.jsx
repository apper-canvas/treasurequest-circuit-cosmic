import { useState, useEffect } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = () => {
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
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <ApperIcon name="Map" className="text-primary w-12 h-12" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-heading text-secondary-dark dark:text-primary">
                  TreasureQuest
                </h1>
                <p className="text-secondary dark:text-surface-300 text-sm">
                  Embark on the Ultimate Adventure
                </p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-surface-50 dark:bg-gray-700 shadow-card hover:shadow-soft transition-all duration-300"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  size={20} 
                  className="text-secondary dark:text-primary"
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-surface-50 dark:bg-gray-700 shadow-card hover:shadow-soft transition-all duration-300"
              >
                <ApperIcon name="Settings" size={20} className="text-secondary dark:text-primary" />
              </motion.button>
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
            { icon: "Home", label: "Home", active: true },
            { icon: "Play", label: "New Game" },
            { icon: "BookOpen", label: "Instructions" },
            { icon: "Trophy", label: "Achievements" },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl shadow-card transition-all duration-300 ${
                item.active 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-700 text-secondary dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-gray-600'
              }`}
            >
              <ApperIcon name={item.icon} size={18} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <MainFeature />
      </main>

      {/* Decorative Compass */}
      <motion.div 
        className="fixed bottom-8 right-8 z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-lg flex items-center justify-center">
          <ApperIcon name="Navigation" size={24} className="text-white" />
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-8 h-8 text-primary/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ApperIcon name="Star" size={32} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 text-accent/20"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <ApperIcon name="Gem" size={24} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 w-10 h-10 text-secondary/20"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Compass" size={40} />
        </motion.div>
      </div>
    </div>
  )
}

export default Home