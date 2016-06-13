# redux-elm-form

Sample app based on [redux-elm-skeleton](https://github.com/salsita/redux-elm-skeleton) which integrates [redux-elm](https://github.com/salsita/redux-elm) with [redux-form](https://github.com/erikras/redux-form).

App has HMR support but form is cleared on each update.

This app uses external service http://putsreq.com for submitting the form (see: `src/hello-form/effects`). **Before using** make sure that the endpoint defined by `url` constant exists (e.g. by opening url in browser) if not make new putsreq bin (it is easy) and update `url` constant.

Because `redux-form` breaks Elm Architecture it is not possible to get form state from `hello-form` updater. It is required to pass all necessary data inside event attributes. Possible workaround/solution might be [redux-spy](https://github.com/erikras/redux-spy) but it's not implemented in this sample app.

Of course form name has to be unique which **will cause trouble** if you try to have multiple instances of form component.

## Usage

```
npm install
npm start
open http://localhost:3000
```
