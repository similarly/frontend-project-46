test:
	npm run test
lint: 
	npx eslint .
test-coverage:
	npm test -- --coverage --coverageProvider=v8
install:
	npm ci