export type RankedElement = {
  id: number;
  score: number;
  rank: number;
}

type Props = {
  elements: Array<RankedElement>;
};

export default function Board(props: Props) {
  const tableElements = props.elements.map(element =>
    <tr key={element.id}>
      <td className="border-b border-solid border-stone-300">{element.rank}</td>
      <td className="border-b border-solid border-stone-300">{element.id}</td>
      <td className="border-b border-solid border-stone-300">{element.score}</td>
    </tr>
  );

  return(
    <div className="w-fit bg-stone-200 rounded-xl m-1 py-4 border-solid">
      <table className="table-auto text-left w-full border-collapse">
        <thead className="bg-stone-200">
          <tr>
            <th className="border-b border-solid border-stone-300">Rank</th>
            <th className="border-b border-solid border-stone-300">ID</th>
            <th className="border-b border-solid border-stone-300">Score</th>
          </tr>
        </thead>
        <tbody className="bg-stone-100">
          {tableElements}
        </tbody>
      </table>
    </div>
  );
}