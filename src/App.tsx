import React, { Suspense, useContext } from "react";
import { LanguageContext } from "./shared/contexts/LanguageContext";
import { Switch, Route } from "react-router-dom";
import FullscreenFallback from "./shared/components/UI/Fallback/FullscreenFallback";
import TokenListContextProvider from "./shared/contexts/TokenListContext";
const Tokens = React.lazy(() => import("./tokens/pages/index"));

function App() {
  const dir = useContext(LanguageContext);
  const { isRTL } = dir;
  let routes;

  routes = (
    <Suspense fallback={<FullscreenFallback />}>
      <Switch>
        <Route path="/" component={Tokens} exact />
      </Switch>
    </Suspense>
  );
  return (
    <TokenListContextProvider>
      <main dir={isRTL ? "rtl" : "ltr"} className="flex flex-col h-full">
        {routes}
      </main>
    </TokenListContextProvider>
  );
}

export default App;
