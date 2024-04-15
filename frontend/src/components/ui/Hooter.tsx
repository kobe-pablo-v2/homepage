import { FaXTwitter } from "react-icons/fa6";

const xUrl = "https://twitter.com/pablo_kobe_univ";

interface contentType {
	title: string;
	url: string;
}

const hooterContents: [contentType] = [
	{ title: "お問い合わせ", url: "/contact" },
];

export const Hooter = () => {
	return (
		<div className="dark:bg-black dark:text-white h-48 px-10 border-zinc-600 border-t-[0.5px]">
			<div className="flex pt-12">
				<div className="font-audiowide font-bold text-4xl">pablo</div>
				{hooterContents.map((content, i) => (
					<a
						href={content.url}
						className={` ${
							i === 0 ? "ml-10" : "ml-2"
						} pt-4 text-xs hover:underline`}
					>
						{content.title}
					</a>
				))}
			</div>
			<div className="mt-8">
				<a href={xUrl}>
					<FaXTwitter size={28} />
				</a>
			</div>
		</div>
	);
};
