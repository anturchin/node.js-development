# Техническое описание API

## Обзор

Этот документ предоставляет техническое описание API для системы управления курсами.

## Общая информация

-   Базовый URL: `/api`
-   Формат данных: JSON

## Эндпоинты

### Пользователи (Users)

#### Создание нового пользователя

-   Метод: `POST`
-   Путь: `/users`
-   Описание: Создает нового пользователя.
-   Параметры запроса:
    -   `email`: string (Email пользователя)
    -   `username`: string (Имя пользователя)
    -   `password`: string (Пароль пользователя)
-   Ответ:
    -   Статус код: 201
    -   Тело ответа:
        ```json
        {
            "message": "User created successfully",
            "username": "example_user",
            "userId": "user_id",
            "role": "user"
        }
        ```

#### Получение списка всех пользователей

-   Метод: `GET`
-   Путь: `/users`
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    [
        {
            "_id": "6666fa53e91bc190685d167b",
            "email": "ann@gmai.com",
            "username": "lebowski",
            "password": "password",
            "role": "user",
            "createdAt": "2024-06-10T13:06:27.768Z",
            "updatedAt": "2024-06-10T13:06:27.768Z",
            "__v": 0
        },
        {
            "_id": "666703d95415b5c60df90481",
            "email": "alex@gmail.com",
            "username": "alex",
            "password": "pass",
            "role": "user",
            "createdAt": "2024-06-10T13:47:05.037Z",
            "updatedAt": "2024-06-10T13:47:05.037Z",
            "__v": 0
        }
    ]
    ```

#### Получение информации о пользователе по его идентификатору

-   Метод: `GET`
-   Путь: `/users/:userId`
-   Параметры запроса:
    -   `userId`: string (Идентификатор пользователя)
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    {
        "message": "Fetch user by id",
        "user": {
            "_id": "666703d95415b5c60df90481",
            "email": "alex@gmail.com",
            "username": "alex",
            "password": "pass",
            "role": "user",
            "createdAt": "2024-06-10T13:47:05.037Z",
            "updatedAt": "2024-06-10T13:47:05.037Z",
            "__v": 0
        }
    }
    ```

#### Удаление пользователя по его идентификатору

-   Метод: `DELETE`
-   Путь: `/users/:userId`
-   Параметры запроса:
    -   `userId`: string (Идентификатор пользователя)
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    { "message": "User deleted successfully" }
    ```

#### Изменить роль пользователя по его идентификатору

-   Метод: `PUT`
-   Путь: `/users/:userId/:role`
-   Параметры запроса:
    -   `userId`: string (Идентификатор пользователя)
    -   `role: 'user' | 'admin' | 'author'`
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    { "message": "User role updated successfully" }
    ```

### Курсы (Courses)

#### Получение списка всех курсов

-   Метод: `GET`
-   Путь: `/courses`
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    [
        {
            "_id": "6666fb3997f2b4d2ac33baf7",
            "title": "TypeScript",
            "description": "typing is good practice",
            "difficulty": "easy",
            "comments": ["666703305415b5c60df9047c", "6667046c5415b5c60df90483"],
            "ratings": ["666707f6cb01d06f09c451f7"],
            "createdAt": "2024-06-10T13:10:17.788Z",
            "updatedAt": "2024-06-10T14:04:38.672Z",
            "__v": 3
        }
    ]
    ```

#### Создание нового курса

-   Метод: `POST`
-   Путь: `/courses`
-   Описание: Создает новый курс.
-   Параметры запроса:
    -   `title`: string (Заголовок курса)
    -   `description`: string (Описание курса)
    -   `difficulty`: string (Сложность курса)
-   Ответ:
    -   Статус код: 201
    -   Тело ответа:
    ```json
    {
        "message": "Course created successfully",
        "courseId": "6667f818ac21cd23f9c6ef5d"
    }
    ```

#### Удаление курса по его идентификатору

-   Метод: `DELETE`
-   Путь: `/courses/:courseId`
-   Параметры запроса:
    -   `courseId`: string (Идентификатор курса)
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    {
        "message": "Course deleted successfully",
        "deletedCourse": {
            "_id": "6667f818ac21cd23f9c6ef5d",
            "title": "Node.js",
            "description": "Professional rest api development",
            "difficulty": "hard",
            "comments": [],
            "ratings": [],
            "createdAt": "2024-06-11T07:09:12.882Z",
            "updatedAt": "2024-06-11T07:09:12.882Z",
            "__v": 0
        }
    }
    ```

### Комментарии (Comments)

#### Добавление комментария к курсу

-   Метод: `POST`
-   Путь: `/courses/comments`
-   Описание: Добавляет комментарий курса.
-   Параметры запроса:
    -   `userId`: string (Идентификатор пользователя)
    -   `content`: string (Содержание комментария)
    -   `courseId`: string (Идентификатор курса)
-   Ответ:
    -   Статус код: 201
    -   Тело ответа:
    ```json
    {
        "message": "Comment added successfully",
        "newComment": {
            "userId": "6666fa53e91bc190685d167b",
            "content": "много воды в этом курсе",
            "courseId": "6666fb3997f2b4d2ac33baf7",
            "_id": "66680d406a616362692fda38",
            "createdAt": "2024-06-11T08:39:28.275Z",
            "updatedAt": "2024-06-11T08:39:28.275Z",
            "__v": 0
        }
    }
    ```

#### Получение списка комментариев к курсу по идентификатору

