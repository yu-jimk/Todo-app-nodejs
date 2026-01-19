.PHONY: help prisma-init prisma-generate prisma-migrate prisma-studio prisma-reset prisma-push \
	nest-start nest-start-dev nest-build nest-lint nest-test nest-test-e2e nest-generate

help:
	@echo "Available commands:"
	@echo "  make prisma-init         - Initialize new migration (requires NAME env var)"
	@echo "  make prisma-generate     - Generate Prisma Client"
	@echo "  make prisma-migrate      - Apply migrations to database (dev mode)"
	@echo "  make prisma-studio       - Open Prisma Studio"
	@echo "  make prisma-push         - Push schema to database (no migrations)"
	@echo "  make prisma-reset        - Reset database (dev only, CAUTION!)"
	@echo "  make nest-start          - Start NestJS in production mode"
	@echo "  make nest-start-dev      - Start NestJS in watch mode"
	@echo "  make nest-build          - Build NestJS project"
	@echo "  make nest-lint           - Lint NestJS project"
	@echo "  make nest-test           - Run unit tests"
	@echo "  make nest-test-e2e       - Run e2e tests"
	@echo "  make nest-generate       - Generate NestJS artifact (NAME=service user)"

# Prisma commands with pnpm
prisma-init:
	pnpm prisma migrate dev --name $(NAME)

prisma-generate:
	pnpm prisma generate

prisma-migrate:
	pnpm prisma migrate dev

prisma-studio:
	pnpm prisma studio

prisma-push:
	pnpm prisma db push

prisma-reset:
	pnpm prisma migrate reset

# NestJS commands with pnpm
nest-start:
	pnpm nest start

nest-start-dev:
	pnpm nest start --watch

nest-build:
	pnpm nest build

nest-lint:
	pnpm nest lint

nest-test:
	pnpm nest test

nest-test-e2e:
	pnpm nest test:e2e

nest-generate:
	pnpm nest generate $(NAME)
