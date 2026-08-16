package backend

import (
	"context"
	"log"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx 			context.Context
	db 				*gorm.DB
	currentUser		*User
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	db, _ := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	a.db = db 
	err := a.db.AutoMigrate(&User{})
	if err != nil {
		log.Fatalf("Не удалось применить миграцию базы данных: %v", err)
	}
}
