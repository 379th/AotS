# 📚 Сохранение истории переписки - PowerShell версия
Write-Host "📚 Сохранение истории переписки..." -ForegroundColor Green
Write-Host ""

# Создаем папку для истории, если её нет
$historyFolder = "conversation-history"
if (!(Test-Path $historyFolder)) {
    New-Item -ItemType Directory -Path $historyFolder | Out-Null
}

# Получаем текущую дату и время
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$date = Get-Date -Format "yyyy-MM-dd"
$time = Get-Date -Format "HH:mm:ss"

# Создаем файл с историей
$conversationFile = "$historyFolder\conversation_$timestamp.md"
$content = @"
# 💬 История переписки - $timestamp

## 📅 Дата: $date
## 🕐 Время: $time

### 🎭 Проект: Shadow Quest
### 👨‍💻 Автор: Vladimir Lakshman Das

## 📝 Ключевые моменты беседы:

### Вопрос 1: "Как посмотреть историю нашего творчества?"
**Ответ**: Создан подробный обзор проекта Shadow Quest, включающий:
- Технологический стек (React 18 + TypeScript + Vite)
- Структуру приложения (24 экрана)
- Дизайн-концепцию (мистическая эстетика)
- Статистику разработки
- Цели проекта (психологический квест)

### Вопрос 2: "Как посмотреть историю нашей переписки?"
**Ответ**: Создание системы сохранения истории:
- Файл HISTORY.md с полным обзором проекта
- Скрипты для автоматического сохранения
- Структурированная документация

## 🎯 Инсайты из анализа:

1. **Масштаб проекта**: 24 экрана, сложная психологическая концепция
2. **Качество кода**: Хорошо структурированный React проект
3. **Дизайн**: Уникальная мистическая эстетика с готическими элементами
4. **Активность разработки**: Регулярные коммиты и улучшения

## 🚀 Технологии проекта:
- Frontend: React 18 + TypeScript + Vite
- Стилизация: Tailwind CSS
- Интеграция: Telegram WebApp SDK
- Деплой: Railway + Docker

## 📱 Основные экраны:
- IntroScreen, RequestScreen, Day1-4 Screens
- ShadowScreen, ArchetypeScreen
- DeckScreen, FaqScreen, JournalScreen
- CreatorScreen, SettingsScreen

---
*Документ создан автоматически: $timestamp*
"@

$content | Out-File -FilePath $conversationFile -Encoding UTF8

# Копируем основной файл истории
$historyFile = "$historyFolder\HISTORY_$timestamp.md"
if (Test-Path "HISTORY.md") {
    Copy-Item "HISTORY.md" $historyFile
}

Write-Host "✅ История переписки сохранена в папку: $historyFolder\" -ForegroundColor Green
Write-Host "📁 Файлы:" -ForegroundColor Yellow
Write-Host "   - conversation_$timestamp.md" -ForegroundColor Cyan
Write-Host "   - HISTORY_$timestamp.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Для просмотра истории используйте любой текстовый редактор" -ForegroundColor Blue
Write-Host "   или откройте файлы в браузере" -ForegroundColor Blue
Write-Host ""
Write-Host "🎭 Проект Shadow Quest - уникальное творение!" -ForegroundColor Magenta
