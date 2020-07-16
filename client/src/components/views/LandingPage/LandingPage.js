import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...response.results])
            setMainMovieImage(response.results[0])
        })

    }, [])

    return (
        <div style={{width : '100%', margin: '0'}}>
            {/*main image*/}
            {MainMovieImage &&                 
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${setMainMovieImage.backdrop_path}`}
                title={MainMovieImage.title}
                text={MainMovieImage.overview} 
                />
            }
                <div style = {{width : '85%', margin:'1rem auto'}}>
                    <h2>최신 영화</h2>
                    <hr />
                    {/*movie grid card */}
                </div>
                <div style ={{display : 'flex', justifyContent: 'center'}}>
                    <button>더보기</button>
                </div>
            </div>
    )
}

export default LandingPage
