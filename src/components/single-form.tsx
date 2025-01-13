import React from "react";
import throttle from "lodash/throttle";
import * as R from "ramda";
import { cn } from "../libs/utils";
import { ArrowRight, Loader, Loader2 } from "lucide-react";

// CSS VARIABLES
// --ss-bg: white;
// --ss-btn-bg: #333;
// --ss-btn-color: #fff;
// --ss-height: 100px;
// --ss-border-width: 1px;
// --ss-text-color: #333;
// --ss-border-color: gray;
// --ss-icon-bg: whitesmoke;

export const Icons = ({
  icons,
  current,
}: { icons: React.ReactNode[]; current: number }) => {
  const reverse = (idx: number) => Math.abs(idx - (icons.length - 1));

  return (
    <div className="wg-ss__icon_holder">
      {icons.map((e, idx) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={idx}
          className={cn(
            "wg-ss__icon",
            "!inline-flex items-center justify-center",
            current > reverse(idx) ? "hide" : "",
          )}
          style={{ "--index": reverse(idx) - current }}
        >
          {e}
        </span>
      ))}
    </div>
  );
};

function useAnimation(className: string) {
  const [state, setState] = React.useState({
    isAnimating: false,
    timeout_id: 0,
  });

  const [animation, setAnimation] = React.useState(className);
  const _setAnimation = (name: string, timeout: number) => {
    clearTimeout(state.timeout_id);
    const t_id = setTimeout(() => {
      setState({ ...state, isAnimating: false });
      setAnimation("");
    }, timeout);
    setState({
      ...state,
      isAnimating: true,
      timeout_id: t_id as unknown as number,
    });
    setAnimation(name);
  };

  return {
    animation,
    isAnimating: state.isAnimating,
    setAnimation: _setAnimation,
  };
}

const toDot = R.compose(
  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
  (arr) =>
    arr.map((_, idx: number) => <span key={`dot/.${idx}`} className="dot" />),
  R.split(""),
  String,
);

export function SingleForm({
  form,
  onSubmit,
  isLoading = false,
  message = "Success!",
}: {
  form: FormProp[];
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
  isLoading: boolean;
  message: React.ReactNode | (() => React.JSX.Element);
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [fields] = React.useState(form);
  const [current, setCurrent] = React.useState(0);
  const { animation, isAnimating, setAnimation } = useAnimation("shake");
  const [values, setValues] = React.useState<
    { finished: boolean } & Record<string, unknown>
  >({
    finished: false,
  });

  const currentField = React.useMemo(() => fields[current], [fields, current]);

  const setValue = R.curry((field, evt) => {
    const { value } = evt.target;
    setValues({ ...values, [field]: value });
  });

  const validate = R.curryN(2, (current: number, event: unknown) => {
    if (isAnimating) return;

    const wiggleOnError = () => setAnimation("wiggle", 600);

    const { validator: validateValue, name } = fields[current];
    const isLast = () => fields.length - 1 === current;

    const value = String(values[name] || "");

    if (!validateValue(value)) return wiggleOnError();

    if (!isLast()) {
      if (inputRef.current) inputRef.current.value = "";
      setCurrent(current + 1);
      return;
    }

    return onSubmit(values)
      .then(() => {
        inputRef.current?.blur?.();
        if (spanRef.current) {
          spanRef.current.textContent = "";
        }

        setValues({ ...values, finished: true });
        return;
      })
      .catch(() => wiggleOnError());
  });

  const icons = React.useMemo(
    () => fields.toReversed().map((e, idx) => e.icon),
    [fields],
  );

  function onFocus() {
    if (rootRef.current) rootRef.current.setAttribute("data-focused", "");
  }

  function onBlur() {
    if (rootRef.current) rootRef.current.removeAttribute("data-focused");
  }

  const computeWidth = React.useMemo(
    () =>
      throttle(() => {
        const root = rootRef.current;
        const textBox = spanRef.current;

        if (!(root && textBox)) return;

        root.style.width = `calc(
          calc(${textBox.offsetWidth}px + 2ch) +
          calc( var(--ss-height) * 2 )
        )`;
      }, 400),
    [],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    computeWidth();
  }, [computeWidth, current, values.finished]);

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className={cn("wg-ss__input", {
        wiggle: animation === "wiggle",
        "pointer-events-none finished": values.finished,
      })}
      onClick={() => {
        if (!values.finished) {
          inputRef.current?.focus?.();
        }
      }}
      onKeyUp={() => {}}
      onKeyDown={() => {}}
    >
      <div className="wg-ss__holder">
        <Icons current={current} icons={icons} />

        <div className="wg-ss__text_holder">
          <label htmlFor="">{currentField.label}</label>

          <span id="enter" ref={spanRef}>
            {currentField.type === "password"
              ? toDot(values[fields[current].name] || "")
              : String(values[currentField.name] ?? "")}
          </span>

          <input
            ref={inputRef}
            onChange={(evt) => {
              setValue(currentField.name)(evt);
              setTimeout(() => computeWidth(), 50);
            }}
            onKeyUp={(evt) => evt.code === "Enter" && validate(current, evt)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        <button
          type="button"
          className={cn("submit !inline-flex items-center justify-center", {
            "wg-shake-animation": animation === "shake",
            "!bg-transparent": isLoading,
          })}
          onClick={(evt) => validate(current, evt)}
        >
          {isLoading ? (
            <Loader className="animate-spin" strokeWidth={1} size="2.5rem" />
          ) : (
            <ArrowRight strokeWidth={1} size="2.5em" />
          )}
        </button>
      </div>

      <div className="wg-ss__finished">
        {values.finished
          ? typeof message === "function"
            ? message()
            : message
          : null}
      </div>
    </div>
  );
}

type FormProp = {
  name: string;
  label: string;
  validator: (a: string) => boolean;
  icon: React.ReactNode;
  type: "password" | "text";
};

export default SingleForm;
