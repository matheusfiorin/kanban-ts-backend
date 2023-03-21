import { Card, CardWire } from '../models/card';

export function wireToDomain(wire: CardWire): Card {
  return {
    id: wire.id,
    title: wire.titulo,
    content: wire.conteudo,
    list: wire.lista,
  };
}

export function domainToWire(card: Card): CardWire {
  return {
    id: card.id,
    titulo: card.title,
    conteudo: card.content,
    lista: card.list,
  };
}