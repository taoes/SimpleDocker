import {NavigateFunction} from "react-router/lib/hooks";
import {Params} from "react-router";

export default interface RouterInfo {
  navigate: NavigateFunction,
  params: Params
}