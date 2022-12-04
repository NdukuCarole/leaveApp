import client from "./client/client";
// import cryptor from "@/utils/cryptor";
// import { cryptorEndpoint, useCryptor } from "@/environment";
// import mocker from "axios-mock-adapter";
// import axios from "axios";

export default async function call(requestType, url, data = null) {
  // if (!useCryptor) {
  return client[requestType](url, data);
  // }

  // let payload = {
  //   method: requestType,
  //   uri: url,
  //   data: data,
  // };
  //
  // payload = cryptor.encrypt(payload, "allowme@1");
  //
  // const mock = new mocker(axios);
  // let response = {};
  //
  // client["post"](cryptorEndpoint, { payload: payload })
  //   .then((cryptedRes) => {
  //     const decrypted = cryptor.decrypt(cryptedRes.data.data, "allowme@1");
  //
  //     mock.onAny(url).reply(cryptedRes.status, decrypted);
  //
  //     client[requestType](url, data).then((r) => {
  //       response = r.data;
  //     });
  //   })
  //   .catch((err) => {
  //     mock.onAny(url).reply(err.response.statusCode, err.response.data.message);
  //     client[requestType](url, data).then((r) => {
  //       response = r.data;
  //     });
  //   });
  //
  // return response;

  //    var myBlob = new Blob();
  //     var init = { "status" : 200 , "statusText" : "SuperSmashingGreat!" }
  //     var myResponse = new Response(myBlob, init);var myBlob = new Blob();
  //     var init = { "status" : 200 , "statusText" : "SuperSmashingGreat!" }
  //     var myResponse = new Response(myBlob, init);
}
