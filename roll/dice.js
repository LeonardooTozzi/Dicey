const router = require('express').Router();
const COMMON_DICES = require('../Util/consts')

/**
 * Simulates a custom dice roll.
 * @example
 * {
    "dice":12, -- would be a D12
    "bonus":1,
    "penalty":1
    }
 * @field dice = Number of faces that the dice has
 * @field bonus = Number that can be added to the roll, must be an Integer not a Float
 * @field penalty = Number that can be subtracted of the roll, must be an Integer not a Float
 * @return result of the randomized number of faces
*/

router.post('/roll', (req, res) => {

    const { 
        dice, 
        bonus = 0,
        penalty = 0 
    } = req.body;

    // Validate the conditions

    if (typeof bonus !== "number" && bonus % 1 === 0) { 
        return res.json({ response:"Invalid value for bonus, the bonus must be an Integer"});
    }

    if (typeof penalty !== "number" && penalty % 1 === 0) {
        return res.json({ response:"Invalid value for penalty, the penalty must be an Integer"});
    }

    if (!COMMON_DICES.TYPE_OF_DICE.includes(dice)) {
        return res.json({response:`The Dice of ${dice} sides is not supported, Please insert a valid one`});
    }

    // Procced with the roll

    const totalRoll = Math.floor(Math.random() * dice) + 1 + bonus - penalty;

    res.json({ total: totalRoll });
    
});

/**
 * Simulates a custom dice roll.
 * @example
 * {
        "dices":{
            "12":2, -- This would be a D12 rolled twice
            "10":1
        }
    }
 * @field dices = Object containing the dices as keys and rolls as their values
 * @field dicesArray 
    [
        0 = {sides: 10, rolls: 1}
        1 = {sides: 12, rolls: 2}
    ]
 * @return result of the randomized number of faces
*/

router.post('/multiRoll', (req, res, next) => {

    const dicesObject = req.body.dices; 

    const bonus = req.body.bonus || 0

    const penalty = req.body.penalty || 0

    if (typeof bonus !== "number" && bonus % 1 === 0) { 
        return res.json({ response:"Invalid value for bonus, the bonus must be an Integer"});
    }
    
    if (typeof penalty !== "number" && penalty % 1 === 0) {
        return res.json({ response:"Invalid value for penalty, the penalty must be an Integer"});
    }
    
    // Transform the key / value into and array of objects 

    const dicesArray = Object.entries(dicesObject).map(([sides, rolls]) => ({ 
        sides: Number(sides),
        rolls: rolls
    }));


    let totalRoll = 0;

    // Using a for..of loop to get each instance of the dice objects we have

    for (const { sides, rolls } of dicesArray) {

        if (!COMMON_DICES.TYPE_OF_DICE.includes(sides)) {
            return res.json({response:`The Dice of ${sides} sides is not supported, Please insert a valid one`});
        }

        for (let j = 0; j < rolls; j++) {
            totalRoll += Math.floor(Math.random() * sides) + 1;
        }

    }

    if(totalRoll + bonus - penalty < 0){

        throw new Error("Invalid Penalty, greater than possible roll");

    }

    res.json({ total: totalRoll + bonus - penalty });

});

module.exports = router
