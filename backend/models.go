package backend

import "time"

type TicketStatus string

const (
	StatusOpen			TicketStatus = "open"
	StatusInProgress	TicketStatus = "in_progress"
	StatusClosed		TicketStatus = "completed"
)

type User struct {
	ID				uint		`json:"id" gorm:"primaryKey"` 
	Name			string 		`json:"name"`
	Login			string		`json:"login" gorm:"unique; not null"`
	PasswordHash	string		
	CreatedAt		time.Time	`json:"created_at"`
	UpdatedAt		time.Time 	`json:"updated_at"`
}

type Ticket struct {
	ID				uint		`json:"id" gorm:"primaryKey"`
	Title			string		`json:"title" gorm:"not null"`
	Description		string		`json:"description"`
	Status			string		`json:"status" gorm:"default:'open'"`
	UserID			uint		`json:"user_id"`
	User			User		`json:"user,omitempty" gorm:"foreignKey:UserID"`
	CreatedAt 		time.Time	`json:"created_at" gorm:"autoCreatetime"`		
	UpdatedAt		time.Time	`json:"updated_at" gorm:"autoUpdateTime"`
}

type Client struct {
	ID 			uint
	Name 		string
	Phone		string
	Address 	string
}


