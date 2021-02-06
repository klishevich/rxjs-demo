import { map, mergeAll } from "rxjs/operators";
import { Observable } from "rxjs";
import * as https from "https";

// Example #2
const urlObservable = new Observable((subscriber) => {
  subscriber.next("https://github.com/VasilyVP");
  subscriber.next("https://github.com/rhymu8354");
  setTimeout(() => {
    subscriber.next("https://github.com/kvark");
    subscriber.complete();
  }, 1000);
});

// const fileObservable = urlObservable.pipe(
//     map((url) => https.get(url))
// );

const fileObservable = urlObservable.pipe(
  map(
    (url) =>
      new Observable((subscriber) => {
        https.get(url, (res) => {
          const cnt = Date.now();
          subscriber.next({
            [`id${cnt}`]: res.statusCode,
          });
        });
      })
  ),
  mergeAll()
);

fileObservable.subscribe((x) => {
  console.log("test result", x);
});
