const router = require('express').Router();

let roll = 0

router.post('/four', (req, res) => {

    roll = Math.floor(Math.random() * 4 + 1)

    res.json({roll})

});

router.post('/six', (req, res) => {



    

});

router.post('/eight', (req, res) => {



    

});

router.post('/ten', (req, res) => {



    

});

router.post('/twelve', (req, res) => {



    

});

router.post('/twenty', (req, res) => {



    

});

router.post('/custom', (req, res) => {



    

});

module.exports = router