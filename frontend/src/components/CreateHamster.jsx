import React from 'react'
import { useState } from 'react'
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { createHamster } from '../api/api';
import './CreateHamster.css'

export default function CreateHamster() {
  const [name, getName] = useState()
  const [age, getAge] = useState()
  const [favFood, getFavFood] = useState()
  const [loves, getLoves] = useState()
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }

  const handleSubmitTwo = async (e) => {
    e.preventDefault()
    const newHamster = {
      name: name,
      age: age,
      favFood: favFood,
      loves: loves,
      imgName: imgUrl,
      wins: 0,
      defeats: 0,
      games: 0
    }
    const matchCreated = await createHamster(newHamster);
    matchCreated ? navigate('/gallery') : console.log('Error')
  }
  return (
    <>
      <h1>Create Hamster</h1>
      <div className='flexBox'>
        <section className='hamsterForm'>
          <div className='flex'>
            <form onSubmit={handleSubmitTwo} style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Name:</label>
              <input type="text"
                required
                onChange={(e) => getName(e.target.value)}
              />
              <label>Age:</label>
              <input type="number"
                required
                onChange={(e) => getAge(e.target.value)}
              />
              <label>Favorite food:</label>
              <input type="text"
                required
                onChange={(e) => getFavFood(e.target.value)}
              />
              <label>Loves:</label>
              <input type="text"
                required
                onChange={(e) => getLoves(e.target.value)}
              />
              {imgUrl && <button disabled={!imgUrl} >Submit</button>}

            </form>
            <div className='upload'>
              {!imgUrl &&
                <form onSubmit={handleSubmit} className='controls-stacked'>
                  <label className='file'>
                    <input id='file' type='file' />
                    <span className='file-custom' ></span>
                  </label>
                  <button type='submit'>Upload</button>
                </form>

              }
              {
                !imgUrl &&
                <div className='outerbar'>
                  <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                </div>
              }
            </div>
          </div>
        </section>
      </div>

    </>
  )
}
