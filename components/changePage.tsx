import { useState } from "react";

interface PageProps {
  pages: number;
  currentPage: number;
  pageTo: Function;
}

export default function ChangePage(props: PageProps) {
  const totalPage = props.pages;
  const pageGroup = Math.ceil(props.currentPage / 5);
  const pages = [];
  const currentLast = pageGroup * 5 > totalPage ? totalPage : pageGroup * 5;
  const groupFirst = currentLast >= 5 ? currentLast - 4 : 1;
  for (let i = groupFirst; i < currentLast + 1; i++) {
    pages.push(i);
  }

  const onPageClick: any = (event: React.ChangeEvent<HTMLElement>) => {
    props.pageTo(+event.target.innerText);
  };
  return (
    <ul className="flex justify-center">
      {pages.map((_, i) => (
        <li key={i} className="mx-2">
          <button
            onClick={onPageClick}
            className={props.currentPage === i + 1 ? "font-bold" : ""}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}
