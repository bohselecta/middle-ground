'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format, subDays } from 'date-fns'

interface FlowPoint {
  t: number
  intensity: number
  label?: string
}

interface FlowGraphProps {
  reflections?: Array<{ mood: string; date: string }>
  frictions?: Array<{ tag: string; date: string }>
}

export default function FlowGraph({ reflections = [], frictions = [] }: FlowGraphProps) {
  const [hoveredPoint, setHoveredPoint] = useState<FlowPoint | null>(null)
  const [flowPoints, setFlowPoints] = useState<FlowPoint[]>([])

  useEffect(() => {
    // Generate sample flow data for the last 7 days
    const points: FlowPoint[] = []
    const now = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = subDays(now, i)
      const dayOfWeek = date.getDay()
      
      // Simulate realistic flow patterns
      let intensity = 0.5
      if (dayOfWeek === 1) intensity = 0.3 // Monday dip
      else if (dayOfWeek === 5) intensity = 0.7 // Friday energy
      else if (dayOfWeek === 0 || dayOfWeek === 6) intensity = 0.2 // Weekend
      else intensity = 0.5 + Math.random() * 0.3 // Weekday variation
      
      // Adjust based on reflections
      const dayReflections = reflections.filter(r => 
        format(new Date(r.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
      if (dayReflections.length > 0) {
        const avgMood = dayReflections.reduce((sum, r) => {
          return sum + (r.mood === 'high' ? 1 : r.mood === 'neutral' ? 0.5 : 0)
        }, 0) / dayReflections.length
        intensity = avgMood
      }
      
      // Adjust based on frictions
      const dayFrictions = frictions.filter(f => 
        format(new Date(f.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
      if (dayFrictions.length > 0) {
        intensity = Math.max(0, intensity - (dayFrictions.length * 0.1))
      }
      
      points.push({
        t: i / 6, // 0 to 1
        intensity: Math.max(0, Math.min(1, intensity)),
        label: `${format(date, 'EEE')} - ${intensity > 0.6 ? 'High energy' : intensity > 0.3 ? 'Steady' : 'Low energy'}`
      })
    }
    
    setFlowPoints(points)
  }, [reflections, frictions])

  // Generate SVG path for the wave
  const generatePath = () => {
    if (flowPoints.length === 0) return ''
    
    const width = 400
    const height = 200
    const padding = 20
    
    const points = flowPoints.map((point, index) => {
      const x = padding + (point.t * (width - 2 * padding))
      const y = padding + ((1 - point.intensity) * (height - 2 * padding))
      return `${x},${y}`
    })
    
    // Create smooth bezier curve
    let path = `M ${points[0]}`
    for (let i = 1; i < points.length; i++) {
      const [x1, y1] = points[i - 1].split(',').map(Number)
      const [x2, y2] = points[i].split(',').map(Number)
      const cp1x = x1 + (x2 - x1) / 3
      const cp1y = y1
      const cp2x = x2 - (x2 - x1) / 3
      const cp2y = y2
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`
    }
    
    return path
  }

  return (
    <div className="relative rounded-2xl bg-fret p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-slate-900">Your Flow Pattern</h3>
        <p className="text-sm text-slate-600">Last 7 days of energy and focus</p>
      </div>
      
      <div className="relative">
        <svg
          width="400"
          height="200"
          viewBox="0 0 400 200"
          className="w-full max-w-full"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(15, 23, 42, 0.1)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ff6b6b" />
            </linearGradient>
          </defs>
          
          <rect width="400" height="200" fill="url(#grid)" />
          
          {/* Flow wave */}
          <motion.path
            d={generatePath()}
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Data points */}
          {flowPoints.map((point, index) => {
            const x = 20 + (point.t * 360)
            const y = 20 + ((1 - point.intensity) * 160)
            
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={point.intensity > 0.6 ? '#4ade80' : point.intensity > 0.3 ? '#f59e0b' : '#ff6b6b'}
                stroke="white"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer"
              />
            )
          })}
        </svg>
        
        {/* Tooltip */}
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg"
          >
            {hoveredPoint.label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-mint" />
          <span>High energy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber" />
          <span>Steady</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-coral" />
          <span>Low energy</span>
        </div>
      </div>
    </div>
  )
}
