import { useRef } from "react";

const defaultState = {
  targets: {},
  sequence: [],
  active: -1,
  options: {
    filterByMounted: false,

    scrollOptions: { behavior: "smooth", offset: 0 },
  },
};

let state = { ...defaultState };

export default function useScroll() {
  const scrollTo = (id, options = state.options.scrollOptions) => {
    const scrollTarget = state.targets[id]?.current;

    if (!scrollTarget) {
      return;
    }

    state.active = id;
    const top =
      scrollTarget.getBoundingClientRect().top +
      window.pageYOffset +
      options.offset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const setSequence = (...sequence) => {
    state.sequence = sequence;
  };

  const setOptions = ({ offset, filterByMounted }) => {
    state.options = {
      ...state.options,
      filterByMounted,
      scrollOptions: { ...state.scrollOptions, offset },
    };
  };

  const createScrollTarget = (id) => {
    const ref = useRef(null);
    state.targets[id] = ref;

    return { ref };
  };

  const start = () => {
    scrollTo(state.sequence[0]);
  };

  const next = () => {
    if (!state.sequence?.length) {
      return;
    }

    const sequence = state.options.filterByMounted
      ? state.sequence.filter((targetId) =>
          Boolean(state.targets[targetId]?.current)
        )
      : state.sequence;

    const activeIndex = sequence.indexOf(state.active);

    if (activeIndex === -1) {
      scrollTo(state.sequence[0]);
    } else if (activeIndex + 1 < sequence.length) {
      scrollTo(sequence[activeIndex + 1]);
    }
  };

  const reset = () => {
    state = { ...defaultState };
  };

  return {
    setOptions,
    createScrollTarget,
    setSequence,
    start,
    next,
    reset,
  };
}