-   Метод: `GET`
-   Путь: `/courses/:courseId/comments`
-   Параметры запроса:
    -   `courseId`: string (Идентификатор курса)
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    [
        {
            "_id": "666703305415b5c60df9047c",
            "userId": "6666fa53e91bc190685d167b",
            "content": "this good course",
            "courseId": "6666fb3997f2b4d2ac33baf7",
            "createdAt": "2024-06-10T13:44:16.370Z",
            "updatedAt": "2024-06-10T13:44:16.370Z",
            "__v": 0
        },
        {
            "_id": "6667046c5415b5c60df90483",
            "userId": "666703d95415b5c60df90481",
            "content": "так себе курс",
            "courseId": "6666fb3997f2b4d2ac33baf7",
            "createdAt": "2024-06-10T13:49:32.750Z",
            "updatedAt": "2024-06-10T13:49:32.750Z",
            "__v": 0
        },
        {
            "_id": "66680d406a616362692fda38",
            "userId": "6666fa53e91bc190685d167b",
            "content": "много воды в этом курсе",
            "courseId": "6666fb3997f2b4d2ac33baf7",
            "createdAt": "2024-06-11T08:39:28.275Z",
            "updatedAt": "2024-06-11T08:39:28.275Z",
            "__v": 0
        }
    ]
    ```

#### Удаление комментария курса по идентификатору

-   Метод: `DELETE`
-   Путь: `/courses/comments/:commentId`
-   Параметры запроса:
    -   `commentId`: string (Идентификатор комментария)
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    {
        "message": "Comment deleted successfully",
        "deletedComment": {
            "_id": "666703305415b5c60df9047c",
            "userId": "6666fa53e91bc190685d167b",
            "content": "this good course",
            "courseId": "6666fb3997f2b4d2ac33baf7",
            "createdAt": "2024-06-10T13:44:16.370Z",
            "updatedAt": "2024-06-10T13:44:16.370Z",
            "__v": 0
        }
    }
    ```

### Оценки (Ratings)

#### Добавление оценки к курсу

-   Метод: `POST`
-   Путь: `/courses/ratings`
-   Описание: Добавляет оценку курса.
-   Параметры запроса:
    -   `userId`: string (Идентификатор пользователя)
    -   `rating`: number (Оценка курса)
    -   `courseId`: string (Идентификатор курса)
-   Ответ:
    -   Статус код: 201
    -   Тело ответа:
    ```json
    {
        "message": "Rating added successfully",
        "newRating": {
            "userId": "6666fa53e91bc190685d167b",
            "rating": 9,
            "courseId": "6666fb3997f2b4d2ac33baf7",
            "_id": "666810326a616362692fda4c",
            "createdAt": "2024-06-11T08:52:02.309Z",
            "updatedAt": "2024-06-11T08:52:02.309Z",
            "__v": 0
        }
    }
    ```

#### Получение списка оценок курса по идентификатору

-   Метод: `GET`
-   Путь: `/courses/:courseId/ratings`
-   Параметры запроса:
    -   `courseId`: string (Идентификатор курса)
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    {
        "foundRatings": [
            {
                "_id": "666707f6cb01d06f09c451f7",
                "userId": "6666fa53e91bc190685d167b",
                "rating": 5,
                "courseId": "6666fb3997f2b4d2ac33baf7",
                "createdAt": "2024-06-10T14:04:38.656Z",
                "updatedAt": "2024-06-10T14:04:38.656Z",
                "__v": 0
            },
            {
                "_id": "66680bfcb249a7d4780b1a2b",
                "userId": "6666fa53e91bc190685d167b",
                "rating": 10,
                "courseId": "6666fb3997f2b4d2ac33baf7",
                "createdAt": "2024-06-11T08:34:04.858Z",
                "updatedAt": "2024-06-11T08:34:04.858Z",
                "__v": 0
            },
            {
                "_id": "66680c07b249a7d4780b1a2f",
                "userId": "6666fa53e91bc190685d167b",
                "rating": 15,
                "courseId": "6666fb3997f2b4d2ac33baf7",
                "createdAt": "2024-06-11T08:34:15.720Z",
                "updatedAt": "2024-06-11T08:34:15.720Z",
                "__v": 0
            },
            {
                "_id": "666810326a616362692fda4c",
                "userId": "6666fa53e91bc190685d167b",
                "rating": 9,
                "courseId": "6666fb3997f2b4d2ac33baf7",
                "createdAt": "2024-06-11T08:52:02.309Z",
                "updatedAt": "2024-06-11T08:52:02.309Z",
                "__v": 0
            }
        ]
    }
    ```

#### Удаление оценки курса по идентификатору

-   Метод: `DELETE`
-   Путь: `/courses/ratings/:ratingId`
-   Параметры запроса:
    -   `ratingId`: string (Идентификатор оценки)
-   Ответ:
    -   Статус код: 200
    -   Тело ответа:
    ```json
    {
        "message": "Rating deleted successfully",
        "deletedRating": {
            "_id": "666707f6cb01d06f09c451f7",
            "userId": "6666fa53e91bc190685d167b",
            "rating": 5,
            "courseId": "6666fb3997f2b4d2ac33baf7",
            "createdAt": "2024-06-10T14:04:38.656Z",
            "updatedAt": "2024-06-10T14:04:38.656Z",
            "__v": 0
        }
    }
    ```

## Обработка ошибок

При возникновении ошибок, API возвращает соответствующий статус код и сообщение об ошибке
