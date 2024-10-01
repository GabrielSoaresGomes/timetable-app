import BaseApi from './api';

class ScheduleApi extends BaseApi{
    constructor() {
        super();
    }

    async getSchedules() {
        try {
            const response = await fetch(`${this.baseUrl}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                return {
                    message: 'Não foi possível realizar a listagem de agendamentos.'
                };
            }

            return response.json();
        }catch (error){
            return console.error(`Erro ao listar agendamentos: ${error}`);
        }
    }

    async postSchedule(scheduleData) {
        try {
            const response = await fetch(`${this.baseUrl}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scheduleData)
            });

            if (!response) {
                return {
                    message: 'Não foi possível realizar o cadastro de agendamento.'
                };
            }

            return response;
        }catch (error){
            return console.error(`Erro ao cadastrar agendamento: ${error}`);
        }
    }
}

export default ScheduleApi;