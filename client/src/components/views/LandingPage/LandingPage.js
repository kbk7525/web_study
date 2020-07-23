import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import axios from 'axios';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [currentPage, setcurrentPage] = useState(0)

    useEffect(() => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
        fetchMovies(endpoint)

    }, [])

    const fetchMovies = (endpoint) => {

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response.results)
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setcurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${currentPage + 1}`;
        fetchMovies(endpoint)
    }

    return (
        <div style={{width : '100%', margin: '0'}}>
            {/*main image*/}
            {MainMovieImage &&                 
            <MainImage 
                image={`${IMAGE_BASE_URL}original${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.title}
                text={MainMovieImage.overview} 
                />
            }
                <div style = {{width : '85%', margin:'1rem auto'}}>
                    <h2>인기 영화</h2>
                    <hr />
                    {/*movie grid card */}
                    <Row gutter={[16, 16]}>

                    {Movies && Movies.map((movie, index) => (

                        <React.Fragment key={index}>
                             <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}original${movie.poster_path}`:null}
                                movieId={movie.id}
                                movieName={movie.title}
                             />
                        </React.Fragment>

                    ))}

                    </Row>

                </div>
                <div style ={{display : 'flex', justifyContent: 'center'}}>
                    <button onClick={loadMoreItems}>더보기</button>
                </div>
            </div>
    )
}

export default LandingPage
