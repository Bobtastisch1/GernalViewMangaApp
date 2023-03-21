import { useState } from "preact/hooks";

export default function Countdown(props: { target: string }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    console.log("Hello World");
    setClicked(true);
  };

  if (clicked) {
    // Render the component only when it's clicked.
    return <span>🎉</span>;
  }

  return <span onClick={handleClick}>Click me!</span>;
}