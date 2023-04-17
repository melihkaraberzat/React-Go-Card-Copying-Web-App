import React from "react"
import { useState } from "react"
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Body(props){
    const [isVisible, setIsVisible] = useState(false); // text'in visibilitysi
    const [title,setTitle] = useState('New title');    // title new title dan hello worlde dönmesi
    const [imageUrl,setImageUrl] = useState("");       // kullanacağımız image'in url ini tutan 
    const [hasFetchedImage,setHasFetchedImage]=useState(false); // fetchlenen bir img var ise + işaretinin divden kalkması
    const [isTextGenerated,setIsTextGenerated] = useState(false) // generate edilen bir img ve text var ise yeşil ışığın yanması
    const [cardData, setCardData] = useState({}); 
    const [text,setText] = useState('');
    const [image,setImage] = useState(null)
    
    
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];  // localden img yüklediğimizde background img'a set ediyoruz
        setImage(selectedFile);     
        const url = URL.createObjectURL(selectedFile)
        setImageUrl(url)
        setHasFetchedImage(true)
    }
    
    const handleSubmit = async () => {
        const imageRef = ref(storage, "images/" + image.name);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        console.log(url);
        fetchPost(url);
      };


    const toggleVisibility = () => { //  text visibility'si kontrol ediliyor
        setIsVisible(!isVisible);
        setIsTextGenerated(true)
      };
    
    
    const changeTitle = () =>{
        setTitle('Hello World')
    }
    
    const callBothFuncs=()=>{
        toggleVisibility();
        changeTitle();

    }
    
    
    const handleFillCard = () => {
        const newCardData = {
            title: title,
            img: imageUrl,
            text: text,
        };
        setCardData(newCardData);
        props.onCardData(newCardData);
    };

    const textChangeHandler = (e) =>{ // textareadaki değer her değiştiğinde güncelleyecek.
        setText(e.target.value)
    }
    
    const resetCard = () => {
        
        setTitle("New title");
        setImageUrl("");
        setHasFetchedImage(false);
        setIsVisible(false);
        setText('');
        setIsTextGenerated(false);
        setCardData({});
      };

    
    const fillAndReset = () =>{  
        handleFillCard();
        handleSubmit();
        resetCard();
        
    }

    
    
    function fetchPost(){
        const imageRef = ref(storage,`images/${image.name}`); // post request gönderdiğimiz metod, yukarıda handleSubmit'te çağırıyorum
        getDownloadURL(imageRef).then((url) => {
                fetch('http://localhost:8080/casestudy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'title': title,
                    'description': text,
                    'imageuri': url 
                })
            });
        });
    }


    return (
        <div id="container">
            
            <div id="body">
                <div id ="title">{title}</div>
                <div id = "image" onChange={handleImageChange}  style={{backgroundImage:`url(${imageUrl})`,backgroundSize:"200px 200px"}}>
                    <input id = "imageaddbutton" type="file"  style={{backgroundImage:`url(${imageUrl})`,backgroundSize:"200px 200px"}} ></input>
                {!hasFetchedImage && (
                    <>
                    <div id="image2"></div>
                    <span>Görsel</span>
                    </>
                )}
                </div>
                <h2 onClick={callBothFuncs}>{title}</h2>
                {isVisible && <div id="text"><textarea id="textinput" onChange={textChangeHandler}></textarea></div>}
                {isVisible && hasFetchedImage && <div id="checkbutton" onClick={fillAndReset} style={{backgroundColor:"green"}}></div>}
            </div>
            
        </div>
    )
}

