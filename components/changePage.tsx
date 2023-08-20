interface PageProps {
  pages: number;
  currentPage: number;
  pageTo: Function;
}

export default function ChangePage(props: PageProps) {
  const totalPage = props.pages;
  const pageGroup = Math.ceil(props.currentPage / 5);
  const pages: number[] = [];
  const currentLast = pageGroup * 5 > totalPage ? totalPage : pageGroup * 5;
  const groupFirst = currentLast >= 5 ? currentLast - 4 : 1;

  for (let i = groupFirst; i <= currentLast; i++) {
    pages.push(i);
  }
  const onPageClick: any = (event: React.ChangeEvent<HTMLElement>) => {
    return props.pageTo(+event.target.innerText);
  };
  const onFristClick = () => {
    return groupFirst === props.currentPage && groupFirst === 1
      ? alert("첫 페이지입니다.")
      : props.pageTo(1);
  };

  const onLastClick = () => {
    return currentLast === props.currentPage
      ? alert("마지막 페이지입니다.")
      : props.pageTo(props.pages);
  };

  const onNextClick = () => {
    if (currentLast + 1 > totalPage)
      if (currentLast === props.currentPage) {
        return alert("마지막 페이지입니다.");
      } else {
        return props.pageTo(currentLast);
      }
    return props.pageTo(currentLast + 1);
  };

  const onBeforeClick = () => {
    if (groupFirst - 5 < 1)
      if (groupFirst === props.currentPage) {
        return alert("첫 페이지입니다.");
      } else {
        return props.pageTo(groupFirst);
      }
    return props.pageTo(groupFirst - 5);
  };

  return (
    <ul className="flex justify-center mb-8">
      <button onClick={onFristClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button onClick={onBeforeClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      {pages.map((_, i) => (
        <li key={_} className="mx-1">
          <button
            onClick={onPageClick}
            className={props.currentPage === pages[i] ? "font-bold" : ""}
          >
            {pages[i]}
          </button>
        </li>
      ))}
      <button onClick={onNextClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <button onClick={onLastClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </ul>
  );
}
