import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { Card } from './Draggable'
import assets from '../assets'
import GallaryHead from './GallaryHead'


export interface Item {
  id: number
  text: string
}

export interface ContainerState {
  cards: Item[]
}

export const Container = () => {
  {
    const [cards, setCards] = useState(assets.data)

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])

    const renderCard = useCallback(
      (card: { id: number; text: string }, index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            image={card.image}
            moveCard={moveCard}
          />
        )
      },
      [],
    )

    return (
      <>
      <GallaryHead/>
      <div className='gallary'>
        <div className='gallary__main'>{cards.map((card, i) => renderCard(card, i))}</div>
      </div>
      </>
    )
  }
}

