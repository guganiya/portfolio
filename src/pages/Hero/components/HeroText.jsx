import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const icons = {
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
	telegram: (
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
			<line x1='22' y1='2' x2='11' y2='13'></line>
			<polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
		</svg>
	),
	instagram: (
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
			<rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
			<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
			<line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
		</svg>
	),
}

const HeroText = () => {
	const { t } = useTranslation()
	const [displayText, setDisplayText] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const [loopNum, setLoopNum] = useState(0)
	const [typingSpeed, setTypingSpeed] = useState(150)

	// Получаем массив заголовков из i18n
	const titles = t('hero.titles', { returnObjects: true })

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
	}, [displayText, isDeleting, loopNum, typingSpeed, titles])

	const socialLinks = [
		{
			name: 'github',
			icon: icons.github,
			href: 'https://github.com/CodeAssasinKing',
			color: '#ffffff',
		},
		{
			name: 'Instagram',
			icon: icons.instagram,
			href: 'https://www.instagram.com/codeassasinking/',
			color: '#E1306C',
		},
		{
			name: 'telegram',
			icon: icons.telegram,
			href: 'https://t.me/Worker_000000',
			color: '#0088cc',
		},
	]

	return (
		<div className='flex flex-col items-center md:items-start text-center md:text-left z-10'>
			{/* 1. ПРИВЕТСТВИЕ */}
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
					{t('hero.greeting')}{' '}
					<span className='text-[#d4af37]'>{t('hero.team')}</span>
				</p>
				<motion.span
					animate={{ rotate: [0, 20, 0] }}
					transition={{ repeat: Infinity, duration: 1.5 }}
					className='text-xl'
				>
					👋
				</motion.span>
			</motion.div>

			{/* 2. ЗАГОЛОВОК С ПЕЧАТНЫМ ЭФФЕКТОМ */}
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
				{t('hero.description.part1')}{' '}
				<span className='text-white font-medium italic'>
					{t('hero.description.part2')}
				</span>
				: {t('hero.description.part3')}{' '}
				<span className='text-white font-medium italic'>
					{t('hero.description.part4')}
				</span>
				. {t('hero.description.part5')}{' '}
				<span className='text-[#d4af37] font-semibold tracking-wide'>
					{t('hero.description.part6')}
				</span>{' '}
				— {t('hero.description.part7')}.
			</motion.p>

			{/* 4. СОЦСЕТИ */}
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
						<div
							className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl'
							style={{ backgroundColor: social.color }}
						/>
						<div className='relative z-10 text-zinc-500 group-hover:text-white transition-all duration-300'>
							{social.icon}
						</div>
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
