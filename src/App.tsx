import React, { useState, useEffect } from 'react'
import { Heart, Sun, Moon, Star, Sparkles } from 'lucide-react'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Animation d'entrée
    setTimeout(() => setIsVisible(true), 100)

    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return { text: 'Bonjour', icon: Sun, color: 'text-amber-500' }
    if (hour < 18) return { text: 'Bon après-midi', icon: Sun, color: 'text-orange-500' }
    return { text: 'Bonsoir', icon: Moon, color: 'text-indigo-400' }
  }

  const greeting = getGreeting()
  const GreetingIcon = greeting.icon

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Étoiles animées en arrière-plan */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            className={`absolute text-white opacity-20 animate-pulse`}
            size={Math.random() * 8 + 4}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Contenu principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className={`text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Icône principale avec animation */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-xl scale-150 animate-pulse" />
            <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-8 border border-white/30 shadow-2xl">
              <GreetingIcon className={`w-16 h-16 mx-auto ${greeting.color} animate-bounce`} />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" />
            <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-pink-300 animate-ping" />
          </div>

          {/* Message de salutation */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
              {greeting.text}
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
            Bienvenue sur cette magnifique journée
          </p>

          {/* Horloge en temps réel */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl mb-8 max-w-md mx-auto">
            <div className="text-3xl md:text-4xl font-mono text-white mb-2 tracking-wider">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-white/70 capitalize">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Message personnalisé */}
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg max-w-lg mx-auto">
            <Heart className="w-6 h-6 text-pink-400 mx-auto mb-3 animate-pulse" />
            <p className="text-white/90 text-lg leading-relaxed">
              Que cette journée vous apporte joie, bonheur et de merveilleux moments à partager
            </p>
          </div>

          {/* Bouton interactif */}
          <button 
            onClick={() => setIsVisible(false)}
            onAnimationEnd={() => setTimeout(() => setIsVisible(true), 100)}
            className="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-white/20"
          >
            ✨ Dire bonjour à nouveau
          </button>
        </div>
      </div>

      {/* Image de fond subtile */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}

export default App
