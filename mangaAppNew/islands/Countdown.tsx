import { useState } from "preact/hooks";

export default function Countdown(props: { target: string }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event) => {
        console.log(event.target.result);
        setClicked(true);
      };
    });
    fileInput.click();
  };

  if (clicked) {
    // Render the component only when it's clicked.
    return <span>🎉🎉</span>;
  }

  return <span onClick={handleClick}>Click me!</span>;
}
