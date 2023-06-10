import { GET_COLLECTIVE_STATS } from "@/helpers/queries/collective";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

interface CollectiveStatsIdProps {
  favoriteCount: number;
  id: string;
}

const CollectiveStatsId = ({ favoriteCount, id }: CollectiveStatsIdProps) => {
  const [fetchCollectiveStats, { data, loading, error, refetch, fetchMore }] =
    useLazyQuery(GET_COLLECTIVE_STATS, {
      fetchPolicy: "cache-and-network",
    });

  useEffect(() => {
    fetchCollectiveStats();
  });

  const router = useRouter();

  const [favoriteToUserRatio, favoriteToFollowedRatio, isTopAsset] =
    useMemo(() => {
      if (!data?.getCollectiveStats) return [];

      let newData = data.getCollectiveStats;

      let favoriteUserRatio = favoriteCount / newData?.user_count;
      let favoriteFollowedRatio = favoriteCount / newData?.followed_assets;

      let foundTopAsset = newData?.top_assets.filter(
        (asset) => asset.symbol.toLowerCase() === id.toLowerCase()
      );

      return [
        favoriteUserRatio * 100,
        favoriteFollowedRatio * 100,
        !!foundTopAsset.length,
      ];
    }, [data?.getCollectiveStats, favoriteCount, id]);

  return (
    <CommunityStatsContainer>
      <h4>Community Insights:</h4>

      <div>
        <h5>Favorited by</h5>
        <span>{favoriteCount} user(s)</span>
      </div>

      <div>
        <h5>Favorited by</h5>
        <span>{favoriteToUserRatio?.toFixed(2) + "%"} of user(s)</span>
      </div>

      <div>
        <h5>% of Followed Assets</h5>
        <span> {favoriteToFollowedRatio?.toFixed(2) + "%"} </span>
      </div>

      <div>
        <h5>Top 5?</h5>
        <span className="emoji-icon"> {isTopAsset ? "✔️ " : " ❌ "}</span>
      </div>
    </CommunityStatsContainer>
  );
};

const CommunityStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 8px;
  h4 {
    padding: 1rem;
  }

  div {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid black;
    padding: 1rem;

    span {
      font-weight: bold;
    }

    .emoji-icon {
      font-size: 1.5rem;
      border: 1px solid black;
    }
  }
`;

export default CollectiveStatsId;
