'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import ReactLenis from 'lenis/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const projects = [
	{
		title: 'Архитектурные решения',
		description:
			'Проектирование современных зданий с учетом экологических норм.',
		src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
		logo: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg', // Заменил на реальный svg для примера
		link: '#',
		color: '#1a1a1a',
	},
	{
		title: 'Цифровой минимализм',
		description: 'Разработка интерфейсов, которые не отвлекают от главного.',
		src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
		logo: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
		link: '#',
		color: '#262626',
	},
	{
		title: 'Дизайн интерьера',
		description: 'Создание уюта через инновационные материалы.',
		src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
		logo: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg',
		link: '#',
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

	// Улучшенный скейл и параллакс для картинки
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'end start'],
	})

	const scale = useTransform(progress, range, [1, targetScale])
	const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]) // Параллакс изображения

	return (
		<div
			ref={container}
			className='sticky top-0 flex items-center justify-center px-4 h-screen'
		>
			<motion.div
				style={{
					scale,
					backgroundColor: projects[i].color,
					top: `calc(-5vh + ${i * 40}px)`, // Уменьшил шаг наложения карт
				}}
				className='relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 h-[450px] w-[95vw] md:h-[500px] md:w-[90vw] lg:h-[600px] lg:w-[1200px] group shadow-[0_-20px_50px_rgba(0,0,0,0.5)]'
			>
				<a href={link} className='absolute inset-0 z-20' />

				{/* Изображение с параллаксом */}
				<div className='absolute inset-0 overflow-hidden'>
					<motion.img
						style={{ y: imageY }}
						src={src}
						alt={title}
						className='h-[120%] w-full object-cover opacity-50 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/20' />
				</div>

				{/* Контент */}
				<div className='relative h-full w-full flex flex-col md:flex-row items-end md:items-center p-8 md:p-16 z-10'>
					<div className='flex-1'>
						<div className='w-16 h-16 md:w-24 md:h-24 mb-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4'>
							<img
								src={logo}
								alt='logo'
								className='w-full h-full object-contain'
							/>
						</div>
						<h3 className='text-white text-4xl md:text-7xl font-bold tracking-tighter leading-[0.8] mb-4'>
							{title}
						</h3>
						<p className='text-zinc-300 text-lg md:text-xl max-w-md font-light opacity-80'>
							{description}
						</p>
					</div>

					<div className='mt-6 md:mt-0'>
						<div className='w-16 h-16 rounded-full border border-white/30 flex items-center justify-center text-white text-2xl group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-45'>
							↗
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export const Projects = () => {
	const container = useRef(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	})

	// Параллакс для фонового текста WORKS
	const worksX = useTransform(scrollYProgress, [0, 1], [0, -300])

	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
			<section ref={container} className='relative  text-white'>
				{/* Хедер секции */}
				{/* Хедер секции */}
				<div className='pt-20 px-4 max-w-[1400px] mx-auto relative h-[80vh] flex flex-col justify-center overflow-hidden'>
					{/* ^^^ ДОБАВЛЕНО overflow-hidden: это убьет горизонтальный скролл */}

					<motion.div
						style={{ x: worksX }}
						className='
      absolute top-1/2 left-0 -translate-y-1/2 
      /* Используем адаптивный размер шрифта: 20vw на мобилках, 15vw на десктопе */
      text-[20vw] lg:text-[10rem] 
      font-black text-white/[0.03] 
      whitespace-nowrap 
      pointer-events-none 
      z-0
      select-none
    '
					>
						SELECTED WORKS
					</motion.div>

					<div className='relative z-10 border-l-4 border-[#d4af37] pl-8'>
						<motion.h1
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							className='text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-none tracking-tighter'
						>
							Наши <br /> <span className='text-zinc-600'>Проекты</span>
						</motion.h1>
						{/* ... остальной текст */}
					</div>
				</div>

				{/* Список карт */}
				<div className='relative'>
					{projects.map((project, i) => {
						const targetScale = 1 - (projects.length - i) * 0.05
						return (
							<StickyCard
								key={`p_${i}`}
								i={i}
								{...project}
								progress={scrollYProgress}
								range={[i * 0.25, 1]}
								targetScale={targetScale}
							/>
						)
					})}
				</div>

				{/* Финальная кнопка */}
				<div className='h-screen flex items-center justify-center relative overflow-hidden'>
					{/* Декоративный элемент под кнопкой */}
					<div className='absolute w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px]' />

					<motion.div
						initial={{ y: 100, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						className='text-center z-10'
					>
						<h2 className='text-5xl md:text-7xl font-black mb-12 tracking-tighter text-white uppercase italic'>
							ХОТИТЕ ТАК ЖЕ?
						</h2>

						<Link
							to='/contact' // Путь к твоей странице контактов
							className='relative inline-flex items-center gap-4 px-12 py-6 border-2 border-[#d4af37] text-[#d4af37] rounded-full text-xl font-bold hover:bg-[#d4af37] hover:text-black transition-all duration-500 group overflow-hidden'
						>
							{/* Контент кнопки */}
							<span className='relative z-10'>ОБСУДИТЬ ПРОЕКТ</span>

							<span className='relative z-10 group-hover:translate-x-2 transition-transform duration-300'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
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

							{/* Фоновое свечение при ховере (в стиле твоих карточек) */}
							<div className='absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-all duration-500 -z-0' />

							{/* Внешний "нимб" свечения */}
							<div className='absolute inset-0 rounded-full bg-[#d4af37]/0 group-hover:bg-[#d4af37]/20 blur-xl transition-all duration-500 -z-10' />
						</Link>
					</motion.div>
				</div>
			</section>
		</ReactLenis>
	)
}
