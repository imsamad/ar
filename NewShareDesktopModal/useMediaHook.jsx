import { useMediaQuery } from "@material-ui/core";
const useMediaHook = () => {
  const isMdOrDown = useMediaQuery(`(max-width:800px)`);
  return isMdOrDown;
};

export { useMediaHook };
