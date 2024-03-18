import { useMotionValue } from "framer-motion";
import { motion, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";

export const EvervaultCard = ({
	text,
	subText,
	className,
}: {
	text?: string;
	subText?: string;
	className?: string;
}) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const [randomString, setRandomString] = useState("");

	useEffect(() => {
		const str = generateRandomString(10000);
		setRandomString(str);
	}, []);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);

		const str = generateRandomString(10000);
		setRandomString(str);
	}

	return (
		<div
			className={cn(
				"p-0.5  bg-transparent aspect-square flex items-center justify-center w-full h-full relative",
				className,
			)}
		>
			<div
				onMouseMove={onMouseMove}
				className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex flex-col items-center justify-center h-full"
			>
				<CardPattern
					mouseX={mouseX}
					mouseY={mouseY}
					randomString={randomString}
				/>
				<div className="relative z-10 flex flex-col items-center justify-center">
					<span className="dark:text-white text-black">{subText}</span>
					<span className="dark:text-white text-black font-bold text-6xl font-audiowide">
						{text}
					</span>
				</div>
			</div>
		</div>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function CardPattern({ mouseX, mouseY, randomString }: any) {
	const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div className="pointer-events-none">
			<div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" />
			<motion.div
				className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
				style={style}
			/>
			<motion.div
				className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
				style={style}
			>
				<p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
					{randomString}
				</p>
			</motion.div>
		</div>
	);
}

const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Icon = ({ className, ...rest }: any) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			{...rest}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
		</svg>
	);
};
