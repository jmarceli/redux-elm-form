import boot from './boilerplate';

const run = boot('app');

const start = () => run(
  require('./hello-world/view').default,
  require('./hello-world/updater').default
);

if (module.hot) {
  module.hot.accept('./hello-world/view', start);
  module.hot.accept('./hello-world/updater', start);
}

start();
