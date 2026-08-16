package backend

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
)

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

