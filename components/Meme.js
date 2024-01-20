import React from "react"

export default function Meme() {
    //const [memeImage, setMemeImage] = React.useState("http://i.imgflip.com/1bij.jpg")
    // using state to obtain top text and bottom text
    // initial image is uploaded
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])


    // fetch the API 
    // making use of useEffect to get Memes
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
        return () => {
            
        }
    }, [])
    
    // meme image is obtained randomly
    // use of spread for continuing from previous meme to next meme through the use of url
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url  
        }))
    }
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))   
    }
    // return a top text and bottom text 
    // have a meme button to obtain next meme
    // text written in bottom text and top text boxes shows up inside of the meme box along with image
    return (
        <main>
            <div className="form">
                    <input 
                        type="text" 
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Bottom text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                > 
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}