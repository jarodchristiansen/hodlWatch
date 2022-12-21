import { useMediaQuery } from "react-responsive";
import { DeviceConsts } from "../Consts";

export const isDesktop = () => {
  const device = useMediaQuery({
    query: DeviceConsts.IS_DESKTOP_QUERY,
  });

  return device;
};
