import React from 'react'
import { formatDate, tagColor } from '../../helpers/tools';
// @ts-ignore
import ArrowRight from '../../images/right-arrow.svg'

type CardContentSectionDataType = {
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
    heroArticle: boolean
};

const CardContentSection = ({data, heroArticle=false}: CardContentSectionDataType) => {
    return (
        <div>
            {data?.tags && (
                <span className={`uppercase text-xs ${heroArticle ? 'lg:text-base' : ''} w-full block text-white rounded p-1 pl-4`}
                style={{
                    backgroundColor: tagColor(data.tags).bg,
                }}>
                    {data.tags}
                </span>
            )}
            {
                data?.title && (
                    <h2 className={`${heroArticle ? 'pt-5' : 'pt-4'} text-text-color-primary content-item__title ${heroArticle ? '' : 'lg:text-3xl'}`}>{data.title}</h2>
                )
            }
            {
                data?.summary && (
                    <p className={`${heroArticle ? 'pt-5' : 'pt-4'} hidden md:block mb-0 text-text-color-primary opacity-90 ${heroArticle ? '' : 'lg:text-lg'}`}>{data.summary}</p>
                )
            }
            {data?.publishedDate && data?.readingTime && (
                <div className={`${heroArticle ? 'pt-5' : 'pt-4'} flex flex-row gap-2 items-center`}>
                    <p className='text-sm text-text-color-primary mb-0 opacity-90'>{formatDate(data?.publishedDate)}</p>
                    <div className='h-1 w-1 rounded bg-primary-color opacity-90'></div>
                    <p className='text-sm text-text-color-primary mb-0 opacity-90'>{data.readingTime}</p>
                </div>
            )}

            {heroArticle && (
                <div className={`text-text-color-primary hidden md:block font-semibold pt-5  text-sm flex-row content-item__cta`}>
                    Read Article <img src={ArrowRight} className="inline-block ml-1" alt="" width={15} height={10} />
                </div>
            )}
        </div>
    )
}

export default CardContentSection