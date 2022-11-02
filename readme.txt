Требования

Apache 2.4
PHP ^7.3|^8.0
Composer
Node.js ^10.16
npm


Локальное развертывание

Клонируем репозиторий в каталог, который станет корнем сайта
Открываем терминал, переходем в корень и выполняем команды:
composer install
cmp .env.example .env
Прописываем конфигурацию в файле .env
Выполняем команды:
php artisan config:clear
php artisan key:generate
Переходим в каталог ./frontend и выполняем команду:
npm install
Для сборки фронта в режиме разработки выполняем команду:
npm run start
Открываем сайт в браузере


Развертывание на боевом сервере

Заходим на сервер через ssh
Переходим в терминале в каталог, который станет корнем сайта
Клонируем репозиторий
Выполняем команды:
composer install
cmp .env.example .env
Прописываем конфигурацию в файле .env
Выполняем команды:
php artisan config:cache //Эту команду выполнять всякий раз после изменения конфига
php artisan key:generate
Развертываем сайт локально (см. выше)
Переходим в каталог ./frontend и выполняем команду:
npm run build //Сборка фронта в режиме prod
Копируем содержимое каталога ./public/app/ с локальной машины на боевой сервер в <корень сайта>/public/app
Развертывание через Docker
Склонировать репозиторий в пустую папку.
Выполнить команду:

cp .env.example .env


Прописать конфигурацию в файле .env
Выполнить команды:

docker-compose build
docker-compose up -d
docker exec lk-sensat bash -c 'composer install && cd ./frontend && npm install'
chmod -R 777 ./storage


Для запуска сборки фронта в режиме разработки выполнить команду:

docker exec lk-sensat bash -c 'cd ./frontend && npm run start'


Для продуктовой сборки фронта выполнить команду:

docker exec lk-sensat bash -c 'cd ./frontend && npm run build'
