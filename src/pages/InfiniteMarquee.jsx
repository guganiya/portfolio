'use client'

import React from 'react'
import { motion } from 'framer-motion'

const languages = [
	{
		name: 'JavaScript',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
		url: '#',
	},
	{
		name: 'TypeScript',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
		url: '#',
	},
	{
		name: 'React',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
		url: '#',
	},
	{
		name: 'Python',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
		url: '#',
	},
	{
		name: 'Go',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
		url: '#',
	},
	{
		name: 'Tailwind',
		icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
		url: '#',
	},
	{
		name: 'Node.js',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
		url: '#',
	},
	{
		name: 'FastAPI',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
		url: '#',
	},
]
const TechCard = ({ tech }) => (
	<motion.a
		href={tech.url}
		target='_blank'
		rel='noopener noreferrer'
		whileHover={{
			scale: 1.1,
			borderColor: 'rgba(212, 175, 55, 0.5)',
		}}
		className='flex-shrink-0 relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center p-5 transition-all duration-500 group '
	>
		{/* Внутреннее мягкое золотое свечение при наведении */}
		<div className='absolute inset-0 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500' />

		{/* Иконка технологии */}
		<img
			src={tech.icon}
			alt={tech.name}
			className='w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 z-10'
		/>

		{/* Фирменная светящаяся точка снизу */}
		<div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#d4af37] transition-all duration-500 z-20' />
	</motion.a>
)

const TechMarquee = () => {
	// Утраиваем массив для бесконечного бесшовного цикла
	const tripledLanguages = [...languages, ...languages, ...languages]

	return (
		<section className='w-full py-10 overflow-hidden bg-transparent select-none -mt-15'>
			<div className='flex relative items-center'>
				{/* Градиентные маски для эффекта "растворения" по бокам */}
				<div className='absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none' />
				<div className='absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none' />

				<motion.div
					className='flex gap-12 min-w-max px-6'
					initial={{ x: 0 }}
					animate={{
						x: ['0%', '-33.3333%'],
					}}
					transition={{
						x: {
							repeat: Infinity,
							repeatType: 'loop',
							duration: 30, // Спокойная, премиальная скорость
							ease: 'linear',
						},
					}}
					style={{ display: 'flex' }}
				>
					{tripledLanguages.map((tech, index) => (
						<TechCard key={`${tech.name}-${index}`} tech={tech} />
					))}
				</motion.div>
			</div>
		</section>
	)
}

export default TechMarquee
