# Todo アプリケーション

このリポジトリは、React + TypeScript（フロントエンド）と NestJS + TypeScript（バックエンド）、および Prisma + PostgreSQL を組み合わせたシンプルな Todo アプリケーションのモノレポ実装です。開発は Docker / docker-compose を中心に行うことを想定しています。

## ■ 使用技術

| 項目 | 内容 |
| --- | --- |
| フロントエンド | React / TypeScript / Vite / Tailwindcss / React Router / React Hook Form |
| バックエンド | NestJS / Prisma |
| データベース | PostgreSQL 16 |
| バリデーション | class-validator / class-transformer（サーバー）、Zod（フロント） |
| デプロイ / 起動 | Docker / docker compose / dev container |
| 開発環境 / ツール | ESLint / Prettier / commitlint / Husty / lint-staged |


## ■ 事前準備

- Docker / Docker Compose が利用できる環境

## ■ 起動方法 (Docker)

1. リポジトリをクローン
    ```bash
    git clone -b main https://github.com/yu-jimk/Todo-app-nodejs.git
    cd Todo-app-nodejs
    ```
2. コンテナのビルド・起動
    ```bash
    docker compose -f docker-compose.dev.yml up -d --build
    ```
3. DB マイグレーションとシード (DB 起動後に実行)
    ```bash
    docker compose -f docker-compose.dev.yml exec backend pnpm --filter=backend prisma migrate deploy
    docker compose -f docker-compose.dev.yml exec backend pnpm --filter=backend prisma generate
    docker compose -f docker-compose.dev.yml exec backend pnpm --filter=backend prisma db seed
    ```
4. アクセス
    - フロントエンド: `http://localhost:5143`
    - バックエンド: `http://localhost:8000`

## ■ CRUD 操作方法

### 1. Todo 一覧表示

- トップページ (`http://localhost:5143` または `/`) で作成済み Todo を確認できます
- ID、完了状態、タイトル、作成日、更新日を一覧表示
- 各 TODO には完了チェックボックスと「詳細」ボタンが表示されます
- 右上の「+ 新規作成」ボタンで作成ページへ移動できます

![画面収録-2026-01-08-20 07 57](https://github.com/user-attachments/assets/a3403f46-69ac-46ff-953c-fb9ac16c17c7)

### 2. Todo 作成

1. 一覧ページの「+ 新規作成」ボタンをクリック
2. **ページ遷移**: 作成ページ (`/todos/new`) に移動
3. タイトルを入力して「作成」ボタンをクリック
4. **ページ遷移**: 作成後、一覧ページ (`/`) に戻り、新しい Todo が追加されます

![画面収録-2026-01-08-20 11 10](https://github.com/user-attachments/assets/b15d017d-b4e6-48d4-8b8f-d96357aea757)

### 3. Todo 完了/未完了トグル

1. 一覧ページ (`/`) で Todo のチェックボックスをクリック
2. 完了状態が即座に切り替わります
3. 完了した Todo はタイトルに取り消し線が表示されます

![画面収録-2026-01-08-20 13 01](https://github.com/user-attachments/assets/f7cebd6b-8e90-4eec-aa94-407c9527741b)

### 4. Todo タイトル編集

1. 一覧ページで Todo の「詳細」ボタンをクリック
2. **ページ遷移**: 詳細ページ (`/todos/:id`) に移動
3. 詳細ページで「編集」ボタンをクリック
4. **ページ遷移**: 編集ページ (`/todos/:id/edit`) に移動
5. タイトルを修正して「更新」ボタンをクリック
6. **ページ遷移**: 更新後、詳細ページ (`/todos/:id`) に戻り、変更内容が反映されます

![画面収録-2026-01-08-20 14 23](https://github.com/user-attachments/assets/7c5ca32b-e86d-489c-bc59-0591ebf468dc)

### 5. Todo 削除

1. 詳細ページ (`/todos/:id`) で「削除」ボタンをクリック
2. 確認ダイアログで「OK」を選択
3. **ページ遷移**: 削除後、一覧ページ (`/`) に戻ります

![画面収録-2026-01-08-20 15 38](https://github.com/user-attachments/assets/2a829658-b2c1-4a10-bc4e-bb782a8a8532)
