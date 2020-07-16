import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY , IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
        })
    }, [])

    return (
        <div>
            {/* header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}original${Movie.backdrop_path}`}
                title={Movie.title}
                text={Movie.overview} 
            />

            {/* body */}

            <div style = {{width: '85%', margin: '1rem auto'}}>
                {/*movie info*/}
                <MovieInfo
                    movie={Movie}
                />
                <br />
                {/*배우*/}

                <div style = {{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button> 배우 </button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
