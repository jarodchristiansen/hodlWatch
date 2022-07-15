import { useMediaQuery } from "react-responsive";
import { DeviceConsts } from "../Consts";

export const isMobile = () => {
  const device = useMediaQuery({
    query: DeviceConsts.IS_MOBILE_QUERY,
  });

  return device;
};
