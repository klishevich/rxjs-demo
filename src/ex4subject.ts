import { from, Subject } from "rxjs";
import { multicast } from "rxjs/operators";

// example 1 The Subject is Observable
// const subject = new Subject<number>();
//
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });
//
// subject.next(1);
// subject.next(2);

// Example 2. The Subject is Observer
// const subject = new Subject<number>();
//
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });
//
// const observable = from([1, 2, 3]);
//
// observable.subscribe(subject); // You can subscribe providing a Subject

// Example 3. Multicasting

const source = from([1, 2, 3]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
multicasted.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

// This is, under the hood, `source.subscribe(subject)`:
// @ts-ignore
multicasted.connect();
