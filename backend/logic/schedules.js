const DB = require('../config/db');

class Schedules {
    constructor() {
        this.database = new DB();
    }

    async listTeacher(scheduleTime) {
        const startSchedule = scheduleTime?.start_schedule;
        const endSchedule = scheduleTime?.end_schedule;

        const connection = await this.database.generateConnection();

        if (!startSchedule || !endSchedule) {
            const listTeacherResult = await connection.query(`SELECT * FROM teacher`);
            return listTeacherResult.rows;
        }

        const listTeacherResult = await connection.query(`
            SELECT * FROM teacher
            WHERE id NOT IN (
                SELECT teacher_id FROM schedules
                WHERE (time_start BETWEEN $1 AND $2)
                OR (time_end BETWEEN $1 AND $2)
            )
        `, [startSchedule, endSchedule]);
        return listTeacherResult.rows
    }

    async createTeacher(teacher) {
        const name = teacher?.name;

        const connection = await this.database.generateConnection();
        const createTeacherResult = await connection.query(`
            INSERT INTO teacher (name)
            VALUES ($1)
            RETURNING *
        `, [name]);
        return createTeacherResult?.rows;
    }

    async listRoom(scheduleTime) {
        const connection = await this.database.generateConnection();
        const startSchedule = scheduleTime?.start_schedule;
        const endSchedule = scheduleTime?.end_schedule;

        if (!startSchedule || !endSchedule) {
            const listRoomResult = await connection.query(`SELECT * FROM room`);
            return listRoomResult.rows;
        }

        const roomsResult = await connection.query(`
            SELECT * FROM room
            WHERE id NOT IN (
                SELECT room_id FROM schedules
                WHERE (time_start BETWEEN $1 AND $2)
                OR (time_end BETWEEN $1 AND $2)
            )
        `, [startSchedule, endSchedule]);
        return roomsResult.rows;
    }

    async createRoom(room) {
        const name = room?.name;

        const connection = await this.database.generateConnection();
        const createRoomResult = await connection.query(`
            INSERT INTO room (name)
            VALUES ($1)
            RETURNING *
        `, [name]);
        return createRoomResult?.rows;
    }

    async registerSchedule(schedule) {
        const room = schedule?.room;
        const teacher = schedule?.teacher;
        const startSchedule = schedule?.start_schedule;
        const endSchedule = schedule?.end_schedule;

        const connection = await this.database.generateConnection();

        const resultQuery = await connection.query(`
            SELECT * FROM schedules
            WHERE (teacher_id = $1 OR room_id = $2)
            AND (
                (time_start BETWEEN $3 AND $4)
                OR (time_end BETWEEN $3 AND $4)
            )
        `, [teacher, room, startSchedule, endSchedule]);
        const resultData = resultQuery.rows;

        if (resultData?.length) {
            return {
                message: 'Horário já cadastrado para este professor ou sala.'
            };
        }

        const insertResult = await connection.query(`
            INSERT INTO schedules (room_id, teacher_id, time_start, time_end)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [room, teacher, startSchedule, endSchedule]);

        return insertResult.rows;
    }

    async listSchedules() {
        const connection = await this.database.generateConnection();
        const schedulesResult =  await connection.query(`
            SELECT s.*, r.name as room_name, t.name as teacher_name
            FROM schedules s
            INNER JOIN public.room r 
            ON s.room_id = r.id
            INNER JOIN public.teacher t 
            ON t.id = s.teacher_id
        `, []);

        return schedulesResult.rows;
    }
}

module.exports = Schedules;