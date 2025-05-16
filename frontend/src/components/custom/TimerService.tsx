import {useEffect, useState, useRef} from 'react'

const formatTime = (value: number) => String(value).padStart(2, '0')

type TimerProps = {
    initialHours?: number
    initialMinutes?: number
    initialSeconds?: number
    start: boolean
    onFinish?: () => void
}

export const TimerService = ({
                                 initialHours = 0,
                                 initialMinutes = 14,
                                 initialSeconds = 32,
                                 start,
                                 onFinish,
                             }: TimerProps) => {
    const [time, setTime] = useState({
        hours: initialHours,
        minutes: initialMinutes,
        seconds: initialSeconds,
    })

    // @ts-ignore
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const finishedRef = useRef(false)

    useEffect(() => {
        if (start && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => {
                    let {hours, minutes, seconds} = prev

                    if (hours === 0 && minutes === 0 && seconds === 0) {
                        if (!finishedRef.current) {
                            onFinish?.()
                            finishedRef.current = true
                        }
                        clearInterval(intervalRef.current!)
                        intervalRef.current = null
                        return prev
                    }

                    if (seconds === 0) {
                        if (minutes === 0) {
                            hours--
                            minutes = 59
                            seconds = 59
                        } else {
                            minutes--
                            seconds = 59
                        }
                    } else {
                        seconds--
                    }

                    return {hours, minutes, seconds}
                })
            }, 1000)
        }

        return () => {
            clearInterval(intervalRef.current!)
            intervalRef.current = null
        }
    }, [start])

    return (
        <div className="main-timer-container">
            <span>{formatTime(time.hours)}</span>:
            <span>{formatTime(time.minutes)}</span>:
            <span>{formatTime(time.seconds)}</span>
        </div>
    )
}
