.PHONY: pac bash composer-add-github-token composer-update mysql-export mysql-import command

npm-install:
	docker-compose run node bash -c "npm install; exit $$?"

gulp:
	docker-compose run node bash -c "gulp $(task); exit $$?"
