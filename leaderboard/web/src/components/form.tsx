import { LeaderboardOrder } from "@gomomento/sdk-core";
import { useState } from "react";

type Props = {
  rankOrder: LeaderboardOrder,
  onToggleRankOrder: (order: LeaderboardOrder) => void,
  onUpsert: (element: Record<number, number>) => void,
  onRemoveElement: (elementId: number) => void,
}

export default function Form(props: Props) {
  const [elementId, setElementId] = useState(0);
  const [elementScore, setElementScore] = useState(0);

  function upsertElement() {
    const element: Record<number, number> = {
      [elementId]: elementScore,
    }
    props.onUpsert(element);
  }

  function removeElement() {
    props.onRemoveElement(elementId);
  }

  return (
    <div className="w-fit bg-stone-100 rounded-xl m-1 p-4">
      <div className="flex justify-left flex-wrap my-1 p-2">
        <label className="w-full">Sort by rank:</label>
        <div className="flex w-1/2">
          <input 
            type="radio" 
            value={LeaderboardOrder.Ascending} 
            name="sort-by-rank" 
            checked={props.rankOrder === LeaderboardOrder.Ascending} 
            onChange={event => props.onToggleRankOrder(event.currentTarget.value as LeaderboardOrder)}
          />
          <label className="ml-2">Ascending</label>
        </div>
        <div className="flex w-1/2">
          <input 
            type="radio" 
            value="DESC" 
            name="sort-by-rank" 
            checked={props.rankOrder === LeaderboardOrder.Descending} 
            onChange={event => props.onToggleRankOrder(event.currentTarget.value as LeaderboardOrder)} 
          />
          <label className="ml-2">Descending</label>
        </div>
      </div>

      <div className="flex justify-left my-1 p-2">
        <label className="w-1/3">Element ID</label>
        <input 
          type="number" 
          className="rounded-lg" 
          onChange={event => setElementId(Number(event.currentTarget.value))} 
        />
      </div>

      <div className="flex justify-left my-1 p-2">
        <label className="w-1/3">Score</label>
        <input 
          type="number" 
          className="rounded-lg"
          onChange={event => setElementScore(Number(event.currentTarget.value))}  
        />
      </div>
      
      <div className="flex justify-center">
        <button 
          className="m-1 rounded-lg p-2 border-2 border-solid border-lime-900 hover:bg-lime-700/25" 
          onClick={() => upsertElement()}
        >
          Add/Update
        </button>
        <button 
          className="m-1 rounded-lg p-2 border-2 border-solid border-orange-700 hover:bg-orange-700/25" 
          onClick={() => removeElement()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}