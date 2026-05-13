import React, { useState, useEffect } from 'react'

import { Link as ScrollLink } from 'react-scroll'

import { Link as RouterLink, useLocation } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'

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
}

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const location = useLocation()

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset'
	}, [isOpen])

	const navLinks = [
		{ name: 'Главная', to: 'hero', type: 'scroll' },

		{ name: 'Языки', to: 'language', type: 'scroll' },

		{ name: 'Проекты', to: 'projects', type: 'scroll' },

		{ name: 'Контакты', to: '/contact', type: 'router' },
	]

	const socialLinks = [
		{
			name: 'Github',

			icon: icons.github,

			href: 'https://github.com',

			color: '#ffffff',
		},

		{
			name: 'Telegram',

			icon: icons.telegram,

			href: 'https://t.me',

			color: '#0088cc',
		},
	]

	return (
		<nav className='fixed w-full z-[100] bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5'>
			<div className='max-w-7xl mx-auto px-6 lg:px-10'>
				<div className='flex items-center justify-between h-24'>
					{/* ЛОГО */}

					<div className='flex-shrink-0 z-[110]'>
						<RouterLink to='/' onClick={() => setIsOpen(false)}>
							<span className='text-3xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-[#d4af37] bg-clip-text text-transparent cursor-pointer uppercase'>
								Portfolio.
							</span>
						</RouterLink>
					</div>

					{/* ЦЕНТР: Навигация */}

					<div className='hidden md:flex items-center justify-center flex-1'>
						<div className='flex space-x-12'>
							{navLinks.map(link =>
								link.type === 'scroll' && location.pathname === '/' ? (
									<ScrollLink
										key={link.name}
										to={link.to}
										smooth={true}
										duration={500}
										offset={-90}
										className='relative group cursor-pointer text-base font-bold text-zinc-400 hover:text-white transition-colors py-2 px-1'
									>
										<span className='absolute top-0 right-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full' />

										{link.name}

										<span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full' />
									</ScrollLink>
								) : (
									<RouterLink
										key={link.name}
										to={link.type === 'scroll' ? `/#${link.to}` : link.to}
										className='relative group cursor-pointer text-base font-bold text-zinc-400 hover:text-white transition-colors py-2 px-1'
									>
										<span className='absolute top-0 right-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full' />

										{link.name}

										<span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] transition-all duration-300 group-hover:w-full' />
									</RouterLink>
								),
							)}
						</div>
					</div>

					{/* ПРАВО: Соцсети в стиле HeroText */}

					<div className='hidden md:flex items-center gap-4 z-[110]'>
						{socialLinks.map(social => (
							<motion.a
								key={social.name}
								href={social.href}
								target='_blank'
								rel='noreferrer'
								whileHover={{ scale: 1.1, y: -2 }}
								whileTap={{ scale: 0.9 }}
								className='group relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300'
							>
								{/* Цветной фон при ховере */}

								<div
									className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl'
									style={{ backgroundColor: social.color }}
								/>

								{/* Иконка */}

								<div className='relative z-10 text-zinc-500 group-hover:text-white transition-all duration-300'>
									{social.icon}
								</div>

								{/* Точка-индикатор снизу */}

								<div
									className='absolute bottom-1.5 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'
									style={{
										backgroundColor: social.color,

										boxShadow: `0 0 8px ${social.color}`,
									}}
								/>
							</motion.a>
						))}
					</div>

					{/* БУРГЕР */}

					<div className='md:hidden z-[110]'>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='flex flex-col items-end justify-center w-10 h-10 space-y-1.5 focus:outline-none'
						>
							<motion.span
								animate={
									isOpen
										? { rotate: 45, y: 8, width: '100%' }
										: { rotate: 0, y: 0, width: '100%' }
								}
								className='h-[2px] bg-white rounded-full transition-all duration-300'
							/>

							<motion.span
								animate={
									isOpen
										? { opacity: 0, x: 20 }
										: { opacity: 1, x: 0, width: '60%' }
								}
								className='h-[2px] bg-[#d4af37] rounded-full transition-all duration-300'
							/>

							<motion.span
								animate={
									isOpen
										? { rotate: -45, y: -8, width: '100%' }
										: { rotate: 0, y: 0, width: '100%' }
								}
								className='h-[2px] bg-white rounded-full transition-all duration-300'
							/>
						</button>
					</div>
				</div>
			</div>

			{/* МОБИЛЬНОЕ МЕНЮ */}

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 h-screen w-screen bg-[#0a0a0a] z-[105] flex flex-col items-center justify-center'
					>
						<div className='flex flex-col items-center space-y-8'>
							{navLinks.map((link, i) => (
								<motion.div
									key={link.name}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
								>
									{link.type === 'scroll' && location.pathname === '/' ? (
										<ScrollLink
											to={link.to}
											smooth={true}
											onClick={() => setIsOpen(false)}
											className='text-5xl font-black text-zinc-600 hover:text-[#d4af37] cursor-pointer'
										>
											{link.name}
										</ScrollLink>
									) : (
										<RouterLink
											to={link.type === 'scroll' ? `/#${link.to}` : link.to}
											onClick={() => setIsOpen(false)}
											className='text-5xl font-black text-zinc-600 hover:text-[#d4af37] cursor-pointer'
										>
											{link.name}
										</RouterLink>
									)}
								</motion.div>
							))}

							{/* Соцсети в мобильном меню */}

							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
								className='flex space-x-6 pt-12 border-t border-white/5 w-64 justify-center'
							>
								{socialLinks.map(social => (
									<motion.a
										key={social.name}
										href={social.href}
										whileHover={{ scale: 1.1 }}
										className='group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10'
									>
										<div
											className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl'
											style={{ backgroundColor: social.color }}
										/>

										<div className='text-zinc-500 group-hover:text-white transition-colors scale-125'>
											{social.icon}
										</div>
									</motion.a>
								))}
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	)
}

export default Navbar
