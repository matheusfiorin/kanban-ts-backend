import { domainToWire, wireToDomain } from '../../src/adapters/wire';
import { Card, CardWire } from '../../src/models/card';

describe('Card utilities', () => {
  const wireCard: CardWire = {
    id: '1',
    titulo: 'Card Title',
    conteudo: 'Card Content',
    lista: 'todo',
  };

  const domainCard: Card = {
    id: '1',
    title: 'Card Title',
    content: 'Card Content',
    list: 'todo',
  };

  describe('wireToDomain', () => {
    it('should convert a wire card to a domain card', () => {
      expect(wireToDomain(wireCard)).toEqual(domainCard);
    });
  });

  describe('domainToWire', () => {
    it('should convert a domain card to a wire card', () => {
      expect(domainToWire(domainCard)).toEqual(wireCard);
    });
  });
});
