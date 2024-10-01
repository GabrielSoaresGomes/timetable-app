import BaseApi from './api';

class RoomApi extends BaseApi{
    constructor() {
        super();
    }

    async getRooms(dates = null) {
        try {
            let url = `${this.baseUrl}/room`;
            if ( dates?.start_date && dates?.end_date ) {
                url = `${this.baseUrl}/room?start_schedule=${dates.start_date}&end_schedule=${dates.end_date}`;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                return {
                    message: 'Não foi possível realizar a listagem de salas.'
                };
            }

            return response.json();
        }catch (error){
            return console.error(`Erro ao listar salas: ${error}`);
        }
    }

    async postRoom(roomData) {
        try {
            const response = await fetch(`${this.baseUrl}/room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomData)
            });

            if (!response) {
                return {
                    message: 'Não foi possível realizar o cadastro de uma sala.'
                };
            }

            return response.json();
        }catch (error){
            return console.error(`Erro ao cadastrar uma sala: ${error}`);
        }
    }
}

export default RoomApi;