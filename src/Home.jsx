import React, { useEffect } from 'react'
import Hero from './pages/Hero/Hero'
import { Projects } from './pages/projects/Projects'
import TechMarquee from './pages/InfiniteMarquee'
import Footer from './components/footer'

// import Lenis from '@studio-freight/lenis'

const Home = () => {
	return (
		<main className='bg-[#0a0a0a] min-h-screen'>
			{/* Секция Hero */}
			<section id='hero'>
				<Hero />
			</section>

			<section id='language'>
				<TechMarquee />
			</section>
			{/* Секция Проектов */}
			<section id='projects'>
				<Projects />
			</section>

			<section>
				<Footer />
			</section>
		</main>
	)
}

export default Home
