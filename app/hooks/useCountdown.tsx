"use client"

import { useState, useEffect } from 'react'

export interface TimeRemaining {
    días: number
    horas: number
    minutos: number
    segundos: number
}

const useCountdown = (targetDate: Date | string | number): TimeRemaining => {
    const calculateTimeLeft = (): TimeRemaining => {
        const target = new Date(targetDate).getTime()
        const now = new Date().getTime()
        const difference = target - now

        if (difference <= 0) {
            return { días: 0, horas: 0, minutos: 0, segundos: 0 }
        }

        return {
            días: Math.floor(difference / (1000 * 60 * 60 * 24)),
            horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutos: Math.floor((difference / 1000 / 60) % 60),
            segundos: Math.floor((difference / 1000) % 60),
        }
    }

    const emptyTime: TimeRemaining = { días: 0, horas: 0, minutos: 0, segundos: 0 }
    const [timeLeft, setTimeLeft] = useState<TimeRemaining>(emptyTime)

    useEffect(() => {
        setTimeLeft(calculateTimeLeft())

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return timeLeft
}

export default useCountdown;