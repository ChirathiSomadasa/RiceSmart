const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const dbConfig = require("./config/dbConfig");
var predictionRoute = require("./routes/prediction_route");
var userRoute = require("./routes/user_route");
var User = require("./models/User");

const app = express();

app.use(cors());  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  

//authentication
app.use((req, res, next) => {

    const email = req.body.auth_email;
    const password = req.body.auth_password;
    
    if (email != null && password != null) {

        User.findOne({ email: email, password: password }).then((doc) => {

            if (doc == null) {
                res.send({ "status": "invalid_user", "message": "This user is invalid." });
                return;
            }
            
            req.current_user = { "user_id": doc._id, "user": doc };
            next();
            return;
    
        }).catch((e) => {
            res.send("error - " + e);
            return;
        });
    
    } else {
        req.current_user = null;
        next();
    }

});

// Use the prediction route
app.use("/prediction", predictionRoute);
app.use("/user", userRoute);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Node server started at port ${port}`));
