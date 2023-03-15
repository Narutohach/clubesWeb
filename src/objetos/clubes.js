export default class Clubes {
    constructor (clubeId, clubeNome, clubeCidade ) {
        this.clubeId = clubeId;
        this.clubeNome = clubeNome;
        this.clubeCidade = clubeCidade;
    }
    toString() {
        return this.clubeId + ', ' + this.clubeNome + ', ' + this.clubeCidade;
    }
    getName() {
        return this.clubeNome
    }

    getId() {
        return this.clubeId
    }

    getCidade() {
        return this.clubeCidade
    }
}

// Firestore data converter
export const clubeConverter = {
    toFirestore: (city) => {
        return {
            name: city.clubeId,
            state: city.clubeNome,
            country: city.clubeCidade
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Clubes(data.clubeId, data.clubeNome, data.clubeCidade);
    }
};