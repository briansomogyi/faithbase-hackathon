import { Button } from '@/components/ui/button';
import Logo from '../assets/Logo.svg';

export default function Header() {
	return (
		<header className="py-4 pt-8 flex items-center justify-between pb-10">
			<div className="flex items-center space-x-2">
				<img
					src={Logo}
					alt="FaithbaseLogo"
				/>
			</div>
			<nav className="flex items-center space-x-6">
				<Button
					variant="default"
					className="bg-blue-500 hover:bg-blue-600 text-white"
				>
					<a href="/pacient">Pacient</a>
				</Button>
				<a
					href="/doctor"
					className="text-gray-600 hover:text-gray-800"
				>
					Doctor
				</a>
				<a
					href="/apps"
					className="text-gray-600 hover:text-gray-800"
				>
					Settings
				</a>
				<a
					href="/testimonials"
					className="text-gray-600 hover:text-gray-800"
				>
					Testimonials
				</a>
				<a
					href="/about"
					className="text-gray-600 hover:text-gray-800"
				>
					About us
				</a>
			</nav>
		</header>
	);
}
