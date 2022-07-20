const { json } = require('express/lib/response');
let model = require('../model/noteModel');
let generator = require('../utilies/generator');
let memorystorage = require('../utilies/memory_storage');


exports.getAllNotes = (req, res) => {
    let values = memorystorage.getValues(memorystorage.store);
    console.log('values: ' + JSON.stringify(values));
    return res.status(200).send(JSON.stringify(values));
}

exports.createNote = (req, res) => {
    var seq_id = generator.generate();
    const title = req.body.title;
    const content = req.body.content;
    const createdBy = "MohamedIsmail";
    const createdAt = req.body.createdAt;
    if (!title || !content) {
        return res.status(500).send({ error: 'title and content are required fields' });
    }
    let Note = model.Note;
    const noteObj = new Note(seq_id, title, content, createdBy, new Date());
    memorystorage.store.setItem(seq_id, noteObj);
    return res.status(201).send('Create Note');
}

exports.updateNote = (req, res) => {
    const noteId = req.body.noteId;
    const title = req.body.title;
    const content = req.body.content;
    const createdBy = "MohamedIsmail";
    const createdAt = req.body.createdAt;
    if (!noteId) {
        return res.status(500).send({ error: 'noteId should not be empty' });
    }
    if (!title || !content) {
        return res.status(500).send({ error: 'title and content are required fields' });
    }
    const noteItem = memorystorage.store.getItem(noteId);
    if (!noteItem) {
        return res.status(500).send({ error: 'Please enter a valid noteId' });
    }
    let Note = model.Note;
    const noteObj = new Note(noteId, title, content, createdBy, new Date());
    memorystorage.store.setItem(noteId, noteObj);
    return res.status(200).send('Update Note');
}

exports.deleteNote = (req, res) => {
    let noteId = req.params.noteId;

    // validate not empty
    if (!noteId) {
        return res.status(500).send({ error: 'can not delete empty noteId' })
    }

    // validate is already exists
    let noteItem = memorystorage.store.getItem(noteId);
    if (!noteItem) {
        return res.status(500).send({ error: 'noteId is not exist' })
    }

    // is exits
    memorystorage.store.removeItem(noteId);
    return res.status(200).send("Successfully note deleted ");
}