test:
	npm test
lint: 
	npx eslint .
test-coverage:
	# npm test -- --coverage --coverageProvider=v8
	NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage --coverageProvider=v8
install:
	npm ci