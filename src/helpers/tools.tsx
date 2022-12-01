import React from "react";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

export const options = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <b className="font-bold">{text}</b>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node: any, children: any) => {
      const { uri } = node.data;
      return (
        <a href={uri} className="underline">
          {children}
        </a>
      );
    },
    [BLOCKS.HEADING_1]: (node: any, children: any) => {
      return <h1>{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node: any, children: any) => {
      return <h2>{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node: any, children: any) => {
      return <h3>{children}</h3>;
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      return <p>{children}</p>;
    },
  },
};

type handleInputChangeType = (
  e: any,
  setValue: (arg: string) => void,
  setInputValue: (arg: string) => void
) => void;

export const handleInputChange: handleInputChangeType = (
  e,
  setValue,
  setInputValue
) => {
  setValue(e.target.value);
  setInputValue(e.target.value);
};
