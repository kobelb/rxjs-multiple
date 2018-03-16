const Rx1 = require('./rxjs-1');
const Rx2 = require('./rxjs-2');

const process$ = Rx1.Observable.of(1)
  .mergeMap(i => {
    return Rx2.Observable.create(observer => {
      observer.next(i)

      return () => {
        console.log('teardown');
      };
    }).map(i => i);
  });


const stop$ = Rx1.Observable.timer(1, 0);

process$.takeUntil(stop$).subscribe(
  i => console.log(`next: ${i}`),
  err => console.log(`error: ${err}`),
  () => console.log('complete')
);
