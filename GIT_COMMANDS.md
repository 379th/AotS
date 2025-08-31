# 🚂 Git команды для Shadow Quest

## 📋 Правильные Git команды

### 🎭 Проект: Shadow Quest
### 👨‍💻 Автор: Vladimir Lakshman Das
### 📅 Дата: Декабрь 2024

---

## ❌ Неправильная команда
```bash
git add branch  # ❌ Это неправильно!
```

## ✅ Правильные команды

### 1. Добавление файлов в Git
```bash
# Добавить все файлы
git add .

# Добавить конкретный файл
git add filename.txt

# Добавить несколько файлов
git add file1.txt file2.txt

# Добавить все файлы определенного типа
git add *.tsx
```

### 2. Создание ветки
```bash
# Создать новую ветку и переключиться на неё
git checkout -b Workapp_02

# Создать ветку без переключения
git branch Workapp_02

# Переключиться на существующую ветку
git checkout Workapp_02
```

### 3. Полный рабочий процесс для Workapp_02

#### Шаг 1: Создание ветки
```bash
git checkout -b Workapp_02
```

#### Шаг 2: Добавление изменений
```bash
# Добавить все изменения
git add .

# Или добавить конкретные файлы
git add frontend/src/
git add *.md
git add *.bat
git add *.ps1
```

#### Шаг 3: Создание коммита
```bash
git commit -m "feat: добавить файлы для ветки Workapp_02"
```

#### Шаг 4: Отправка в GitHub
```bash
# Первая отправка новой ветки
git push -u origin Workapp_02

# Последующие отправки
git push origin Workapp_02
```

---

## 🚀 Автоматические скрипты

### Windows (Batch)
```bash
.\git-add-branch.bat
```

### Windows (PowerShell)
```bash
.\git-add-branch.ps1
```

---

## 📁 Структура файлов для добавления

### Документация
- `HISTORY.md`
- `conversation-history.md`
- `RAILWAY_BRANCHES.md`
- `CREATE_WORKAPP_02.md`
- `GIT_COMMANDS.md`

### Скрипты
- `create-workapp-02.bat`
- `create-workapp-02.ps1`
- `git-add-branch.bat`
- `git-add-branch.ps1`
- `save-conversation.bat`
- `save-conversation.ps1`

### Frontend файлы
- `frontend/src/` (все изменения)
- `frontend/package.json` (если изменен)
- `frontend/tsconfig.json` (если изменен)

---

## 🔄 Рабочий процесс

### 1. Проверка статуса
```bash
git status
```

### 2. Просмотр изменений
```bash
# Показать измененные файлы
git diff

# Показать добавленные файлы
git diff --cached
```

### 3. Добавление файлов
```bash
# Добавить все изменения
git add .

# Или выборочно
git add HISTORY.md
git add conversation-history.md
git add *.bat
git add *.ps1
```

### 4. Создание коммита
```bash
git commit -m "feat: добавить документацию и скрипты для Workapp_02"
```

### 5. Отправка в GitHub
```bash
git push origin Workapp_02
```

---

## 🎯 Рекомендуемые сообщения коммитов

### Для документации
```bash
git commit -m "docs: добавить руководство по Git командам"
git commit -m "docs: обновить историю проекта Shadow Quest"
```

### Для скриптов
```bash
git commit -m "feat: добавить скрипты для создания ветки Workapp_02"
git commit -m "feat: добавить автоматические скрипты для Git"
```

### Для фронтенда
```bash
git commit -m "feat: добавить новые экраны для Shadow Quest"
git commit -m "style: улучшить дизайн интерфейса"
git commit -m "fix: исправить навигацию между экранами"
```

---

## 🚨 Частые ошибки

### ❌ Неправильно
```bash
git add branch          # ❌ branch - это не файл
git add Workapp_02      # ❌ Workapp_02 - это не файл
git commit -m ""        # ❌ Пустое сообщение
```

### ✅ Правильно
```bash
git add .               # ✅ Добавить все файлы
git add *.md            # ✅ Добавить все markdown файлы
git commit -m "feat: добавить файлы"  # ✅ С сообщением
```

---

## 📊 Полезные команды

### Просмотр истории
```bash
# Краткая история
git log --oneline -10

# Подробная история
git log --graph --all

# История конкретной ветки
git log Workapp_02
```

### Сравнение веток
```bash
# Сравнить с основной веткой
git diff main..Workapp_02

# Показать только имена измененных файлов
git diff --name-only main..Workapp_02
```

### Управление ветками
```bash
# Показать все ветки
git branch -a

# Показать текущую ветку
git branch --show-current

# Удалить локальную ветку
git branch -d Workapp_02

# Удалить удаленную ветку
git push origin --delete Workapp_02
```

---

## 🎭 Специфика для Shadow Quest

### Файлы для добавления
1. **Документация**: Все .md файлы
2. **Скрипты**: Все .bat и .ps1 файлы
3. **Frontend**: Изменения в frontend/src/
4. **Конфигурация**: package.json, tsconfig.json

### Структура коммитов
- `feat:` - новые функции
- `fix:` - исправления багов
- `docs:` - документация
- `style:` - изменения стилей
- `refactor:` - рефакторинг кода

---

## 📝 Заключение

Правильная последовательность команд для добавления ветки:

1. `git checkout -b Workapp_02` - создать ветку
2. `git add .` - добавить файлы
3. `git commit -m "сообщение"` - создать коммит
4. `git push -u origin Workapp_02` - отправить в GitHub

Или используйте автоматические скрипты для упрощения процесса.

---

*Документ создан для проекта Shadow Quest*  
*Последнее обновление: Декабрь 2024*
