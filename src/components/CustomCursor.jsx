'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
	const [isHovered, setIsHovered] = useState(false)

	// Позиция курсора
	const cursorX = useMotionValue(-100)
	const cursorY = useMotionValue(-100)

	// Плавность движения (Spring)
	const springConfig = { damping: 25, stiffness: 250 }
	const x = useSpring(cursorX, springConfig)
	const y = useSpring(cursorY, springConfig)

	useEffect(() => {
		const moveCursor = e => {
			cursorX.set(e.clientX)
			cursorY.set(e.clientY)
		}

		const handleMouseOver = e => {
			// Проверяем, наведен ли курсор на интерактивный элемент
			if (
				e.target.tagName === 'A' ||
				e.target.tagName === 'BUTTON' ||
				e.target.closest('a') ||
				e.target.closest('button') ||
				e.target.dataset.cursor === 'pointer'
			) {
				setIsHovered(true)
			} else {
				setIsHovered(false)
			}
		}

		window.addEventListener('mousemove', moveCursor)
		window.addEventListener('mouseover', handleMouseOver)

		return () => {
			window.removeEventListener('mousemove', moveCursor)
			window.removeEventListener('mouseover', handleMouseOver)
		}
	}, [cursorX, cursorY])

	return (
		<>
			{/* Главная точка */}
			<motion.div
				className='fixed top-0 left-0 w-3 h-3 bg-[#d4af37] rounded-full pointer-events-none z-[9999] mix-blend-difference'
				style={{
					x: cursorX,
					y: cursorY,
					translateX: '-50%',
					translateY: '-50%',
				}}
			/>

			{/* Внешнее кольцо */}
			<motion.div
				className='fixed top-0 left-0 w-8 h-8 border border-[#d4af37] rounded-full pointer-events-none z-[9998]'
				style={{
					x,
					y,
					translateX: '-50%',
					translateY: '-50%',
				}}
				animate={{
					scale: isHovered ? 2 : 1,
					opacity: isHovered ? 0.5 : 1,
					backgroundColor: isHovered
						? 'rgba(212, 175, 55, 0.1)'
						: 'transparent',
				}}
			/>
		</>
	)
}

export default CustomCursor
