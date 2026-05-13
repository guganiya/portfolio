import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
	.use(LanguageDetector) // Автоопределение языка
	.use(initReactI18next) // Интеграция с React
	.init({
		debug: true,
		fallbackLng: 'ru', // Язык, если перевод не найден
		resources: {
			en: {
				translation: {
					welcome: 'Welcome to React!',
					description: 'This is a bilingual app.',
				},
			},
			ru: {
				translation: {
					welcome: 'Добро пожаловать в React!',
					description: 'Это двуязычное приложение.',
				},
			},
		},
	})

export default i18n
