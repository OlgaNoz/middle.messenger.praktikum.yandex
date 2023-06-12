# messenger-project

<p><b>Netlify:</b> https://cozy-seahorse-1cf4fe.netlify.app/</p>
<p><b>Figma layout:</b> https://www.figma.com/file/3GZLr6oO5jSXx3jHEkbCyn/Untitled?node-id=34%3A302&t=VLWItWQBw4Urc5L4-1</p>

#### Build commands
<p>npm run start - start local server on http://localhost:3000</p>
<p>npm run build - build project to ./dist</p>
<p>npm run build:dev - build project in watch mode</p>

#### Test commands
<p>npm run lint - start eslint check</p>
<p>npm run slint - start slint check</p>
<p>npm run test - start unit tests</p>

#### Test commands
<p>npm run lint - start eslint check</p>
<p>npm run slint - start slint check</p>
<p>npm run test - start unit tests</p>

Это учебный проект "Мессенджер".
На текущий момент проект сделан в виде SPA с навигацией по ключевым страницам с помощью меню
#### Компоненты
<p>Был добавлен компонентный подход, выделены следующие компоненты:</p>
<p>ActionButton - кнопка</p>
<p>Link - ссылка</p>
<p>AvatarButton - аватарка</p>
<p>ChatList - список чатов, строка поиска</p>
<p>Error - ошибка</p>
<p>Form - форма</p>
<p>Message - сообщение</p>
<p>MessageContainer - переписка в конкретном чате, поле ввода, информация о чате</p>
<p>MessagePreview - сообщение, которое отображается в списке чатов</p>

#### Функциональность

<p>1. Авторизация (регистрация (/sign-up), авторизация (/), выход из системы (выход происходит со страницы настроек пользователя))</p>
<p>2. Изменение данных пользователя: информация о пользователе, аватар, пароль (/settings). Переход на страницу осуществляется при нажатии на кебаб в на странице с мессенджером</p>
<p>3. Создание чата. Чтобы создать чат, требуется нажать на кнопку +, в появившемся модальном окне ввести название чата и сохранить.</p>
<p>4. Удаление чата. Чтобы удалить чат, требуется выбрать его в списке чатов и нажать значок корзины</p>
<p>5. Изменение чата. Чтобы изменить участников чата, требуется нажать на символ карандаша, в поисковой строке модального окна ввыодятся участники, которых можно добавить. При нажатии на крестик рядом с участником, он удаляется из чата</p>
