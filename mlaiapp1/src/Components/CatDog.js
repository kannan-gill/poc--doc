import React,{useState} from 'react'
import axios from 'axios'



function CatDog() {

    const [imagepath, setimagepath]=useState(null);
    const [imagepicked, setimagepicked]=useState(false);
    const [animalreveal, setanimalreveal]=useState({animal:'',probability:''});

    function handleChange(e){
        setimagepath(e.target.files[0]);
        setimagepicked(true);
    }

    function handleSubmit(){
        const fd= new FormData();
        fd.append('title',imagepath.name)
        fd.append('image', imagepath, imagepath.name);
        for (var p of fd){
            console.log(p[1]);
        }
        axios.post('http://127.0.0.1:8000/addimage',fd)
        .then(res=> {
            
            console.log(res);
            setanimalreveal(
                {...animalreveal,['animal']:res.data.animal,['probability']:res.data.prediction}
            );})
        .catch(error=>console.log(error))
    }

    return (
        <div>
            <h1>Welcome to cat dog classifier</h1>
            <div>Please upload the image to classify <input type="file" onChange={handleChange}/></div>
            <div>
                <input type="submit" name="submit" onClick={handleSubmit}/>
            </div>
            <div>And it is... {animalreveal.animal}</div>
            <div>with a probability of {animalreveal.probability}</div>
        </div>
    )
}

export default CatDog
