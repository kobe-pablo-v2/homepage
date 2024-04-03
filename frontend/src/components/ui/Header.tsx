import { Link } from "@tanstack/react-router";

export const Header = () => {
	return (
		<div className="dark:bg-black dark:text-white h-20 px-10 flex items-center">
			<Link to="/" className="font-audiowide font-bold text-3xl">
				pablo
			</Link>
			<div className="ml-auto">
				<Link to="/articleList" className="mr-24 ml-4 text-sm">
					ACTIVITIES
				</Link>
				<Link to="/contact" className="text-sm">
					CONTACT
				</Link>
			</div>
		</div>
	);
};
