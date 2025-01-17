import { BrowserHistory, createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { IRoutesById } from './types';

export function Browser(props: {
  routes: IRoutesById;
  routeComponents: Record<string, any>;
  pluginManager: any;
}) {
  const historyRef = React.useRef<BrowserHistory>();
  if (historyRef.current === undefined) {
    historyRef.current = createBrowserHistory({ window });
  }
  const history = historyRef.current;
  const [state, dispatch] = React.useReducer((_: any, update: any) => update, {
    action: history.action,
    location: history.location,
  });
  React.useLayoutEffect(() => history.listen(dispatch), [history]);
  return props.pluginManager.applyPlugins({
    type: 'modify',
    key: 'rootContainer',
    initialValue: (
      <App
        navigator={history!}
        location={state!.location}
        routes={props.routes}
        routeComponents={props.routeComponents}
        pluginManager={props.pluginManager}
      />
    ),
    args: {},
  });
}

export function renderClient(opts: {
  rootElement?: HTMLElement;
  routes: IRoutesById;
  routeComponents: Record<string, any>;
  pluginManager: any;
}) {
  // @ts-ignore
  const root = ReactDOM.createRoot(
    opts.rootElement || document.getElementById('root'),
  );
  root.render(
    <Browser
      routes={opts.routes}
      routeComponents={opts.routeComponents}
      pluginManager={opts.pluginManager}
    />,
  );
}
