const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController')

// url + handler then use in server
router.get('/notes', noteController.getAllNotes);

router.post('/notes/create', noteController.createNote);

router.put('/notes/update', noteController.updateNote);

// Request Param
router.delete('/notes/delete/:noteId', noteController.deleteNote);

module.exports = router;