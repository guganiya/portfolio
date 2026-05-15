import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

const Footer = () => {
	const { t } = useTranslation()

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
		<footer className='relative w-full py-12 border-t border-white/5 bg-[#0a0a0a] overflow-hidden'>
			{/* Мягкая подсветка */}
			<div className='absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#d4af37]/5 blur-[100px] pointer-events-none' />

			<div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8'>
				{/* ЛЕВАЯ ЧАСТЬ */}
				<div className='flex flex-col items-center md:items-start gap-2'>
					<Link
						to='/'
						className='text-2xl font-black tracking-tighter text-white uppercase'
					>
						{t('common.logo_text')}
						<span className='text-[#d4af37]'>.</span>
					</Link>
					<p className='text-zinc-500 text-sm font-medium tracking-wider uppercase'>
						© {new Date().getFullYear()} {t('footer.rights')}
					</p>
				</div>

				{/* ЦЕНТРАЛЬНАЯ ЧАСТЬ */}
				<div className='hidden lg:block text-zinc-600 text-sm uppercase tracking-[0.3em] font-bold'>
					{t('footer.motto_start')}{' '}
					<span className='text-zinc-400'>{t('footer.motto_end')}</span>
				</div>

				{/* ПРАВАЯ ЧАСТЬ: Соцсети */}
				<div className='flex items-center gap-4'>
					{socialLinks.map(social => (
						<motion.a
							key={social.name}
							href={social.href}
							target='_blank'
							rel='noreferrer'
							whileHover={{ y: -3, scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className='group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300'
						>
							<div
								className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl'
								style={{ backgroundColor: social.color }}
							/>
							<div className='relative z-10 text-zinc-500 group-hover:text-white transition-colors duration-300 scale-90'>
								{social.icon}
							</div>
							<div
								className='absolute bottom-1 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'
								style={{
									backgroundColor: social.color,
									boxShadow: `0 0 8px ${social.color}`,
								}}
							/>
						</motion.a>
					))}
				</div>
			</div>

			<div className='mt-12 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent' />
		</footer>
	)
}

export default Footer
