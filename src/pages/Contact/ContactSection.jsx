'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'

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
	const { t } = useTranslation()
	const [status, setStatus] = useState('idle')

	const handleSubmit = async e => {
		e.preventDefault()
		setStatus('loading')

		// Собираем данные из полей формы
		const formData = new FormData(e.target)
		// Твой ключ доступа
		formData.append('access_key', '68441ff7-e81b-4d27-b05b-0a5b3ee18415')

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				body: formData,
			})

			const data = await response.json()

			if (data.success) {
				setStatus('success')
				e.target.reset() // Очистить форму
			} else {
				console.log('Error', data)
				setStatus('idle')
				alert('Something went wrong!')
			}
		} catch (error) {
			console.log('Error', error)
			setStatus('idle')
		}
	}

	const inputStyles = `
    w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 
    text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#d4af37]/50 
    transition-all duration-300 focus:bg-white/10
  `

	return (
		<div className='bg-zinc-950'>
			<Navbar />

			<section
				id='contact'
				className='relative min-h-screen flex items-center justify-center px-4 py-20 pt-32 lg:pt-24 overflow-hidden'
			>
				{/* Декоративное свечение */}
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#d4af37]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none' />

				<div className='max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10'>
					{/* ЛЕВАЯ ЧАСТЬ */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className='text-center lg:text-left'
					>
						<h2 className='text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9] mb-8'>
							{t('contact.title_1')} <br />
							<span className='text-[#d4af37]'>
								{t('contact.title_accent')}
							</span>{' '}
							<br />
							{t('contact.title_2')}
						</h2>
						<p className='text-zinc-400 text-lg md:text-xl max-w-md mx-auto lg:mx-0 font-light leading-relaxed mb-12'>
							{t('contact.description')}
						</p>

						<div className='space-y-6 md:space-y-8 flex flex-col items-start'>
							{/* Email Item */}
							<a
								href='mailto:bayramowramazan85@gmail.com'
								className='flex flex-row items-center gap-4 md:gap-6 group cursor-pointer w-full'
							>
								<div className='relative flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-[#d4af37]/50'>
									<div className='relative z-10 text-zinc-400 group-hover:text-[#d4af37] transition-colors duration-500'>
										{icons.email}
									</div>
								</div>
								<div className='flex flex-col text-left'>
									<span className='text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.2em] mb-1'>
										{t('contact.email_label')}
									</span>
									<span className='text-sm md:text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300 break-all'>
										bayramowramazan85@gmail.com
									</span>
								</div>
							</a>

							{/* Location Item (Кликабельный блок карты) */}
							<a
								href='https://www.google.com/maps/search/?api=1&query=Ashgabat+Mir+3+Peache'
								target='_blank'
								rel='noreferrer'
								className='flex flex-row items-center gap-4 md:gap-6 group cursor-pointer w-full'
							>
								<div className='relative flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-[#d4af37]/50'>
									<div className='relative z-10 text-zinc-400 group-hover:text-[#d4af37] transition-colors duration-500'>
										{icons.location}
									</div>
								</div>
								<div className='flex flex-col text-left'>
									<span className='text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.2em] mb-1'>
										{t('contact.location_label')}
									</span>
									<span className='text-sm md:text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300'>
										{t('contact.location_value')}
									</span>
								</div>
							</a>
						</div>
					</motion.div>

					{/* ПРАВАЯ ЧАСТЬ: Форма */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='relative w-full'
					>
						<div className='relative z-10 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl'>
							<AnimatePresence mode='wait'>
								{status === 'success' ? (
									<motion.div
										key='success'
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										className='text-center py-10 md:py-20'
									>
										<div className='text-5xl md:text-6xl mb-6'>✅</div>
										<h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>
											{t('contact.success_title')}
										</h3>
										<p className='text-zinc-400 text-base md:text-lg'>
											{t('contact.success_msg')}
										</p>
										<button
											onClick={() => setStatus('idle')}
											className='mt-8 text-[#d4af37] underline underline-offset-4 hover:text-white transition-colors'
										>
											{t('contact.send_again')}
										</button>
									</motion.div>
								) : (
									<motion.form
										key='form'
										onSubmit={handleSubmit}
										className='space-y-5 md:space-y-6'
										exit={{ opacity: 0, y: -20 }}
									>
										<div className='grid md:grid-cols-2 gap-5 md:gap-6'>
											{/* ПОЛЕ ИМЕНИ */}
											<div className='space-y-2'>
												<label className='text-xs text-zinc-500 ml-2 uppercase tracking-widest font-bold'>
													{t('contact.form.name')}
												</label>
												<input
													type='text'
													name='name'
													placeholder={t('contact.form.name_placeholder')}
													required
													className={inputStyles}
												/>
											</div>

											{/* ПОЛЕ EMAIL */}
											<div className='space-y-2'>
												<label className='text-xs text-zinc-500 ml-2 uppercase tracking-widest font-bold'>
													{t('contact.form.email')}
												</label>
												<input
													type='email'
													name='email'
													placeholder='mail@example.com'
													required
													className={inputStyles}
												/>
											</div>
										</div>

										{/* ПОЛЕ СООБЩЕНИЯ */}
										<div className='space-y-2'>
											<label className='text-xs text-zinc-500 ml-2 uppercase tracking-widest font-bold'>
												{t('contact.form.message')}
											</label>
											<textarea
												name='message'
												rows='4'
												placeholder={t('contact.form.message_placeholder')}
												required
												className={`${inputStyles} resize-none`}
											/>
										</div>

										{/* КНОПКА ОТПРАВКИ */}
										<motion.button
											whileHover={{ scale: 1.01 }}
											whileTap={{ scale: 0.98 }}
											type='submit'
											disabled={status === 'loading'}
											className={`w-full py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg uppercase tracking-[0.2em] transition-all duration-500 ${
												status === 'loading'
													? 'bg-zinc-800 text-zinc-500 cursor-wait'
													: 'bg-[#d4af37] text-black hover:bg-white shadow-[0_10px_30px_rgba(212,175,55,0.2)]'
											}`}
										>
											{status === 'loading'
												? t('contact.form.sending')
												: t('contact.form.submit')}
										</motion.button>
									</motion.form>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default ContactSection
