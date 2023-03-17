export default class Logins {
    constructor(clubeId, funcao, nome, loginId, login, senha, unidade, ativo) {
        this.clubeId = clubeId;
        this.funcao = funcao;
        this.nome = nome;
        this.loginId = loginId;
        this.login = login;
        this.senha = senha;
        this.unidade = unidade;
        this.ativo = ativo;
    }

    getClubeId() {
        return this.clubeId;
    }

    getFuncao() {
        return this.funcao;
    }

    getNome() {
        return this.nome;
    }

    getLoginnId() {
        return this.loginId;
    }

    getLogin() {
        return this.login;
    }

    getSenha() {
        return this.senha;
    }

    getUnidade() {
        return this.unidade;
    }

    getAtivo() {
        return this.ativo;
    }
}

// Firestore data converter
export const
    loginConverter = {
        toFirestore: (city) => {
            return {
                clubeId: city.clubeId,
                funcao: city.funcao,
                nome: city.nome,
                loginId: city.loginId,
                login: city.login,
                senha: city.senha,
                unidade: city.unidade,
                ativo: city.ativo

            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new Logins(data.clubeId, data.funcao, data.nome, data.loginId, data.login, data.senha, data.unidade, data.ativo);
        }
    };