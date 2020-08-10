import React, {useEffect} from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const moiveRunTime = props.movieInfo.runTime

    useEffect(() => {

        let variables={
            userFrom,
            movieId
        }
        Axios.post('/api/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {

                } 
                else {
                    alert('숫자 정보를 가져오는데 실패했습니다')
                }
            })
    }, [])

    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}
export default Favorite