import React from 'react'
import CardImageSection from './CardImageSection';
import CardContentSection from './CardContentSection';

type ArticleCardDataType = {
  data: {
    title: string;
    text: any;
    image: {
      gatsbyImageData: any;
      title: string;
    };
    tags: string;
    slug: string;
    type: string;
    summary: string;
    publishedDate: string;
    readingTime: string;
  };
};

const ArticleCard = ({data}: ArticleCardDataType) => {
    const url = `/${data?.type}/${data?.slug}`
  return (
    <article className='content-item bg-card-off-white'>
        <a href={url} className='content-item__container items-center w-full h-full flex flex-col rounded-2xl overflow-hidden
            shadow-[0_2px_16px_rgba(26,50,82,0.07)]
            hover:shadow-[0_12px_40px_rgba(26,50,82,0.13)]
            transition-shadow duration-200'
        >
            <div className='h-48 w-full'>
                <CardImageSection data={data?.image} heroArticle={false}/>
            </div>
            <div className='content-item__content-container p-6 w-full'>
                <CardContentSection data={data} heroArticle={false} />
            </div>
        </a>
    </article>
  )
}

export default ArticleCard