enum ENV {
  LOCAL = "local",
  PROD = "prod",
}

const env: string = "prod";

let baseURL = "";

switch (env) {
  case ENV.LOCAL:
    baseURL = "http://localhost:5000";
    break;
  case ENV.PROD:
    baseURL = "https://infinite-inlet-13830.herokuapp.com";
    break;
  default:
    baseURL = "https://infinite-inlet-13830.herokuapp.com";
    break;
}

export default baseURL;
