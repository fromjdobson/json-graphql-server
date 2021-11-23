YARN ?= $(shell which yarn)
PKG ?= $(if $(YARN),$(YARN),$(shell which npm))

.PHONY: help

help:
	@printf "\033[32mUse the make command instead.\n" && (grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\n\033[36mmake %-20s\033[0m %s\n", $$1, $$2}') && printf "\n\033[32mExample:\n\033[33mmake run example/data.js\033[0m\n\n"

install: package.json ## Install dependencies
	@$(PKG) install

watch: ## Babel Webpack auto-compiler
	NODE_ENV=development ./node_modules/.bin/webpack --watch

test: ## Launch unit tests
	@NODE_ENV=test ./node_modules/.bin/jest

watch-test: ## Launch unit tests and watch for changes
	@NODE_ENV=test ./node_modules/.bin/jest --watch

format: ## Format the source code
	@./node_modules/.bin/eslint --fix ./src

run: ## Launch json-graphql-server.
	@node ./bin/json-graphql-server.js $1

build:
	@NODE_ENV=production ./node_modules/.bin/webpack
