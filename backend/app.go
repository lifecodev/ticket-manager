package backend

import (
	"context"
	"log"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx         context.Context
	db          *gorm.DB
	currentUser *User
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx

	// 1. Подключаемся к базе данных
	db, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Не удалось подключиться к базе данных: %v", err)
	}

	// 2. Дополнительная проверка на nil для безопасности
	if db == nil {
		log.Fatalf("Объект БД равен nil, невозможно продолжить работу")
	}

	a.db = db

	// 3. Выполняем автомиграцию
	err = a.db.AutoMigrate(&User{}, &Ticket{})
	if err != nil {
		log.Fatalf("Не удалось применить миграцию базы данных: %v", err)
	}
}
