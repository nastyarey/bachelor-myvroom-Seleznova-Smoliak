import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const locales = import.meta.glob('./locales/*.json', { eager: true }) as Record<string, { default: any }>

const resources: any = {}

for (const path in locales) {
    const matched = path.match(/\.\/locales\/(\w+)\.json$/)
    if (matched) {
        const lang = matched[1]
        resources[lang] = {
            translation: locales[path].default,
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('locale') || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
