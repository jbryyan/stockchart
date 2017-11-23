import Request from 'superagent';

const apiSearch = (stockCode) => new Promise((resolve, reject) => {
  console.log("About to do api call");
  //let apiUrl = `https://www.quandl.com/api/v3/datasets/WIKI/${stockCode}/data.json?column_index=1&start_date=2017-01-01&api_key=zceFUw_gkp_mba6LuFnw`; 
  let apiUrl = 'https://stockchart.glitch.me/updateClients';
  Request.post(apiUrl)
  .send( { code: stockCode })
  .then((res, err) => {
    if(err) {
      reject(err);
    } else {
      resolve(JSON.parse(res.text));
    }
  });
});

export default apiSearch;