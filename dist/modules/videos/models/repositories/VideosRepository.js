"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const mysql_1 = require("../../../../mysql");
const uuid_1 = require("uuid");
class VideoRepository {
    create(request, response) {
        const { user_id, title, description } = request.body;
        mysql_1.pool.getConnection((error, connection) => {
            connection.query('INSERT INTO vídeos(vídeo_id, user_id, title, description) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), user_id, title, description], (error, result, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json(error);
                }
                response.status(200).json({ message: "Vídeo enviado com sucesso" });
            });
        });
    }
    getVideos(request, response) {
        const { user_id } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM vídeos WHERE user_id = ?', [user_id], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: 'Erro ao buscar videos' });
                }
                return response.status(200).json({ message: 'Vídeos retornados com sucesso', videos: results });
            });
        });
    }
    searchVideos(request, response) {
        const { search } = request.query;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM vídeos WHERE description LIKE ?', [`%${search}%`], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: 'Erro ao buscar videos' });
                }
                return response.status(200).json({ message: 'Vídeos retornados com sucesso', videos: results });
            });
        });
    }
}
exports.VideoRepository = VideoRepository;
