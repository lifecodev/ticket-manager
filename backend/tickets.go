package backend

import (
	"errors"
)

func (a *App) CreateTicket(title, description string, userID uint) (*Ticket, error) {
	if a.currentUser == nil {
		return nil, errors.New("вы не авторизованы")
	}

	ticket := Ticket{
		Title:			title,
		Description:	description,
		UserID:			userID,
		Status:			"open",
	}

	if err := a.db.Create(&ticket).Error; err != nil {
		return nil, err
	}
	return &ticket, nil
}

func (a *App) GetAllTickets() ([]Ticket, error) {
	
	if a.currentUser == nil {
		return nil, errors.New("вы не авторизованы")
	}

	var tickets []Ticket
	// Preload("User") автоматически подгрузит данные создателя тикета
	if err := a.db.Preload("User").Find(&tickets).Error; err != nil {
		return nil, err
	}
	return tickets, nil
}

func (a *App) UpdateTicketStatus(ticketID uint, newStatus string) error {
	if a.currentUser == nil {
		return errors.New("вы не авторизованы")
	}

	return a.db.Model(&Ticket{}).Where("id = ?", ticketID).Update("status", newStatus).Error
}
