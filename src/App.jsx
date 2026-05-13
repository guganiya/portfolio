import { Routes, Route } from 'react-router-dom' // Удалил Router из импорта
import Home from './Home'
import ContactSection from './pages/Contact/ContactSection'
import CustomCursor from './components/CustomCursor'
function App() {
	return (
		// Удалил тег <Router> отсюда
		<div className='bg-zinc-950 min-h-screen text-white cursor-none'>
			<CustomCursor />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/contact' element={<ContactSection />} />
			</Routes>
		</div>
		// И отсюда тоже
	)
}

export default App
