import { ReactTyped } from "react-typed";

function TypedText({ className }: { className: string }) {
  return (
    <div className={className}>
      <ReactTyped
        strings={[
          "Hold on to life's precious moments—forever.",
          "Capture and relive your moments.",
          "Your stories, saved here."
        ]}
        typeSpeed={60}
        backSpeed={40}
        loop
      />
    </div>
  );
}

export default TypedText;
