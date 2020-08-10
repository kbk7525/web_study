import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [casts, setCasts] = useState([])
    const [actorToggle, setactorToggle] = useState(false)

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })

    }, [])

    const toggleActorView = () => {
        setactorToggle(!actorToggle)
    }

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
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <Favorite   movieInfo={Movie}   movieId={movieId}  userFrom={localStorage.getItem('userId')}/>
                </div>
                {/*movie info*/}
                <MovieInfo
                    movie={Movie}
                />
                <br />
                {/*배우*/}

                <div style = {{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}> 배우 </button>
                </div>

                {actorToggle && 
                    <Row gutter={[16, 16]}>
                        {casts && casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}original${cast.profile_path}`:null}            
                                        actorName={cast.name}
                               />
                            </React.Fragment>
                        ))}
                    </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetail
