package main

import (
	"fmt"
	"time"
	"net/http"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/gin-contrib/cors"
)


type TbCasestudy struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Title       string `gorm:"not null" json:"title"`
	Description string `gorm:"not null" json:"description"`
	Imageuri    string `gorm:"not null" json:"imageuri"` 
	Createddate time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"createddate"`
}

var DB *gorm.DB

func Baglan(){
	db,err := gorm.Open(postgres.Open("postgres://depixen:depixen-pass@localhost:5439/postgres?sslmode=disable"),&gorm.Config{})
	if err!=nil{
	fmt.Println("Error connecting to database")
	}
	DB = db
	DB.Table("tb_casestudy").AutoMigrate(&TbCasestudy{})
	
}

func veriekle(c *gin.Context){
	var casestudy TbCasestudy
	c.BindJSON(&casestudy)
	result := DB.Table("tb_casestudy").Create(&casestudy)
	if result.Error!=nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add book"})
		return
	}
	c.JSON(http.StatusOK, casestudy)
}

func main(){
	Baglan()
	router:= gin.Default()
	router.Use(cors.Default())
	router.POST("/casestudy",veriekle)
	router.Run("localhost:8080")
}