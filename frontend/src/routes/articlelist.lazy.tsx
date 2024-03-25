import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

	useEffect(() => {
		fetchData().then((data) => {
			setArticles(data);
		});
	}, []); // 空の配列を渡すことで、最初のマウント時にのみ実行されるようにする

	return (
		<div>
			{articles.map((article: Article) => (
				<div key={article.id}>
					<h2>{article.title}</h2>
					<p>{article.content}</p>
					<img src={article.imageUrl} alt={article.title} />
					<p>Created At: {article.createdAt}</p>
				</div>
			))}
		</div
	);
}

export default ArticleList;
