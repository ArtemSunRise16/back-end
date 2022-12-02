# back-end

Проект базового Todo листа, который имеет следующие функции:

- Удалять заметки;
- Редактировать заметку;
- Менять состояние выполнения в поле done с true на false и наоборот;
- Сортировать все заметки по Дате создания, Выполненным/ Выполненным задачам;
- Выдавать текущую страницу, количество задачь на странице, а также считать общее количество задачь во всем массиве

Как "База данных" взят файл tasks.json, который находиться в gitignore и для теста необходимо его создать и поместить в папку Data, где
также будет лежать файл tasksReadWrite.js, который читает содержимое файла/парсит, а также записывает необходимую информацию в файл

/Controllers — эта папка будет содержать все функции для ваших API.
Именование файлов - xxxxx.controllers.js

/Routes — эта папка будет содержать все маршруты, которые вы создали с помощью Express Router , и то, что они делают, будет экспортировано из файла контроллера.
Именование файлов — xxxxx.[api methood].js

/Errors - это папка с стандартными ошибками.
Именование файлов — xxxxx.js

/Middleware — эта папка будет содержать все созданное вами промежуточное ПО, будь то аутентификация или какая-то другая функция.
Именование файлов - xxxxxMiddleWarexxx.js

app.js — этот файл в основном будет точкой входа в приложение Express и должен быть как можно меньше.
package.json — файл, который содержит все детали проекта npm, скрипты и зависимости.

.gitignore — файлы, которые вы не хотите отправлять в git

ЗАПРОС POST: http://localhost:config.get("serverPort")/api/process.env.API_URL_TASK

body:
{
"name": "string",
"done": Boolean,
"createdAt": "11/30/2022, 12:43:17 PM"
}

ЗАПРОС DELETE: http://localhost:config.get("serverPort")/api/process.env.API_URL_TASK/:id

ЗАПРОС PATCH: http://localhost:config.get("serverPort")/api/process.env.API_URL_TASK/:id
body:
{
"name": "string",
"done": Boolean,
"createdAt": "11/30/2022, 12:43:17 PM"
}

ЗАПРОС GET: http://localhost:config.get("serverPort")/api/process.env.API_URL_TASKs?pp=&page=&filterBy=&order

pp - количество задачь на странице
page - текущая страница
filterBy - фильтрация по выполненным (done), не выполненным (undone)
order - фильтрация asc/desc
