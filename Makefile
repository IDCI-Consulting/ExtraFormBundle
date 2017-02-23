# Variables

target_container ?= php
sources ?= Configuration Constraint Controller DependencyInjection Entity Event Exception Form Type Validator

# Bash Commands

.PHONY: command
command:
	docker-compose run --rm $(target_container) $(cmd)

# NodeJs commands

.PHONY: npm-install
npm-install:
	docker-compose run --rm node npm install

.PHONY: gulp
gulp:
	docker-compose run --rm node gulp $(task)

# PHP commands

.PHONY: composer-update
composer-update:
	docker-compose run --rm php composer update

.PHONY: composer-install
composer-install:
	docker-compose run --rm php composer install

.PHONY: phploc
phploc:
	docker run -i -v `pwd`:/project jolicode/phaudit bash -c "phploc $(sources); exit $$?"

.PHONY: phpcs
phpcs:
	docker run -i -v `pwd`:/project jolicode/phaudit bash -c "phpcs $(sources) --standard=PSR2; exit $$?"

.PHONY: phpcpd
phpcpd:
	docker run -i -v `pwd`:/project jolicode/phaudit bash -c "phpcpd $(sources); exit $$?"

.PHONY: phpdcd
phpdcd:
	docker run -i -v `pwd`:/project jolicode/phaudit bash -c "phpdcd $(sources); exit $$?"

# Symfony bundle commands

.PHONY: phpunit
phpunit: ./vendor/bin/phpunit
	docker-compose run --rm php ./vendor/bin/phpunit --coverage-text