import { Subway } from "./";
import { React } from 'react';
import ReactDOM from "react-dom";

export const initHandlers = (aggregate, cmdHandlers, evtHandlers) => {
  cmdHandlers &&
    cmdHandlers.forEach(({ command, handler, onError = null }) => {
      aggregate.reactToCommand(command, handler, onError);
    });
  evtHandlers &&
    evtHandlers.forEach(({ command, handler, onError = null }) => {
      aggregate.reactToEvent(command, handler, onError);
    });
};

// NOTE provide helper in the library itself?
export const initAggregates = aggregates => {
  aggregates.forEach(
    ({ name, initialState = {}, cmdHandlers = [], evtHandlers = []}) => {
      const _agg = Subway.createAggregate(name, initialState);
      initHandlers(_agg, cmdHandlers, evtHandlers);
    }
  );
  aggregates.forEach(({ bootstrap = () => {} }) => bootstrap());
};


export const publishComponent = (
  publisherName, componentName, Component
) => {
  Subway
    .selectAggregate(publisherName)
    .publicChannel()
    .publishComponent(componentName, {
      mount: (props, container) => {
        ReactDOM.render(<Component {...props} />, container);
      },
      unmount: (container) => {
          ReactDOM.unmountComponentAtNode(container);
      }
    });
};
