'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const icons = {
	github: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
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
			width='20'
			height='20'
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
			width='20'
			height='20'
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
	chevronDown: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='14'
			height='14'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='3'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m6 9 6 6 6-6' />
		</svg>
	),
}

const Navbar = () => {
	const { t, i18n } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const [langOpen, setLangOpen] = useState(false)
	const location = useLocation()
	const langRef = useRef(null)

	const currentLang = i18n.language.toUpperCase()

	const changeLanguage = lng => {
		i18n.changeLanguage(lng.toLowerCase())
		setLangOpen(false)
		setIsOpen(false)
	}

	useEffect(() => {
		const handleClickOutside = event => {
			if (langRef.current && !langRef.current.contains(event.target)) {
				setLangOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset'
	}, [isOpen])

	const navLinks = [
		{ name: t('nav.home'), to: 'hero', type: 'scroll' },
		{ name: t('nav.projects'), to: 'projects', type: 'scroll' },
		{ name: t('nav.contact'), to: '/contact', type: 'router' },
	]

	const languages = [
		{ code: 'RU', label: 'Русский' },
		{ code: 'EN', label: 'English' },
	]

	const socialLinks = [
		{
			name: 'Github',
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
			name: 'Telegram',
			icon: icons.telegram,
			href: 'https://t.me/Worker_000000',
			color: '#0088cc',
		},
	]

	return (
		<nav className='fixed w-full z-[100] bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5'>
			<div className='max-w-7xl mx-auto px-6 lg:px-10'>
				<div className='flex items-center justify-between h-24'>
					{/* LOGO */}
					<div className='flex-shrink-0 z-[110]'>
						<RouterLink to='/' onClick={() => setIsOpen(false)}>
							<span className='text-3xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-[#d4af37] bg-clip-text text-transparent cursor-pointer uppercase'>
								{t('common.logo')}
							</span>
						</RouterLink>
					</div>

					{/* DESKTOP NAV */}
					<div className='hidden md:flex items-center justify-center flex-1'>
						<div className='flex space-x-10 items-center'>
							{navLinks.map((link, idx) =>
								link.type === 'scroll' && location.pathname === '/' ? (
									<ScrollLink
										key={idx}
										to={link.to}
										smooth={true}
										duration={500}
										offset={-90}
										className='relative group cursor-pointer text-l font-bold text-zinc-400 hover:text-white transition-colors py-2'
									>
										{link.name}
										<span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full' />
									</ScrollLink>
								) : (
									<RouterLink
										key={idx}
										to={link.type === 'scroll' ? `/#${link.to}` : link.to}
										className='relative group cursor-pointer text-l font-bold text-zinc-400 hover:text-white transition-colors py-2'
									>
										{link.name}
										<span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full' />
									</RouterLink>
								),
							)}

							{/* DESKTOP LANG */}
							<div className='relative' ref={langRef}>
								<button
									onClick={() => setLangOpen(!langOpen)}
									className='flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors py-2 uppercase tracking-widest'
								>
									{currentLang}
									<motion.div animate={{ rotate: langOpen ? 180 : 0 }}>
										{icons.chevronDown}
									</motion.div>
								</button>
								<AnimatePresence>
									{langOpen && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											className='absolute right-0 mt-2 w-32 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl'
										>
											{languages.map(lang => (
												<button
													key={lang.code}
													onClick={() => changeLanguage(lang.code)}
													className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${currentLang === lang.code ? 'text-[#d4af37]' : 'text-zinc-400 hover:text-white'}`}
												>
													{lang.label}
												</button>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
					</div>

					{/* DESKTOP SOCIALS & MOBILE CONTROLS */}
					<div className='flex items-center gap-4 md:gap-6 z-[110]'>
						{/* SOCIALS (Hidden on mobile) */}
						<div className='hidden md:flex items-center gap-4'>
							{socialLinks.map(social => (
								<motion.a
									key={social.name}
									href={social.href}
									target='_blank'
									rel='noreferrer'
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.9 }}
									className='group relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 transition-all duration-300'
								>
									<div
										className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl'
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

						{/* MOBILE LANGUAGE SELECTOR (Visible only on mobile) */}
						<div className='md:hidden relative' ref={langRef}>
							<button
								onClick={() => setLangOpen(!langOpen)}
								className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 uppercase'
							>
								{currentLang}
								<motion.div animate={{ rotate: langOpen ? 180 : 0 }}>
									{icons.chevronDown}
								</motion.div>
							</button>
							<AnimatePresence>
								{langOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										className='absolute right-0 mt-3 w-28 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl backdrop-blur-xl'
									>
										{languages.map(lang => (
											<button
												key={lang.code}
												onClick={() => changeLanguage(lang.code)}
												className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${currentLang === lang.code ? 'text-[#d4af37]' : 'text-zinc-400'}`}
											>
												{lang.code}
											</button>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* BURGER BUTTON */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='md:hidden flex flex-col items-end justify-center w-10 h-10 space-y-1.5 focus:outline-none'
						>
							<motion.span
								animate={
									isOpen
										? { rotate: 45, y: 8, width: '100%' }
										: { rotate: 0, y: 0, width: '100%' }
								}
								className='h-[2px] bg-white rounded-full'
							/>
							<motion.span
								animate={
									isOpen
										? { opacity: 0, x: 20 }
										: { opacity: 1, x: 0, width: '60%' }
								}
								className='h-[2px] bg-[#d4af37] rounded-full'
							/>
							<motion.span
								animate={
									isOpen
										? { rotate: -45, y: -8, width: '100%' }
										: { rotate: 0, y: 0, width: '100%' }
								}
								className='h-[2px] bg-white rounded-full'
							/>
						</button>
					</div>
				</div>
			</div>

			{/* MOBILE FULLSCREEN MENU */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 h-screen w-screen bg-[#0a0a0a] z-[105] flex flex-col items-center justify-center'
					>
						<div className='flex flex-col items-center space-y-8'>
							{navLinks.map((link, i) => {
								// Полностью исключаем вкладку "Projects" на мобилках
								if (link.to === 'projects') return null

								return (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: i * 0.1 }}
									>
										<RouterLink
											to={link.type === 'scroll' ? `/#${link.to}` : link.to}
											onClick={() => setIsOpen(false)}
											className='text-4xl font-black text-zinc-600 hover:text-[#d4af37] cursor-pointer uppercase transition-colors'
										>
											{link.name}
										</RouterLink>
									</motion.div>
								)
							})}

							{/* MOBILE SOCIALS */}
							<div className='flex gap-6 pt-6 opacity-50'>
								{socialLinks.map(s => (
									<a
										key={s.name}
										href={s.href}
										className='text-white'
										target='_blank'
										rel='noreferrer'
									>
										{s.icon}
									</a>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	)
}

export default Navbar
