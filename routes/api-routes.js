const router = require("express").Router();
const Workout = require("../models/workoutSchema.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .sort({ date: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        { _id: params.id },
        {
            $push: {
                exercises: body
            }
        }).then(dbWorkout => {
            res.json(dbWorkout)
        }).catch(err => {
            res.status(400).json(err);
        })
})

router.get("/api/workouts/range", function (req, res) {
    Workout.find({})
        .limit(5)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});


module.exports = router;
