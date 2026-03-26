.PHONY: help install dev start build build-dll build-main build-renderer \
       lint lint-fix lint-styles lint-styles-fix \
       test test-watch test-all test-e2e test-e2e-live \
       package package-all package-linux package-win package-mac \
       clean electron-rebuild

# Package manager (npm or yarn) - set to yarn by default
PKG_MANAGER ?= yarn

# Default target
help: ## Show this help message
	@echo "IA² Desktop App - Available targets:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ──────────────────────────────────────────────
# Setup & Installation
# ──────────────────────────────────────────────

install: ## Install project dependencies
	@$(PKG_MANAGER) install

# ──────────────────────────────────────────────
# Development
# ──────────────────────────────────────────────

dev: ## Start the development server with hot reload
	@$(PKG_MANAGER) dev

start: ## Build and start the app in production mode
	@$(PKG_MANAGER) start

build: ## Build main and renderer for production
	@$(PKG_MANAGER) build

build-dll: ## Build DLL for development
	@$(PKG_MANAGER) build-dll

build-main: ## Build main process for production
	@$(PKG_MANAGER) build-main

build-renderer: ## Build renderer process for production
	@$(PKG_MANAGER) build-renderer

electron-rebuild: ## Rebuild native Electron dependencies
	@$(PKG_MANAGER) electron-rebuild

# ──────────────────────────────────────────────
# Linting & Formatting
# ──────────────────────────────────────────────

lint: ## Run ESLint on the project
	@$(PKG_MANAGER) lint

lint-fix: ## Run ESLint and auto-fix issues
	@$(PKG_MANAGER) lint-fix

lint-styles: ## Lint CSS/SCSS files
	@$(PKG_MANAGER) lint-styles

lint-styles-fix: ## Lint and auto-fix CSS/SCSS files
	@$(PKG_MANAGER) lint-styles-fix

# ──────────────────────────────────────────────
# Testing
# ──────────────────────────────────────────────

test: ## Run unit tests
	@$(PKG_MANAGER) test

test-watch: ## Run unit tests in watch mode
	@$(PKG_MANAGER) test-watch

test-all: ## Run lint, type-check, build, and tests
	@$(PKG_MANAGER) test-all

test-e2e: ## Run end-to-end tests (requires running IA² server and exported env vars)
	@$(PKG_MANAGER) test-e2e

test-e2e-live: ## Run e2e tests with hot reload
	@$(PKG_MANAGER) test-e2e-live

# ──────────────────────────────────────────────
# Packaging
# ──────────────────────────────────────────────

package: ## Build and package for the local platform (output in /release)
	@$(PKG_MANAGER) package

package-all: ## Build and package for all platforms (macOS, Windows, Linux)
	@$(PKG_MANAGER) package-all

package-linux: ## Build and package for Linux
	@$(PKG_MANAGER) package-linux

package-win: ## Build and package for Windows (x64)
	@$(PKG_MANAGER) package-win

package-mac: ## Build and package for macOS
	@$(PKG_MANAGER) package-mac

# ──────────────────────────────────────────────
# Cleanup
# ──────────────────────────────────────────────

clean: ## Remove build artifacts
	@rm -rf release dll dist app/dist app/main.prod.js app/main.prod.js.map app/renderer.prod.js app/renderer.prod.js.map
	@echo "Build artifacts removed. Run 'make clean-all' to also remove node_modules."

clean-all: clean ## Remove build artifacts AND node_modules
	@rm -rf node_modules app/node_modules
	@echo "node_modules removed. Run 'make install' to reinstall."

