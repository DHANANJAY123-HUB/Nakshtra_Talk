const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const apiModel = require('../models/apiModel');

router.post('/signup',
    body('mobile_no').isLength({
     min:10,
     max:10 	
    }).withMessage('mobile_no should be required..'),(req,res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
            //errors: errors.array()
            msg:'parameter required mobile_no..'
        });
    }
	apiModel.registerUser(req.body).then((result)=>{
      
        if(result){
            res.json({
                result:'true',
                msg:'mobile_no registered successfully..',
                data: result
           })
        }else{
            res.json({
               result: 'true',
        	   msg: 'mobile_no already registered please enter new mobile_no..',
               data:result
           })
        }    
        //var data = JSON.stringify(result2)
        
           /*res.json({
               result:response,
        	   msg:msg,
               data:result
           }); */
    }).catch((err)=>{
		res.json({message:err.message})
		//console.log(err)
	})
});

module.exports = router;