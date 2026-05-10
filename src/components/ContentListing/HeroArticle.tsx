import React from 'react'
import CardImageSection from './CardImageSection';
import CardContentSection from './CardContentSection';


type HeroArticleDataType = {
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

const HeroArticle = ({data}: HeroArticleDataType) => {
    const url = `/${data?.type}/${data?.slug}`


    console.log(data)

  return (
    <section className='content-item page-container w-full '>
        <a href={url} className='content-item__container flex flex-col md:flex-row rounded-2xl overflow-hidden
            shadow-[0_2px_16px_rgba(26,50,82,0.07)]
            hover:shadow-[0_12px_40px_rgba(26,50,82,0.13)]
            transition-shadow duration-200'
        >
            <div className='flex-1'>
                <CardImageSection data={data?.image} heroArticle={true}/>
            </div>
            <div className='flex-1 content-item__content-container p-6 md:p-12 md:self-center'>
                <CardContentSection data={data} heroArticle={true} />
            </div>
        </a>
    </section>
  )
}

export default HeroArticle

