import { Database } from '../../src/controllers/database';
import { Card } from '../../src/models/card';

describe('Database', () => {
  beforeAll(async () => {
    await Database.start();
  });

  afterEach(async () => {
    Database.db.run('DELETE FROM cards');
  });

  afterAll(() => {
    Database.db.close();
  });

  describe('createCard', () => {
    it('should create a new card in the database', async () => {
      const card: Omit<Card, 'id'> = {
        title: 'Test Card 1',
        content: 'This is a test card 1',
        list: 'todo',
      };

      const createdCard = await Database.createCard(card);

      expect(createdCard).toEqual(expect.objectContaining(card));
      expect(createdCard.id).toBeDefined();
    });
  });

  describe('readCards', () => {
    it('should return an empty array when there are no cards in the database', async () => {
      const cards = await Database.readCards();

      expect(cards).toEqual([]);
    });

    it('should return an array with all cards in the database', async () => {
      const card1: Card = {
        title: 'Test Card 1',
        content: 'This is a test card 1',
        list: 'todo',
      };
      const card2: Card = {
        title: 'Test Card 2',
        content: 'This is a test card 2',
        list: 'inprogress',
      };

      await Database.createCard(card1);
      await Database.createCard(card2);

      const cards = await Database.readCards();

      expect(cards.length).toEqual(2);
    });
  });

  describe('updateCard', () => {
    it('should update a card successfully', async () => {
      const card: Card = await Database.createCard({
        title: 'Test Card',
        content: 'This is a test card',
        list: 'todo',
      });

      const updatedCard: Card = await Database.updateCard(card.id, {
        title: 'Updated Test Card',
        content: 'This is an updated test card',
        list: 'done',
      });

      expect(updatedCard).toEqual({
        id: card.id,
        title: 'Updated Test Card',
        content: 'This is an updated test card',
        list: 'done',
      });
    });

    it('should throw a 404 error when the card is not found', async () => {
      const invalidId = 'invalid-id';

      try {
        await Database.updateCard(invalidId, { title: 'Test' });
      } catch (e) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Not found.');
      }
    });
  });

  describe('deleteCard', () => {
    it('should delete an existing card', async () => {
      const createdCard = await Database.createCard({
        title: 'Test Card',
        content: 'This is a test card',
        list: 'todo',
      });

      await expect(Database.deleteCard(createdCard.id)).resolves.toBeUndefined();

      await expect(Database.readCards()).resolves.toEqual([]);
    });

    it('should throw a 404 error when the card is not found', async () => {
      const invalidId = 'invalid-id';

      try {
        await Database.deleteCard(invalidId);
      } catch (e) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Not found.');
      }
    });
  });
});