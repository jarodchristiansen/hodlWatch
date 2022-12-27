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
  }, []);

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
    }, [data?.getCollectiveStats, router?.asPath, favoriteCount]);

  return (
    <CommunityStatsContainer>
      <h4>Community Insights:</h4>

      <div>
        <div>
          <h5>Favorited by {favoriteCount} users</h5>
        </div>

        <div>
          <h5>Favorited by {favoriteToUserRatio?.toFixed(2) + "%"} of users</h5>
        </div>

        <div>
          <h5>
            Composes {favoriteToFollowedRatio?.toFixed(2) + "%"} of followed
            assets
          </h5>
        </div>

        <div>
          <h5>
            {isTopAsset ? "Is " : "Is not "}
            in the top 5 community assets
          </h5>
        </div>
      </div>
    </CommunityStatsContainer>
  );
};

const CommunityStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
`;

export default CollectiveStatsId;
