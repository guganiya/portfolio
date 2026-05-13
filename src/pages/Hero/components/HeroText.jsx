import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const icons = {
	linkedin: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
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
	whatsapp: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
		</svg>
	),
	tiktok: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5'></path>
		</svg>
	),
	github: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
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
}

const HeroText = () => {
	const [displayText, setDisplayText] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const [loopNum, setLoopNum] = useState(0)
	const [typingSpeed, setTypingSpeed] = useState(150)

	const titles = ['Web Developers', 'Front-end', 'Full-stack']

	useEffect(() => {
		const handleTyping = () => {
			const i = loopNum % titles.length
			const fullText = titles[i]

			if (isDeleting) {
				setDisplayText(fullText.substring(0, displayText.length - 1))
				setTypingSpeed(50)
			} else {
				setDisplayText(fullText.substring(0, displayText.length + 1))
				setTypingSpeed(150)
			}

			if (!isDeleting && displayText === fullText) {
				setTimeout(() => setIsDeleting(true), 2000)
			} else if (isDeleting && displayText === '') {
				setIsDeleting(false)
				setLoopNum(loopNum + 1)
				setTypingSpeed(500)
			}
		}

		const timer = setTimeout(handleTyping, typingSpeed)
		return () => clearTimeout(timer)
	}, [displayText, isDeleting, loopNum, typingSpeed])

	const socialLinks = [
		{ name: 'linkedin', icon: icons.linkedin, href: '#', color: '#0077b5' },
		{ name: 'whatsapp', icon: icons.whatsapp, href: '#', color: '#25d366' },
		{ name: 'tiktok', icon: icons.tiktok, href: '#', color: '#ff0050' },
		{ name: 'github', icon: icons.github, href: '#', color: '#ffffff' },
	]

	return (
		<div className='flex flex-col items-center md:items-start text-center md:text-left z-10'>
			{/* 1. ПРИВЕТСТВИЕ С ИНДИКАТОРОМ */}
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8 }}
				className='inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6'
			>
				<span className='relative flex h-3 w-3'>
					<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75'></span>
					<span className='relative inline-flex rounded-full h-3 w-3 bg-[#d4af37]'></span>
				</span>
				<p className='text-zinc-200 text-sm md:text-base font-medium tracking-wide uppercase'>
					Привет, мы{' '}
					<span className='text-[#d4af37]'>команда разработчиков</span>
				</p>
				<motion.span
					animate={{ rotate: [0, 20, 0] }}
					transition={{ repeat: Infinity, duration: 1.5 }}
					className='text-xl'
				>
					👋
				</motion.span>
			</motion.div>

			{/* 2. КОНСОЛЬНЫЙ ЗАГОЛОВОК */}
			<div className='h-[100px] md:h-[140px] flex items-center'>
				<h1 className='text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter text-white uppercase italic'>
					{displayText}
					<span className='text-[#d4af37] animate-[pulse_0.8s_infinite] ml-1'>
						_
					</span>
				</h1>
			</div>

			{/* 3. ОПИСАНИЕ */}
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4, duration: 0.8 }}
				className='text-zinc-400 text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed font-light'
			>
				Воплощаем в код{' '}
				<span className='text-white font-medium italic'>любые идеи</span>: от
				высоконагруженных систем до{' '}
				<span className='text-white font-medium italic'>имиджевых сайтов</span>.
				Если это можно{' '}
				<span className='text-[#d4af37] font-semibold tracking-wide'>
					открыть в браузере
				</span>{' '}
				— мы это уже создаем.
			</motion.p>

			{/* 4. СОЦСЕТИ (GLASSMORPHISM) */}
			<div className='flex items-center gap-5 pt-6'>
				{socialLinks.map((social, idx) => (
					<motion.a
						key={social.name}
						href={social.href}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 + idx * 0.1 }}
						whileHover={{ scale: 1.1, y: -5 }}
						whileTap={{ scale: 0.9 }}
						className='group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300'
					>
						{/* Свечение фона при ховере */}
						<div
							className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl'
							style={{ backgroundColor: social.color }}
						/>

						{/* Иконка */}
						<div
							className='relative z-10 text-zinc-500 group-hover:text-white transition-all duration-300'
							style={{ filter: `drop-shadow(0 0 10px ${social.color}00)` }}
						>
							<span className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all'>
								{social.icon}
							</span>
						</div>

						{/* Точка-индикатор снизу */}
						<div
							className='absolute bottom-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'
							style={{
								backgroundColor: social.color,
								boxShadow: `0 0 10px ${social.color}`,
							}}
						/>
					</motion.a>
				))}
			</div>
		</div>
	)
}

export default HeroText
