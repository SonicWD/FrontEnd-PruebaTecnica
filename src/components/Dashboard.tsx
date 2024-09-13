'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, Users, UserPlus, UserCheck, LucideIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

type CountUpProps = {
  end: number;
  duration?: number;
}

const CountUp = ({ end, duration = 2 }: CountUpProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      setCount(Math.floor(start))
      if (start >= end) {
        clearInterval(timer)
        setCount(end)
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{count}</span>
}

type StatCardProps = {
  title: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

const StatCard = ({ title, value, color, icon: Icon }: StatCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden relative group`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h2>
          <p className={`text-4xl font-bold ${color}`}>
            <CountUp end={value} />
            {title === 'Clientes Activos' && '%'}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('text', 'bg')} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-5 h-5 text-gray-500" />
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="container mx-auto px-6 py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Gestor de Usuarios
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Gestiona tus clientes de manera eficiente con nuestra plataforma intuitiva y poderosa.
          Optimiza tus operaciones y mejora la satisfacción del cliente.
        </p>
      </motion.div>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="Total de Clientes" value={150} color="text-blue-600" icon={Users} />
        <StatCard title="Clientes Nuevos" value={12} color="text-green-600" icon={UserPlus} />
        <StatCard title="Clientes Activos" value={85} color="text-purple-600" icon={UserCheck} />
      </div>
    </div>
  )
}
