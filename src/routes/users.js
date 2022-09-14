const db = require('../db/db')
const {body, validationResult} = require('express-validator')


module.exports = (app) => {

    const route = app.route('/users')

    route.get((req, res) => {

        db.find({}).sort({name:1}).exec( (err, users) =>{

            if(err) return app.src.utils.error.send(err, req, res)

            res.status(200).setHeader('Content-Type', 'application/json')

                res.json({
                    users
                })


        })

    })
    
    route.post(

        body('name')
            .notEmpty()
            .withMessage('name field cannot be empty'),
            
        body('email')
            .notEmpty()
            .withMessage('email field cannot be empty')
            .isEmail()
            .withMessage('email field must be filled by a valid email'),

        (req, res) => {

        db.insert(req.body, (err, user) => {

            const errors = validationResult(req)

            if(!errors.isEmpty()) return app.src.utils.error.send(errors, req, res)

            if(err) return app.src.utils.error.send(err, req, res)

            res.status(201).json(user)
            
        })
    })

    const routeId = app.route('/users/:id')

    routeId.get((req, res) => {

        db.findOne({_id: req.params.id}).exec( (err, user) =>{

            if(err) return app.src.utils.error.send(err, req, res)

            res.status(200).json(user)

        })

    })

    routeId.put(
        
        body('name')
        .notEmpty()
        .withMessage('name field cannot be empty'),
        
        body('email')
        .notEmpty()
        .withMessage('email field cannot be empty')
        .isEmail()
        .withMessage('email field must be filled by a valid email'),
        
        (req, res) => {

        
        
        db.update({_id: req.params.id}, req.body, err =>{
            console.log(req.body)
            const errors = validationResult(req)

            if(!errors.isEmpty()) return app.src.utils.error.send(errors, req, res)

            if(err) return app.src.utils.error.send(err, req, res)

            res.status(200).json(Object.assign({},req.body, req.params.id))

        })

    })

    routeId.delete((req, res) =>{

        db.remove({_id: req.params.id}, {}, err =>{

            if(err) return app.src.utils.error.send(err, req, res)

            res.status(200).json(req.params.id)

        })

    })

}