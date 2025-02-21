import React from 'react'

import SectionTitle from '../SectionTitle/SectionTitle';
import FaqItem from './FaqItem';
import { FaqItemDataType } from './FaqItem';

type FaqContainerDataType = {
    data: {
        title: string;
        faqSingleItem: FaqContainerDataType[];
    };
};

const FaqContainer = ({data}: FaqContainerDataType) => {
    return (
        <section className="page-container bg-tertiary-color">
            {data.title && <SectionTitle title={data.title} />}
            <div>
                {data.faqSingleItem.map((item: any) => (
                    <FaqItem data={item} key={item.question}/>
                ))}
            </div>
        </section>
    )
}

export default FaqContainer