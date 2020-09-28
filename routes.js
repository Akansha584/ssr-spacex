import HomePage from "./src/client/components/home-page/home-page";
import { loadDataSSR } from "./src/client/components/space-program-card/space-program-card";

export default [
  {
    loadDataSSR,
    path: '/',
    component: HomePage,
  }
]
