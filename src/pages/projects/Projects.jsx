'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import ReactLenis from 'lenis/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const projects = [
	{
		title: 'MAVA Logistics',
		description:
			'Этот сайт создан для крупной логистической компании MAVA. Мы разработали платформу для оптимизации цепочек поставок и управления глобальными грузоперевозками.',
		src: '/project/mava/global-logistics-transportation-network.jpg',
		logo: '/project/mava/logo.png',
		link: '/projects/mava',
		color: '#1a1a1a',
	},
	{
		title: 'Owaz',
		description:
			'Этот сайт создан для маркетплейса музыкального оборудования Owaz. Мы реализовали удобный интерфейс для выбора и покупки профессиональной аудиоаппаратуры и инструментов.',
		src: '/project/owaz/acoustic-guitar-musical-keys-white-background-flat-lay (1).jpg',
		logo: '/project/owaz/logo.png',
		link: '/projects/owaz',
		color: '#262626',
	},
	{
		title: 'Alyx',
		description:
			'Этот сайт создан для платформы Alyx, посвященной профессиональному световому оборудованию. Мы разработали интерактивный каталог и информационный ресурс для подбора световых решений любого масштаба.',
		src: '/project/alyx/world-theatre-day-celebration.jpg',
		logo: '/project/alyx/LOGO-ALYX-WIHT.png',
		link: '/projects/alyx',
		color: '#333333',
	},
]

const StickyCard = ({
	i,
	title,
	description,
	src,
	logo,
	link,
	progress,
	range,
	targetScale,
}) => {
	const container = useRef(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'end start'],
	})

	const scale = useTransform(progress, range, [1, targetScale])
	const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50])

	return (
		<div
			ref={container}
			className='sticky top-0 flex items-center justify-center px-4 h-[70vh] md:h-screen'
		>
			<motion.div
				style={{
					scale,
					backgroundColor: projects[i].color,
					top: `calc(10vh + ${i * 25}px)`,
				}}
				className='relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 h-[420px] w-full max-w-[1200px] md:h-[500px] lg:h-[600px] group shadow-[0_-20px_50px_rgba(0,0,0,0.5)]'
			>
				<a href={link} className='absolute inset-0 z-20' />

				<div className='absolute inset-0 overflow-hidden'>
					<motion.img
						style={{ y: imageY }}
						src={src}
						alt={title}
						className='h-[120%] w-full object-cover opacity-50 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/20' />
				</div>

				<div className='relative h-full w-full flex flex-col md:flex-row items-end md:items-center p-8 md:p-16 z-10'>
					<div className='flex-1 text-left'>
						<div className='w-16 h-16 md:w-28 md:h-28 mb-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4'>
							<img
								src={logo}
								alt='logo'
								className='w-full h-full object-contain'
							/>
						</div>
						<h3 className='text-white text-4xl md:text-7xl font-bold tracking-tighter leading-[0.8] mb-4 uppercase'>
							{title}
						</h3>
						<p className='text-zinc-300 text-lg md:text-xl max-w-md font-light opacity-80'>
							{description}
						</p>
					</div>

					<div className='mt-4 md:mt-0'>
						<div
							className='
    w-12 h-12 md:w-16 md:h-16 
    rounded-full border border-white/30 
    flex items-center justify-center 
    text-white text-xl md:text-2xl 
    group-hover:bg-white group-hover:text-black 
    transition-all duration-500 transform 
    group-hover:rotate-45
  '
						>
							↗
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export const Projects = () => {
	const { t } = useTranslation()
	const container = useRef(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	})

	const worksX = useTransform(scrollYProgress, [0, 1], [0, -300])

	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
			<section ref={container} className='relative text-white pb-20'>
				{/* Секция заголовка (с исправленным расстоянием для мобилок) */}
				<div className='relative h-[30vh] md:h-[60vh] flex flex-col justify-center overflow-hidden px-4 max-w-[1400px] mx-auto'>
					<motion.div
						style={{ x: worksX }}
						className='absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] lg:text-[15rem] font-black text-white/[0.03] whitespace-nowrap pointer-events-none z-0 select-none uppercase'
					>
						{t('projects.bg_text')}
					</motion.div>

					<div className='relative z-10 border-l-4 border-[#d4af37] pl-8'>
						<motion.h1
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							className='text-5xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter'
						>
							{t('projects.title_main')} <br />{' '}
							<span className='text-zinc-700'>
								{t('projects.title_accent')}
							</span>
						</motion.h1>
					</div>
				</div>

				{/* Список карт */}
				<div className='relative flex flex-col gap-0'>
					{projects.map((project, i) => {
						const targetScale = 1 - (projects.length - i) * 0.05

						// Определяем ключ для перевода (mava или owaz)
						// Мы берем title из объекта и приводим к нижнему регистру,
						// чтобы он совпал с ключом в JSON (например, "Owaz" -> "owaz")
						const projectKey = project.title.toLowerCase().split(' ')[0]

						return (
							<StickyCard
								key={`p_${i}`}
								i={i}
								/* Теперь данные будут браться динамически */
								title={t(`projects.${projectKey}.title`)}
								description={t(`projects.${projectKey}.description`)}
								src={project.src}
								logo={project.logo}
								link={project.link}
								progress={scrollYProgress}
								range={[i * 0.25, 1]}
								targetScale={targetScale}
							/>
						)
					})}
				</div>
				{/* Финальная кнопка */}
				<div className='h-[40vh] md:h-[60vh] flex items-center justify-center relative overflow-hidden'>
					{/* Уменьшил размер фонового свечения для мобилок */}
					<div className='absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#d4af37]/10 rounded-full blur-[80px] md:blur-[120px]' />

					<motion.div
						initial={{ y: 50, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						className='text-center z-10 px-4'
					>
						{/* Уменьшил текст заголовка: text-3xl на мобилке, 7xl на десктопе */}
						<h2 className='text-3xl md:text-7xl font-black mb-6 md:mb-12 tracking-tighter text-white uppercase italic leading-tight'>
							{t('projects.cta_title')}
						</h2>

						<Link
							to='/contact'
							/* Уменьшил padding: px-8 py-4 на мобилке, px-12 py-6 на десктопе */
							className='relative inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-12 md:py-6 border-2 border-[#d4af37] text-[#d4af37] rounded-full text-lg md:text-xl font-bold hover:bg-[#d4af37] hover:text-black transition-all duration-500 group overflow-hidden'
						>
							<span className='relative z-10 uppercase'>
								{t('projects.cta_button')}
							</span>
							<span className='relative z-10 group-hover:translate-x-2 transition-transform duration-300'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									/* Уменьшил размер иконки на мобилке */
									className='w-5 h-5 md:w-6 md:h-6'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<line x1='5' y1='12' x2='19' y2='12'></line>
									<polyline points='12 5 19 12 12 19'></polyline>
								</svg>
							</span>
							<div className='absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10' />
							<div className='absolute inset-0 rounded-full bg-[#d4af37]/0 group-hover:bg-[#d4af37]/20 blur-xl transition-all duration-500 -z-20' />
						</Link>
					</motion.div>
				</div>
			</section>
		</ReactLenis>
	)
}
