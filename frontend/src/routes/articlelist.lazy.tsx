import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { HoverEffect } from "./../components/ui/card-hover-effect";

export const Route = createLazyFileRoute("/articlelist")({
	component: ArticleList,
});

interface Article {
	id: number;
	title: string;
	content: string;
	imageUrl: string;
	createdAt: string;
}

async function fetchData(): Promise<Article[]> {
	try {
		const response = await fetch("http://127.0.0.1:8787/articles", {
			method: "GET",
			headers: {
				"Content-Type": "application/json", // JSON形式のデータを受け取る
			},
		});
		if (response.ok) {
			return await response.json(); // JSON形式のデータをオブジェクトとして取得する
		} else {
			throw new Error("Request failed");
		}
	} catch (error) {
		console.error(error);
		return []; // エラーが発生した場合は空の配列を返す
	}
}

function ArticleList(_props: any) {
	const [articles, setArticles] = useState<Article[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const perPage = 6;

	useEffect(() => {
		fetchData().then((data) => {
			setArticles(data);
		});
	}, []); // 空の配列を渡すことで、最初のマウント時にのみ実行されるようにする

	const handlePageChange = (data: { selected: number }) => {
		setCurrentPage(data.selected);
	};

	const offset = currentPage * perPage;
	const currentArticles = articles.slice(offset, offset + perPage);

	const items = currentArticles.map((article) => ({
		title: article.title,
		thumbnail: article.imageUrl,
		createdAt: article.createdAt,
		link: `/articles/${article.id}`,
	}));

	return (
		<div className="bg-black text-white absolute inset-0 w-full">
			<div className="container mx-auto px-4">
				<HoverEffect items={items} />
				<div className="flex justify-center mt-8">
					<ReactPaginate
						pageCount={Math.ceil(articles.length / perPage)}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={handlePageChange}
						containerClassName="inline-flex space-x-2"
						pageClassName="mx-2"
						pageLinkClassName="px-3 py-2 border border-white text-white hover:bg-white hover:text-black focus:outline-none"
						activeClassName="border-b-2 border-white"
						previousLabel="PREV"
						nextLabel="NEXT"
						previousClassName="mx-2"
						nextClassName="mx-2"
						previousLinkClassName="px-3 py-2 border border-white text-white hover:bg-white hover:text-black focus:outline-none rounded-l-lg"
						nextLinkClassName="px-3 py-2 border border-white text-white hover:bg-white hover:text-black focus:outline-none rounded-r-lg"
						disabledClassName="opacity-50 cursor-not-allowed"
						breakLabel="..."
						breakClassName="mx-2"
						breakLinkClassName="px-3 py-2 border border-white text-white hover:bg-white hover:text-black focus:outline-none"
					/>
				</div>
			</div>
		</div>
	);
}

export default ArticleList;
