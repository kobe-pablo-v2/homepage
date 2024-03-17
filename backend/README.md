# backend

## 開発環境構築

カレントディレクトリを backend にして、
サーバーを立ち上げる。

```zsh
npm run dev
```

次に新しいターミナルを開き、データベースの設定をする。
最初に、データベースのテーブルを作成する。初回だけ必要。

```zsh
npx wrangler d1 migrations apply homepage --local
```

そして、作成したテーブルにデータを投入する。初回だけ必要。

```zsh
npx wrangler d1 execute homepage --local --file=./local/init.sql
```
