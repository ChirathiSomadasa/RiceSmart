var express = require("express");
var router = express.Router();
const Contact = require("../models/contact");

 

// Route to get problems based on category or fetch all if category is not provided
router.route("/get").post((req, res) => {
    var category = req.body.category;
    if (category != null) {
        Contact.find().where("category").equals(category).exec().then((result) => {
            res.send(result);
        });
    } else {
        Contact.find().sort({ date_updated: 1 }).exec().then((result) => {
            res.send(result);
        });
    }
});

// Route to get a specific problem by ID
router.route("/get_problem").post(async (req, res) => {
    if (req.current_user != null) {
        const userId = req.current_user.user_id;
        const problemId = req.body.problem_id;

        // Validate data
        if (problemId == null || problemId == "") {
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }
        
        Contact.findOne({ _id: problemId }).then((result) => {
            res.send({ status: "success", Contact: result });
        }).catch((error) => {
            res.send({ status: "invalid_problem_id", message: "Please enter valid problem ID." });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
});

// Route for admins to get all problems
router.route("/admin_get").post((req, res) => {
    if (req.current_user != null) {
        const userType = req.current_user.user.type;

        if (userType == "admin") {
            Problem.find().then((result) => {
                res.send({ status: "success", data: result });
            });
        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
});

// Route to add a new problem
router.route("/add").post((req, res) => {
    if (req.current_user != null) {
        const userType = req.current_user.user.type;

        if (userType == "admin") {
            const disease = req.body.disease;
            const desc = req.body.description;
            const category = req.body.category;
            const location = req.body.location;

            const problem = new Problem({
                disease: disease,
                description: desc,
                category: category,
                location: location,
                
            });

            problem.save().then(() => {
                res.send({ status: "success", message: "Problem added." });
            }).catch((e) => {
                res.send("error - " + e);
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
});

// Route to delete a problem
router.route("/delete").post((req, res) => {
    if (req.current_user != null) {
        const userType = req.current_user.user.type;

        if (userType == "admin") {
            const problemId = req.body.problem_id;

            if (problemId == null || problemId == "") {
                res.send({ status: "required_failed", message: "Required values are not received." });
                return;
            }

            Problem.findOneAndDelete({ _id: problemId }).then(() => {
                res.send({ status: "success", message: "Problem deleted." });
            }).catch((error) => {
                res.send({ status: "failed", message: error });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
});

// Route to update a problem's details
router.route("/update").post((req, res) => {
    if (req.current_user != null) {
        const userType = req.current_user.user.type;

        if (userType == "admin") {
            const problemId = req.body.problem_id;
            const disease = req.body.disease;
            const desc = req.body.description;
            const category = req.body.category;
            const location = req.body.location;

            if (problemId == null || problemId == "" ||
                disease == null || disease == "" ||
                category == null || category == "" ||
                location == null || location == "") {
                res.send({ status: "required_failed", message: "Required values are not received." });
                return;
            }

            Problem.findOneAndUpdate({ _id: problemId }, {
                disease: disease,
                description: desc,
                category: category,
                location: location,
                
            }).then(() => {
                res.send({ status: "success", message: "Problem updated." });
            }).catch((e) => {
                res.send(e);
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
});

module.exports = router;
