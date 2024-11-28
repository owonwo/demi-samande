import React, { type JSX } from "react";

type MarqueeProps = {
  text: JSX.Element | string;
  className: string;
  direction?: "rtl" | "ltr";
};

const Marquee = ({ text, className, direction = "rtl" }: MarqueeProps) => {
  const content = <p className={`${className} marquee-text`}>{text}</p>;

  return (
    <div className="marquee-container">
      <div className="marquee marquee-style">
        {content}
        {content}
      </div>

      <div className="marquee marquee-style">
        {content}
        {content}
      </div>

      <div className="marquee marquee-style">
        {content}
        {content}
      </div>

      <div className="marquee marquee-style">
        {content}
        {content}
      </div>

      <style>{`
        .marquee-style {
          --play: running;
          --duration: 35s;
          --delay: 0s;
          --margin-right: 1.98864px;
          --pause-on-hover: paused;
          --pause-on-click: running;
          --flow-direction: ${direction === "ltr" ? "reverse" : ""};
        }

        .marquee-container {
          overflow: hidden !important;
          display: flex !important;
          flex-direction: row !important;
          position: relative;
          padding: 1.2rem 0;
        }

        .marquee-container:hover div {
          animation-play-state: var(--pause-on-hover);
        }

        .marquee-container:active div {
          animation-play-state: var(--pause-on-click);
        }

        .marquee {
          display: flex;
          margin: 0 10px;
          flex-direction: row;
          margin-right: var(--margin-right);
          flex-shrink: 0;
          animation: scroll var(--duration) linear var(--delay) infinite;
          animation-play-state: var(--play);
          animation-delay: var(--delay);
          animation-direction: var(--flow-direction);
        }

        .marquee-text {
          transition: all 5s linear;
          padding: 0 2rem;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0.8%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export const MarqueeContainer = React.memo(function MarqueeContainerMemo({
  speed,
  children,
}: {
  speed: number;
  children: React.ReactNode;
}) {
  return (
    <div className="marquee-container">
      <div className="marquee marquee-style">
        {children}
        {children}
      </div>

      <div className="marquee marquee-style">
        {children}
        {children}
      </div>

      <div className="marquee marquee-style">
        {children}
        {children}
      </div>

      <div className="marquee marquee-style">
        {children}
        {children}
      </div>

      <style>{`
        .marquee-style {
          --play: running;
          --direction: normal;
          --duration: ${speed * 1000}ms;
          --delay: 0s;
          --margin-right: 1.98864px;
          --pause-on-hover: paused;
          --pause-on-click: running;
        }

        .marquee-container {
          overflow: hidden !important;
          display: flex !important;
          flex-direction: row !important;
          position: relative;
        }

        .marquee-container:hover div {
          animation-play-state: var(--pause-on-hover);
        }

        .marquee-container:active div {
          animation-play-state: var(--pause-on-click);
        }

        .marquee {
          display: flex;
          margin: 0 10px;
          flex-direction: row;
          margin-right: var(--margin-right);
          flex-shrink: 0;
          animation: scroll var(--duration) linear var(--delay) infinite;
          animation-play-state: var(--play);
          animation-delay: var(--delay);
          animation-direction: var(--direction);
        }

        .marquee-text {
          transition: all 5s linear;
          padding: 0 2rem;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0.8%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
});

export default Marquee;
