'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'

// SVG Иконки без изменений...
const icons = {
	email: (
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
			<rect width='20' height='16' x='2' y='4' rx='2' />
			<path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
		</svg>
	),
	location: (
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
			<path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
			<circle cx='12' cy='10' r='3' />
		</svg>
	),
}

const ContactSection = () => {
	const [status, setStatus] = useState('idle')

	const handleSubmit = async e => {
		e.preventDefault()
		setStatus('loading')
		setTimeout(() => setStatus('success'), 2000)
	}

	const inputStyles = `
    w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 
    text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#d4af37]/50 
    transition-all duration-300 focus:bg-white/10
  `

	return (
		<>
			<Navbar />

			<section
				id='contact'
				// КЛЮЧЕВЫЕ ИЗМЕНЕНИЯ: flex, items-center, justify-center и min-h-screen
				className='relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-zinc-950'
			>
				{/* Декоративное свечение — теперь центрировано относительно экрана */}
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none' />

				<div className='max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10'>
					{/* ЛЕВАЯ ЧАСТЬ: Текст */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] mb-8'>
							Давайте <br />
							<span className='text-[#d4af37]'>Создавать</span> <br />
							Вместе
						</h2>
						<p className='text-zinc-400 text-lg md:text-xl max-w-md font-light leading-relaxed mb-12'>
							Есть идея или проект? Оставьте заявку, и мы обсудим, как воплотить
							это в жизнь на высшем уровне.
						</p>

						<div className='space-y-8'>
							<div className='flex items-center gap-6 group cursor-pointer'>
								<div className='relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-[#d4af37]/50'>
									<div className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl bg-[#d4af37]' />
									<div className='relative z-10 text-zinc-400 group-hover:text-[#d4af37] transition-colors duration-500'>
										{icons.email}
									</div>
									<div className='absolute -bottom-1 w-1 h-1 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-100 blur-[2px] transition-all duration-500' />
								</div>
								<div className='flex flex-col'>
									<span className='text-xs text-zinc-500 uppercase tracking-[0.2em] mb-1'>
										Напишите нам
									</span>
									<span className='text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300 text-sm md:text-xl overflow-hidden text-ellipsis'>
										hello@yourbrand.com
									</span>
								</div>
							</div>

							<div className='flex items-center gap-6 group cursor-pointer'>
								<div className='relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-[#d4af37]/50'>
									<div className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl bg-[#d4af37]' />
									<div className='relative z-10 text-zinc-400 group-hover:text-[#d4af37] transition-colors duration-500'>
										{icons.location}
									</div>
									<div className='absolute -bottom-1 w-1 h-1 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-100 blur-[2px] transition-all duration-500' />
								</div>
								<div className='flex flex-col'>
									<span className='text-xs text-zinc-500 uppercase tracking-[0.2em] mb-1'>
										Наш офис
									</span>
									<span className='text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300'>
										г. Москва, ул. Примерная 10
									</span>
								</div>
							</div>
						</div>
					</motion.div>

					{/* ПРАВАЯ ЧАСТЬ: Форма */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='relative'
					>
						<div className='relative z-10 p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl'>
							<AnimatePresence mode='wait'>
								{status === 'success' ? (
									<motion.div
										key='success'
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										className='text-center py-20'
									>
										<div className='text-6xl mb-6'>✅</div>
										<h3 className='text-3xl font-bold text-white mb-4'>
											Спасибо!
										</h3>
										<p className='text-zinc-400 text-lg'>
											Мы получили ваше сообщение и ответим в ближайшее время.
										</p>
										<button
											onClick={() => setStatus('idle')}
											className='mt-8 text-[#d4af37] underline underline-offset-4 hover:text-white transition-colors'
										>
											Отправить еще раз
										</button>
									</motion.div>
								) : (
									<motion.form
										key='form'
										onSubmit={handleSubmit}
										className='space-y-6'
										exit={{ opacity: 0, y: -20 }}
									>
										<div className='grid md:grid-cols-2 gap-6'>
											<div className='space-y-2'>
												<label className='text-sm text-zinc-500 ml-2 uppercase tracking-widest font-bold'>
													Имя
												</label>
												<input
													type='text'
													placeholder='Иван'
													required
													className={inputStyles}
												/>
											</div>
											<div className='space-y-2'>
												<label className='text-sm text-zinc-500 ml-2 uppercase tracking-widest font-bold'>
													Email
												</label>
												<input
													type='email'
													placeholder='ivan@mail.com'
													required
													className={inputStyles}
												/>
											</div>
										</div>
										<div className='space-y-2'>
											<label className='text-sm text-zinc-500 ml-2 uppercase tracking-widest font-bold'>
												Тема
											</label>
											<input
												type='text'
												placeholder='Разработка сайта'
												className={inputStyles}
											/>
										</div>
										<div className='space-y-2'>
											<label className='text-sm text-zinc-500 ml-2 uppercase tracking-widest font-bold'>
												Сообщение
											</label>
											<textarea
												rows='4'
												placeholder='Расскажите о вашем проекте...'
												className={`${inputStyles} resize-none`}
											/>
										</div>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											disabled={status === 'loading'}
											className={`w-full py-5 rounded-2xl font-bold text-lg uppercase tracking-[0.2em] transition-all duration-500 ${
												status === 'loading'
													? 'bg-zinc-800 text-zinc-500 cursor-wait'
													: 'bg-[#d4af37] text-black hover:bg-white shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[#d4af37]/30'
											}`}
										>
											{status === 'loading'
												? 'Отправка...'
												: 'Отправить запрос'}
										</motion.button>
									</motion.form>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</>
	)
}

export default ContactSection
