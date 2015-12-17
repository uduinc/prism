REPORTER = spec

# Same as npm commands, just as a Makefile
lint:
	./node_modules/.bin/eslint "**/*.js" "**/.*.js"

test:
	$(MAKE) lint
	@NODE_ENV=test ./node_modules/.bin/mocha

test-cov:
	$(MAKE) lint
	./node_modules/.bin/istanbul cover \
		--config .istanbul.js \
		./node_modules/.bin/_mocha

test-coveralls:
	$(MAKE) test
	$(MAKE) lint
	./node_modules/.bin/istanbul cover \
		--config .istanbul.js \
		./node_modules/.bin/_mocha && \
		cat ./coverage/lcov.info | ./node_modules/.bin/coveralls || true

.PHONY: test