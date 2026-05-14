import Navbar from '../../components/Navbar'
import HeroText from './components/HeroText'
import HeroVisual from './components/HeroVisual'

const Hero = () => {
	return (
		<main className='relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]'>
			<Navbar />

			{/* ФОНОВЫЙ ГРАДИЕНТ (Deep Charcoal & Gold/Red) */}
			<div className='fixed inset-0 z-0'>
				{/* Центральное темное пятно */}
				<div className='absolute inset-0 bg-[#0a0a0a]' />
				{/* Боковое красное свечение (как на скрине слева) */}
				<div
					className='absolute -left-[20%] top-[20%] w-[60%] h-[60%] rounded-full blur-[180px]'
					style={{
						background:
							'radial-gradient(circle, rgba(185,28,28,0.15) 0%, rgba(185,28,28,0) 70%)',
					}}
				/>
				{/* Боковое золотое свечение (как на скрине справа) */}
				<div
					className='absolute -right-[15%] top-[10%] w-[50%] h-[50%] rounded-full blur-[180px]'
					style={{
						background:
							'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0) 70%)',
					}}
				/>
			</div>

			<div
				id='hero'
				className='relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen'
			>
				{/* Первая часть (Компонент Текста) */}
				<div className='w-full md:w-1/2 md:pr-10 mb-0 md:mb-0'>
					<HeroText />
				</div>

				{/* Вторая часть (Компонент Визуала) */}
				<div className='w-full md:w-1/2 h-full flex items-center justify-center'>
					<HeroVisual />
				</div>
			</div>
		</main>
	)
}

export default Hero
