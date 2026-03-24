import {
  formatPercentage,
  numberWithCommas,
} from "@/helpers/formatters/thousands";
import { FormatUnixTimeWithTime } from "@/helpers/formatters/time";
import { currencyFormat } from "@/helpers/formatters/currency";
import { Drawer, DrawerGrid, DrawerItem } from "./AssetCard.styled";

/** Expandable grid of ATH/ATL, supply, and date fields. */
export function AssetCardDetailsDrawer({
  isExpanded,
  ath,
  atl,
  ath_change_percentage,
  atl_change_percentage,
  ath_date,
  atl_date,
  circulating_supply,
  total_supply,
}: {
  isExpanded: boolean;
  ath: number;
  atl: number;
  ath_change_percentage: number;
  atl_change_percentage: number;
  ath_date: unknown;
  atl_date: unknown;
  circulating_supply: number;
  total_supply: number;
}) {
  return (
    <Drawer aria-hidden={!isExpanded} data-open={isExpanded}>
      <DrawerGrid>
        <DrawerItem>
          <span className="k">All-time high</span>
          <span className="v">
            {typeof ath === "number" ? currencyFormat(ath) : "—"}
          </span>
        </DrawerItem>
        <DrawerItem>
          <span className="k">All-time low</span>
          <span className="v">
            {typeof atl === "number" ? currencyFormat(atl) : "—"}
          </span>
        </DrawerItem>
        <DrawerItem>
          <span className="k">ATH change</span>
          <span className="v">
            {typeof ath_change_percentage === "number"
              ? formatPercentage(ath_change_percentage)
              : "—"}
          </span>
        </DrawerItem>
        <DrawerItem>
          <span className="k">ATL change</span>
          <span className="v">
            {typeof atl_change_percentage === "number"
              ? formatPercentage(atl_change_percentage)
              : "—"}
          </span>
        </DrawerItem>
        <DrawerItem>
          <span className="k">ATH date</span>
          <span className="v">
            {ath_date ? FormatUnixTimeWithTime(ath_date) : "—"}
          </span>
        </DrawerItem>
        <DrawerItem>
          <span className="k">ATL date</span>
          <span className="v">
            {atl_date ? FormatUnixTimeWithTime(atl_date) : "—"}
          </span>
        </DrawerItem>
        <DrawerItem>
          <span className="k">Circulating</span>
          <span className="v">
            {typeof circulating_supply === "number"
              ? numberWithCommas(circulating_supply)
              : "—"}
          </span>
        </DrawerItem>
        <DrawerItem>
          <span className="k">Total supply</span>
          <span className="v">
            {typeof total_supply === "number"
              ? numberWithCommas(total_supply)
              : "—"}
          </span>
        </DrawerItem>
      </DrawerGrid>
    </Drawer>
  );
}
