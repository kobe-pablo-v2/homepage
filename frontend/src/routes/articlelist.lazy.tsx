import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { HoverEffect } from "./../components/ui/card-hover-effect";

export const Route = createLazyFileRoute("/articlelist")({
	component: ArticleList,
});

// 記事の形付け
interface Article {
	id: number;
	title: string;
	content: string;
	imageUrl: string;
	createdAt: string;
}

// 記事の一覧を取得する page = 表示しているページ perPage = 1ページあたりの表示数
async function fetchData(page: number, perPage: number): Promise<Article[]> {
	try {
		const response = await fetch(
			`http://127.0.0.1:8787/articles?page=${page}&perPage=${perPage}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		if (response.ok) {
			return await response.json();
		}
		throw new Error("Request failed");
	} catch (error) {
		console.error(error);
		return [];
	}
}

// 記事の総数を取得する
async function fetchTotalCount(): Promise<number> {
	try {
		const response = await fetch("http://127.0.0.1:8787/articles/count", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			return data.total;
		}
		throw new Error("Request failed");
	} catch (error) {
		console.error(error);
		return 0;
	}
}

function ArticleList(_props: any) {
	const [articles, setArticles] = useState<Article[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	// 1ページあたりの表示数
	const perPage = 6;

	// ページ読み込み時に記事一覧を取得
	useEffect(() => {
		fetchData(currentPage, perPage).then((data) => {
			setArticles(data);
		});
		fetchTotalCount().then((count) => {
			setTotalCount(count);
		});
	}, [currentPage]);

	// ページネーションページ遷移の処理
	const handlePageChange = (data: { selected: number }) => {
		setCurrentPage(data.selected + 1);
	};

	// 記事一覧のデータを整形
	const items = articles.map((article) => ({
		title: article.title,
		thumbnail: article.imageUrl,
		createdAt: article.createdAt,
		link: `/articles/${article.id}`,
	}));

	return (
		<div className="bg-black text-white min-h-screen flex flex-col">
			{/*記事一覧*/}
			<div className="container mx-auto px-4 flex-grow size-2/4">
				<HoverEffect items={items} />
			</div>
			{/*ページネーション*/}
			<div className="flex justify-center items-center py-8 ">
				<ReactPaginate
					pageCount={Math.ceil(totalCount / perPage)}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={handlePageChange}
					containerClassName="inline-flex space-x-2"
					pageClassName="mx-2"
					pageLinkClassName="px-3 py-2 border-zinc-400 text-zinc-400 hover:bg-zinc-400 hover:text-black focus:outline-none"
					activeClassName="border-b-2 border-zinc-400"
					previousLabel="PREV"
					nextLabel="NEXT"
					previousClassName="mx-2"
					nextClassName="mx-2"
					previousLinkClassName="px-3 py-2 text-zinc-400 hover:bg-zinc-400 hover:text-black focus:outline-none rounded-lg"
					nextLinkClassName="px-3 py-2 text-zinc-400 hover:bg-zinc-400 hover:text-black focus:outline-none rounded-lg"
					disabledClassName="opacity-50 cursor-not-allowed"
					breakLabel="..."
					breakClassName="mx-2"
					breakLinkClassName="px-3 py-2 border border-white text-white hover:bg-white hover:text-black focus:outline-none"
				/>
			</div>
		</div>
	);
}

export default ArticleList;
