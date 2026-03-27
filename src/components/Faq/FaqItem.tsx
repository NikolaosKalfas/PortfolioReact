import React, {useState} from 'react'
import { StaticImage } from "gatsby-plugin-image";


export type FaqItemDataType = {
    data: {
        answer: {
            answer: string;
        }
        question: string;
    }
}

const FaqItem = ({data, index}: FaqItemDataType & {index: number }) => {
    const [faqHidden, setFaqHidden] = useState(false)

    const contentId = `faq-answer-${index}`;

    return (
        <div className="text-primary-color w-full border-b">
            <button 
                className="font-bold text-3xl pt-5 pb-5 w-full flex justify-between items-center" 
                aria-expanded={faqHidden} 
                aria-controls={contentId}
                onClick={() => setFaqHidden(!faqHidden)}
            >
                {data.question}
                <StaticImage
                    src="../../images/dropdown_icon.png"
                    alt=""
                    className={`max-w-5 mt-2 transition-transform duration-500 ease-in-out ${
                        faqHidden ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>

            <div 
                id={contentId} 
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    faqHidden ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <p className="font-medium p-4">{data.answer.answer}</p>
            </div>
        </div>
    );
}

export default FaqItem