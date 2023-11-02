import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Card } from './Draggable'
import assets from '../assets'


// const style = {
//   width: 400,
// }

export interface Item {
  id: number
  text: string
}

export interface ContainerState {
  cards: Item[]
}

export const Container: FC = () => {
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
        <div className='gallary__main'>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}

