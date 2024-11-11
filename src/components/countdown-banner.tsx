export function CountdownBanner() {
  return (
    <div className={"bg-white py-2 border text-black"}>
      <div
        className={
          "flex container text-2xl mx-auto justify-between items-center"
        }
      >
        <span className={"font-heading text-"}>Pre-order ends in</span>
        <span>
          <Counter to={new Date(2024, 11, 15)} />
        </span>
      </div>
    </div>
  );
}

function Counter({ to: date }: { to: Date }) {
  return <span className={"flex font-bold font-[600]"}>15D:50M:30H:22S</span>;
}
