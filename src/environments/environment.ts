// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  weatherApiConf:{
    appId: 'df0b392e150a3ba2725f5e39081fe06a',
    url: 'https://api.openweathermap.org/data/2.5'
  },
  cryptoCurrencyApiConf:{
    url: 'https://min-api.cryptocompare.com/data'
  }

};
