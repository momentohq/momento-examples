import Board, {RankedElement} from "./board";
import Form from "./form";

export default function Leaderboard() {
  const elements: Array<RankedElement> = [
    {id: 123, score: 111, rank: 0},
    {id: 456, score: 222, rank: 1},
    {id: 789, score: 333, rank: 2},
  ];
  return (
    <div>
      <Board elements={elements} />
      <Form />
    </div>
  );
}