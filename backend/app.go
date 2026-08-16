package backend

import (
	"context"
	"errors"
	//"fmt"
	"log"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type User struct {
	ID 				uint		`json:"id" gorm:"primaryKey"`
	Login 			string 		`json:"login" gorm:"unique; not null"`
	PasswordHash	string 
	Name 			string 		`json:"name"`
}


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

func (a *App) Register(login string, password string) (string, error) {
	if login == "" || password == "" {
		return "", errors.New("логин и пароль не могут быть пустыми")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", errors.New("ошибка шифрования пароля")
	}

	user := User{Login: login, PasswordHash: string(hashedPassword)}
	result := a.db.Create(&user)
	if result.Error != nil {
		return "", errors.New("пользователь с таким логином уже существует")
	}
	return "Регистрация успешна!", nil
}

func (a *App) Login(login string, password string) (*User, error) {
	var user User
	result := a.db.Where("login = ?", login).First(&user)
	if result.Error != nil {
		return nil, errors.New("неверный логин или пароль")
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return nil, errors.New("неверный логин или пароль")
	}

	a.currentUser = &user
	return a.currentUser, nil
}

func (a *App) GetMe() (*User, error) {
	if a.currentUser == nil {
		return nil, errors.New("вы не авторизованы")
	}
	return a.currentUser, nil
}

func (a *App) Logout() {
	a.currentUser = nil
}

