export type RankedElement = {
  id: number;
  score: number;
  rank: number;
}

type Props = {
  elements: Array<RankedElement>;
};

export default function Board(props: Props) {
  const listElements = props.elements.map(element =>
    <li key={element.id}>
      ID: {element.id} | Score: {element.score} | Rank: {element.rank}
    </li>
  );

  return(
    <ul>{listElements}</ul>
  );
}