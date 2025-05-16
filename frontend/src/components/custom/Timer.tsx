import {useEffect, useState} from 'react'

const formatTime = (value: number) => String(value).padStart(2, '0')

export const Timer = ({initialHours = 0, initialMinutes = 14, initialSeconds = 32}) => {
    const [time, setTime] = useState({
        hours: initialHours,
        minutes: initialMinutes,
        seconds: initialSeconds,
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                let {hours, minutes, seconds} = prev

                if (hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(timer)
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

        return () => clearInterval(timer)
    }, [])

    return (
        <div className={'main-timer-container'}>
            <span>{formatTime(time.hours)}</span>:<span>{formatTime(time.minutes)}</span>:<span>{formatTime(time.seconds)}</span>
        </div>
    )
}
