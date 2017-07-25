# Variables

target_container ?= php
php_sources ?= .
js_sources ?= Resources/public/js/editor
css_sources ?= Resources/public/css/editor-*.css

# Bash Commands

.PHONY: command
command:
	docker-compose run --rm $(target_container) $(cmd)


# NodeJs commands

.PHONY: npm-install
npm-install:
	docker-compose run --rm node npm install $(options)

.PHONY: karma
karma:
	docker-compose run --rm node ./node_modules/karma/bin/karma start $(options)

.PHONY: gulp
gulp:
	docker-compose run --rm node gulp $(task)

.PHONY: eslint
eslint:
	docker-compose run --rm node eslint $(js_sources)

.PHONY: eslint
csslint:
	docker-compose run --rm node csslint $(css_sources)

# PHP commands

.PHONY: composer-update
composer-update:
	docker-compose run --rm php composer update

.PHONY: composer-install
composer-install:
	docker-compose run --rm php composer install

.PHONY: phploc
phploc:
	docker run -i -v `pwd`:/project jolicode/phaudit bash -c "phploc $(php_sources); exit $$?"

.PHONY: phpcs
phpcs:
	docker run -i -v `pwd`:/project jolicode/phaudit bash -c "phpcs $(php_sources) --extensions=php --ignore=vendor,app/cache,Tests/cache    --standard=PSR2; exit $$?"

.PHONY: phpcpd
phpcpd:
	docker run -i -v `pwd`:/project jolicode/phaudit bash -c "phpcpd $(php_sources); exit $$?"

.PHONY: phpdcd
phpdcd:
	docker run -i -v `pwd`:/project jolicode/phaudit bash -c "phpdcd $(php_sources); exit $$?"


# Symfony bundle commands

.PHONY: phpunit
phpunit: ./vendor/bin/phpunit
	docker-compose run --rm php ./vendor/bin/phpunit --coverage-text
