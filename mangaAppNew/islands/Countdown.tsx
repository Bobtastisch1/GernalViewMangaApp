import { useEffect, useState } from "preact/hooks";

const timeFmt = new Intl.RelativeTimeFormat("en-US");

export default function Countdown(props: { target: string }) {
  const target = new Date(props.target);
  const [now, setNow] = useState(new Date());
  const [clicked, setClicked] = useState(false);

  // Set up an interval to update the `now` date every second with the current
  // date as long as the component is mounted and has been clicked.
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (clicked) {
      timer = setInterval(() => {
        setNow((now) => {
          if (now > target) {
            clearInterval(timer);
          }
          return new Date();
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [clicked, target]);

  // If the target date has passed, we stop counting down.
  if (now > target) {
    return <span>🎉</span>;
  }

  // Otherwise, we format the remaining time using `Intl.RelativeTimeFormat` and
  // render it.
  const secondsLeft = Math.floor((target.getTime() - now.getTime()) / 1000);
  return <span onClick={() => setClicked(true)}>{timeFmt.format(secondsLeft, "seconds")}</span>;
}
