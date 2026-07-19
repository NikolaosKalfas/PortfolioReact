import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'


type CardImageSectionDataType = {
  data: {
      gatsbyImageData: any;
      title: string;
  };
  heroArticle: boolean
};

const CardImageSection = ({data, heroArticle=false}: CardImageSectionDataType) => {

  return (
    <div className={`relative aspect-video ${heroArticle ? 'md:aspect-square lg:aspect-[4/3]' : ''} h-full w-full`}>
        {heroArticle && (
            <span className='hidden md:block p-2 pt-1 pb-1 left-5 top-5 absolute bg-secondary-color text-white rounded text-xs z-20'>LATEST</span>
        )}
        <GatsbyImage
            image={data?.gatsbyImageData}
            alt={data?.title}
            className="content-item__img absolute inset-0 h-full w-full"
            style={{ position: "absolute" }}
            imgStyle={{objectFit: 'cover'}}
        />
        {heroArticle && (
            <div className="hidden md:block absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(26,50,82,0.10), transparent)" }}
            />
        )}
        
    </div>
  )
}

export default CardImageSection