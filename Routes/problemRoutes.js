const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();

// Define the absolute path for problems.json
const problemsFilePath = path.join(__dirname, '../uploads/problems.json');

// Storage setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Helper function to read problems from the JSON file
const getProblems = () => {
    if (!fs.existsSync(problemsFilePath)) {
        return []; // If the file does not exist, return an empty array
    }
    const data = fs.readFileSync(problemsFilePath);
    return JSON.parse(data);
};

// Helper function to save problems to the JSON file
const saveProblem = (problem) => {
    const problems = getProblems();
    problems.push(problem);
    fs.writeFileSync(problemsFilePath, JSON.stringify(problems, null, 2)); // Indentation for readability
};

// Route to fetch all problems
router.get('/', (req, res) => {
    const problems = getProblems();
    res.json(problems);
});

// Route to submit a new problem
router.post('/', upload.single('image'), (req, res) => {
    const { description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProblem = {
        description,
        image,
        likes: 0,
        solved: false,
    };

    saveProblem(newProblem);
    res.status(200).send('Problem submitted successfully');
});

// Route to like a problem
router.post('/:id/like', (req, res) => {
    const problems = getProblems();
    const problem = problems[req.params.id];
    if (problem) {
        problem.likes += 1;
        fs.writeFileSync(problemsFilePath, JSON.stringify(problems, null, 2));
        res.status(200).send('Problem liked');
    } else {
        res.status(404).send('Problem not found');
    }
});

module.exports = router;
