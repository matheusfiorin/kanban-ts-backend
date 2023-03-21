import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { ExceptionHandler } from '../exceptions/handler';
import { Card } from '../models/card';

export class Database {
  static db: sqlite3.Database;

  static start(path?: string): Promise<void> {
    Database.db = new sqlite3.Database(path || ':memory:');

    return new Promise((resolve, reject) => {
      const query = `
            CREATE TABLE IF NOT EXISTS cards (
              id TEXT PRIMARY KEY,
              title TEXT NOT NULL,
              content TEXT NOT NULL,
              list TEXT NOT NULL
            )`;
      this.db.run(query, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static createCard(card: Omit<Card, 'id'>): Promise<Card> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const { title, content, list } = card;
      const query = `INSERT INTO cards (id, title, content, list) VALUES (?, ?, ?, ?)`;
      this.db.run(query, [id, title, content, list], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id, title, content, list });
        }
      });
    });
  }

  static readCards(): Promise<Card[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM cards`;
      this.db.all<Card>(query, [], (err, card) => {
        if (err) {
          reject(err);
        } else if (!card) {
          resolve([]);
        } else {
          resolve(card);
        }
      });
    });
  }

  static updateCard(id: string, card: Partial<Card>): Promise<Card> {
    return new Promise((resolve, reject) => {
      const { title, content, list } = card;
      const query = `UPDATE cards SET title = ?, content = ?, list = ? WHERE id = ?`;
      this.db.run(query, [title, content, list, id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(ExceptionHandler.createException(404, 'Not found.'));
        } else {
          resolve({ id, title: title || '', content: content || '', list: list || '' });
        }
      });
    });
  }

  static deleteCard(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM cards WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(ExceptionHandler.createException(404, 'Not found.'));
        } else {
          resolve();
        }
      });
    });
  }
}
