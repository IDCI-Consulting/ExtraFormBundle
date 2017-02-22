.PHONY: pac bash composer-add-github-token composer-update mysql-export mysql-import command

npm-install:
	docker-compose run --rm node bash -c "npm install; exit $$?"

gulp:
	docker-compose run --rm node bash -c "gulp $(task); exit $$?"

composer-update:
	docker-compose run --rm php bash -c "composer update"

test:
	docker-compose run --rm php ./vendor/bin/phpunit --coverage-php