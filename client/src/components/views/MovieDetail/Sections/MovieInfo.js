import React from 'react'
import {Descriptions, Badge } from 'antd';

function MovieInfo(props) {

    let {movie} = props;
    return (
        <Descriptions title="영화 정보" bordered>
            <Descriptions.Item label="제목">{movie.title}</Descriptions.Item>
            <Descriptions.Item label="개봉날짜">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="수익($)">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="상영시간(분)">{movie.runtime}</Descriptions.Item>
            <Descriptions.Item label="영화 평점" span={2}>{movie.vote_average}</Descriptions.Item>
            <Descriptions.Item label="평가 수">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="개봉상태">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="인기도">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
