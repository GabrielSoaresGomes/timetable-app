const express = require('express');
const router = express.Router();

const Schedule = require('../logic/schedules');

const schedule = new Schedule();

router.get('/teacher', async (req, res) => {
    const teacherCreated = await schedule.listTeacher(req.query);
    res.json(teacherCreated);
});

router.post('/teacher', async (req, res) => {
    const teacherCreated = await schedule.createTeacher(req.body);
    res.json(teacherCreated);
});

router.get('/room', async (req, res) => {
    const teacherCreated = await schedule.listRoom(req.query);
    res.json(teacherCreated);
});

router.post('/room', async (req, res) => {
    const teacherCreated = await schedule.createRoom(req.body);
    res.json(teacherCreated);
});

router.post('/', async (req, res) => {
    const scheduleCreated = await schedule.registerSchedule(req.body);
    res.json(scheduleCreated);
});

router.get('/', async (req, res) => {
    const schedules = await schedule.listSchedules();
    res.json(schedules);
});

module.exports = router;