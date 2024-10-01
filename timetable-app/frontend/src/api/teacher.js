import BaseApi from './api';

class TeacherApi extends BaseApi{
    constructor() {
        super();
    }

    async getTeachers(dates = null) {
        try {
            let url = `${this.baseUrl}/teacher`;
            if ( dates?.start_date && dates?.end_date ) {
                url = `${this.baseUrl}/teacher?start_schedule=${dates.start_date}&end_schedule=${dates.end_date}`;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                return {
                    message: 'Não foi possível realizar a listagem de professores.'
                };
            }

            return response.json();
        }catch (error){
            return console.error(`Erro ao listar professores: ${error}`);
        }
    }

    async postTeacher(teacherData) {
        try {
            const response = await fetch(`${this.baseUrl}/teacher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacherData)
            });

            if (!response) {
                return {
                    message: 'Não foi possível realizar o cadastro de professores.'
                };
            }

            return response.json();
        }catch (error){
            return console.error(`Erro ao cadastrar professor: ${error}`);
        }
    }
}

export default TeacherApi;