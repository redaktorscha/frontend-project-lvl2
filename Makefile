install:
	npm ci
lint:
	npx eslint .
link:
	npm link
reshim:
	asdf reshim nodejs
test:
	npm test -- --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test