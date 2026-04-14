import React from 'react'

export type CardItemDataType = {
    title: string,
    description: {
        description: string
    }
}

const CardItem = ({title, description}: CardItemDataType) => {

  return (
    <article className='flex flex-col gap-2 lg:gap-4 card-item'>
      {title && 
        <h3 className='font-bold lg:min-h-[70px] 2xl:min-h-[40px] mb-0'>{title}</h3>
      }
      {description?.description && 
        <p>{description.description}</p>
      }
    </article>
  )
}

export default CardItem