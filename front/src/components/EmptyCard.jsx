
import React from "react"
import { useState } from "react"


export default function EmptyCard(props){

    return (
        
        <div id="container">
            <div id="body">
                <div id ="title">{props.cardData.title}</div>
                <div id = "image" style={{background:"#E7E7E7",backgroundImage:`url(${props.cardData.img})`,backgroundSize :"200px 200px"}} >
                
                </div>
                <h2>{props.cardData.title}</h2>
               <div id="text">{props.cardData.text}</div>
               
            </div>
        </div>
    )
}


