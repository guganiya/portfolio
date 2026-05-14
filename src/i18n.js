import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		fallbackLng: 'ru',
		supportedLngs: ['ru', 'en'],

		resources: {
			en: {
				translation: {
					//navbar
					common: { logo: 'Portfolio.', logo_text: 'Portfolio' },
					nav: {
						home: 'Home',
						languages: 'Languages',
						projects: 'Projects',
						contact: 'Contact',
					},

					//footer
					footer: {
						rights: 'ALL RIGHTS RESERVED',
						motto_start: 'Code with',
						motto_end: 'Passion',
					},

					//hero-text
					hero: {
						greeting: 'Hi, we are',
						team: 'developer team',
						titles: ['Web Developers', 'Front-end', 'Full-stack'],
						description: {
							part1: 'We bring',
							part2: 'any ideas',
							part3: 'to life: from high-load systems to',
							part4: 'brand websites',
							part5: 'If it can be',
							part6: 'opened in a browser',
							part7: 'we are already creating it',
						},
					},

					//hero-card
					cards: {
						profile_label: 'Profile',
						frontend: {
							name: 'Frontend Dev',
						},
						fullstack: {
							name: 'Fullstack Dev',
						},
					},

					//contact
					contact: {
						title_1: "Let's",
						title_accent: 'Create',
						title_2: 'Together',
						description:
							'Have an idea or a project? Leave a request, and we will discuss how to bring it to life at the highest level.',
						email_label: 'Email us',
						location_label: 'Our office',
						location_value: '10 Example St, Moscow',
						success_title: 'Thank you!',
						success_msg:
							'We have received your message and will get back to you soon.',
						send_again: 'Send again',
						form: {
							name: 'Name',
							name_placeholder: 'John',
							email: 'Email',
							subject: 'Subject',
							subject_placeholder: 'Website development',
							message: 'Message',
							message_placeholder: 'Tell us about your project...',
							submit: 'Send Request',
							sending: 'Sending...',
						},
					},

					//project
					projects: {
						title_main: 'Our',
						title_accent: 'Projects',
						bg_text: 'Our Projects',
						cta_title: 'WANT THE SAME?',
						cta_button: 'Discuss a project',
						mava: {
							title: 'MAVA Logistics',
							description:
								'This website was created for MAVA, a major logistics company. We developed a platform for supply chain optimization and global freight management.',
						},
					},
				},
			},
			ru: {
				translation: {
					//navbar
					common: { logo: 'Portfolio.', logo_text: 'Portfolio' },
					nav: {
						home: 'Главная',
						languages: 'Языки',
						projects: 'Проекты',
						contact: 'Контакты',
					},

					//footer
					footer: {
						rights: 'ВСЕ ПРАВА ЗАЩИЩЕНЫ',
						motto_start: 'Программируйте',
						motto_end: 'с энтузиазмом',
					},

					//hero-text
					hero: {
						greeting: 'Привет, мы',
						team: 'команда разработчиков',
						titles: ['Web Developers', 'Front-end', 'Full-stack'],
						description: {
							part1: 'Воплощаем в код',
							part2: 'любые идеи',
							part3: 'от высоконагруженных систем до',
							part4: 'имиджевых сайтов',
							part5: 'Если это можно',
							part6: 'открыть в браузере',
							part7: 'мы это уже создаем',
						},
					},

					//hero-card
					cards: {
						profile_label: 'Профиль',
						frontend: {
							name: 'Frontend Разработчик',
						},
						fullstack: {
							name: 'Fullstack Разработчик',
						},
					},

					//contact
					contact: {
						title_1: 'Давайте',
						title_accent: 'Создавать',
						title_2: 'Вместе',
						description:
							'Есть идея или проект? Оставьте заявку, и мы обсудим, как воплотить это в жизнь на высшем уровне.',
						email_label: 'Напишите нам',
						location_label: 'Наш офис',
						location_value: 'г. Москва, ул. Примерная 10',
						success_title: 'Спасибо!',
						success_msg:
							'Мы получили ваше сообщение и ответим в ближайшее время.',
						send_again: 'Отправить еще раз',
						form: {
							name: 'Имя',
							name_placeholder: 'Иван',
							email: 'Email',
							subject: 'Тема',
							subject_placeholder: 'Разработка сайта',
							message: 'Сообщение',
							message_placeholder: 'Расскажите о вашем проекте...',
							submit: 'Отправить запрос',
							sending: 'Отправка...',
						},
					},

					//project
					projects: {
						title_main: 'Наши',
						title_accent: 'Проекты',
						bg_text: 'Наши Проекты',
						cta_title: 'ХОТИТЕ ТАК ЖЕ?',
						cta_button: 'Обсудить проект',
						mava: {
							title: 'MAVA Logistics',
							description:
								'Этот сайт создан для крупной логистической компании MAVA. Мы разработали платформу для оптимизации цепочек поставок и управления глобальными грузоперевозками.',
						},
					},
				},
			},
		},

		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'cookie', 'navigator'],
			caches: ['localStorage'],
		},
	})

export default i18n
