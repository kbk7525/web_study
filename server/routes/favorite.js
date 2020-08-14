const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) =>{

    //mongodb에서 favorite 숫자 가져오기
    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            //프론트에 숫자정보 보내주기
            res.status(200).json({success:true, favoriteNumber: info.length})
    })

})

router.post('/favorited', (req, res) =>{

    //영화를 favorite 리스트에 넣었는지 db에서 정보 가져오기
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
    //mongodb에서 favorite 숫자 가져오기
    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            //프론트에 숫자정보 보내주기
            let result = false;
            if(info.length !== 0){
                result = true
            }
            res.status(200).json({success:true, favorited: result})
    })

})


router.post('/removeFromFavorite', (req, res) =>{
    Favorite.findOneAndDelete({ movieId : req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success : true, doc})
    })

})


router.post('/addToFavorite', (req, res) =>{

    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success : true})
    })
})
module.exports = router;
