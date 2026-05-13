'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// SVG Иконки в едином стиле
const icons = {
	github: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='22'
			height='22'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
			<path d='M9 18c-4.51 2-5-2-7-2' />
		</svg>
	),
	linkedin: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='22'
			height='22'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
			<rect x='2' y='9' width='4' height='12'></rect>
			<circle cx='4' cy='4' r='2'></circle>
		</svg>
	),
	globe: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='22'
			height='22'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<circle cx='12' cy='12' r='10'></circle>
			<line x1='2' y1='12' x2='22' y2='12'></line>
			<path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'></path>
		</svg>
	),
}

const ProfileCard = ({ title, photo, links, isBack = false }) => (
	<div
		className={`absolute inset-0 w-full h-full p-8 flex flex-col items-center justify-between rounded-[3rem] border border-white/20 backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 shadow-2xl ${
			isBack ? '[transform:rotateY(180deg)]' : ''
		}`}
		style={{
			backfaceVisibility: 'hidden',
			WebkitBackfaceVisibility: 'hidden',
			transformStyle: 'preserve-3d',
		}}
	>
		{/* Внутреннее свечение (Rim light) */}
		<div className='absolute inset-px rounded-[3rem] border border-white/10 pointer-events-none' />

		{/* Заголовок */}
		<motion.div style={{ translateZ: 60 }} className='text-center'>
			<h3 className='text-sm font-medium text-[#d4af37] uppercase tracking-[0.3em] mb-1'>
				Profile
			</h3>
			<h2 className='text-2xl font-bold text-white tracking-tight leading-none uppercase italic'>
				{title}
			</h2>
		</motion.div>

		{/* Фото */}
		<motion.div style={{ translateZ: 100 }} className='relative group/img'>
			<div className='absolute -inset-4 bg-[#d4af37]/10 rounded-full blur-2xl group-hover/img:bg-[#d4af37]/20 transition-all duration-500' />
			<div className='relative w-44 h-44 md:w-52 md:h-52 rounded-full border-[6px] border-white/10 overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover/img:scale-105'>
				<img
					src={photo}
					alt={title}
					className='w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700'
				/>
			</div>
		</motion.div>

		{/* Иконки-ссылки в новом стиле */}
		<motion.div style={{ translateZ: 80 }} className='flex gap-4 items-center'>
			{links.map((link, index) => (
				<motion.a
					key={index}
					href={link.url}
					target='_blank'
					rel='noopener noreferrer'
					whileHover={{ y: -5, scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className='group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 overflow-hidden'
				>
					{/* Свечение фона при ховере */}
					<div
						className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300'
						style={{ backgroundColor: link.color }}
					/>

					{/* Иконка */}
					<div className='relative z-10 text-zinc-400 group-hover:text-white transition-colors duration-300'>
						{link.icon}
					</div>

					{/* Точка-индикатор снизу */}
					<div
						className='absolute bottom-1.5 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'
						style={{
							backgroundColor: link.color,
							boxShadow: `0 0 8px ${link.color}`,
						}}
					/>
				</motion.a>
			))}
		</motion.div>
	</div>
)

const InteractiveHeroCard = () => {
	const [isFlipped, setIsFlipped] = useState(false)
	const cardRef = useRef(null)

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
	const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])

	const handleMouseMove = e => {
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		x.set((e.clientX - rect.left) / rect.width - 0.5)
		y.set((e.clientY - rect.top) / rect.height - 0.5)
	}

	const handleMouseLeave = () => {
		x.set(0)
		y.set(0)
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setIsFlipped(prev => !prev)
		}, 5000)
		return () => clearInterval(timer)
	}, [])

	// Данные с цветами для иконок
	const frontendData = {
		title: 'Frontend Dev',
		photo:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
		links: [
			{ icon: icons.github, url: '#', color: '#ffffff' },
			{ icon: icons.linkedin, url: '#', color: '#0077b5' },
			{ icon: icons.globe, url: '#', color: '#d4af37' },
		],
	}

	const fullstackData = {
		title: 'Fullstack Dev',
		photo:
			'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
		links: [
			{ icon: icons.github, url: '#', color: '#ffffff' },
			{ icon: icons.globe, url: '#', color: '#d4af37' },
		],
	}

	return (
		<div className='w-full min-h-[700px] flex items-center justify-center bg-transparent perspective-1000'>
			<motion.div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{
					rotateX,
					rotateY,
					transformStyle: 'preserve-3d',
				}}
				animate={{ y: [0, -20, 0] }}
				transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
				className='relative w-[340px] h-[500px] md:w-[400px] md:h-[560px] '
			>
				<motion.div
					className='w-full h-full relative'
					style={{ transformStyle: 'preserve-3d' }}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
				>
					<ProfileCard {...frontendData} />
					<ProfileCard {...fullstackData} isBack />
				</motion.div>
			</motion.div>
		</div>
	)
}

export default InteractiveHeroCard
