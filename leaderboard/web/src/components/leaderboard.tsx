import { LeaderboardFetch, LeaderboardOrder, LeaderboardRemoveElements, LeaderboardUpsert } from "@gomomento/sdk-core";
import { getNewLeaderboard } from "../utils/momento-web";
import Board, {RankedElement} from "./board";
import Form from "./form";
import { useEffect, useRef, useState } from 'react';

export default function Leaderboard() {
  const leaderboard = useRef(getNewLeaderboard());
  const [elements, setElements] = useState(Array<RankedElement>); 
  const [leaderboardOrder, setLeaderboardOrder] = useState(LeaderboardOrder.Ascending);

  async function fetchElementsWithRank(order: LeaderboardOrder) {
    const updatedElements = await leaderboard.current.fetchByScore({order});
    if (updatedElements instanceof LeaderboardFetch.Success) {
      setElements(updatedElements.values());
    } else {
      throw new Error(updatedElements.toString());
    }   
  }

  async function upsertElements(element: Record<number, number>) {
    const upsertResponse = await leaderboard.current.upsert(element);
    if (upsertResponse instanceof LeaderboardUpsert.Error) {
      throw new Error(upsertResponse.toString());
    }
    await fetchElementsWithRank(leaderboardOrder);
  }

  async function removeElement(elementId: number) {
    const upsertResponse = await leaderboard.current.removeElements([elementId]);
    if (upsertResponse instanceof LeaderboardRemoveElements.Error) {
      throw new Error(upsertResponse.toString());
    }
    await fetchElementsWithRank(leaderboardOrder);
  }

  useEffect(() => {
    async function fetchData() {
      await fetchElementsWithRank(leaderboardOrder);
    }
    fetchData();
  }, [leaderboardOrder]);

  return (
    <div className="p-2 m-2 flex flex-wrap lg:flex-nowrap justify-center">
      <Board elements={elements} />
      <Form 
        rankOrder={leaderboardOrder} 
        onToggleRankOrder={setLeaderboardOrder} 
        onUpsert={upsertElements} 
        onRemoveElement={removeElement} 
      />
    </div>
  );
}