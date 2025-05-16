import {useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {Notyf} from "notyf";

mapboxgl.accessToken = 'pk.eyJ1IjoiYXRvbTFjcyIsImEiOiJjbWFhY3F5cjAxcjJ0MnFxdTJoN2NvcTQ0In0.UMrqKJO6YwDkvpbPozx90w'

export const MapContainer = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [location, setLocation] = useState<[number, number] | null>(null)
    const notyf = new Notyf()
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {longitude, latitude} = position.coords
                setLocation([longitude, latitude])
            },
            (err) => {
                console.log(err)
                notyf.error(`Error[GEO]: ${err.message}`)
            }
        )
    }, [])
    useEffect(() => {
        if (!mapContainer.current || map.current || !location) return

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/light-v10',
            center: location ? location : undefined,
            zoom: 12,
        })
        if (location) {
            const el = document.createElement('div')
            el.className = 'custom-marker'
            new mapboxgl.Marker({element: el})
                .setLngLat({lng: location[0], lat: location[1]}) // ✅ формат явно объектом
                .addTo(map.current)
        }
    }, [location])

    return <div ref={mapContainer} style={{width: '100%', height: '700px'}}/>
}
