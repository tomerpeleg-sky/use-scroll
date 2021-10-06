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

const scrollIntoView = (scrollTarget, options = {}) => {
  const top =
    scrollTarget.getBoundingClientRect().top +
    window.pageYOffset +
    options.offset;

  window.scrollTo({ top, ...options });

  return scrollTarget;
};

const scrollTo = (id, options = {}) =>
  new Promise((resolve, reject) => {
    const scrollTarget = state.targets[id];

    if (!scrollTarget) {
      reject("MISSING_TARGET");
      return;
    }

    const targetOptions = {
      ...state.options,
      ...scrollTarget.options,
      ...options,
      scrollOptions: {
        ...state.options?.scrollOptions,
        ...scrollTarget.options?.scrollOptions,
        ...options?.scrollOptions,
      },
    };

    setTimeout(() => {
      if (!Boolean(scrollTarget?.ref?.current)) {
        reject("TARGET_NOT_MOUNTED");
        return;
      }

      state.active = id;

      scrollIntoView(scrollTarget.ref.current, targetOptions.scrollOptions);

      if (scrollTarget.focusRef?.current) {
        scrollTarget.focusRef.current.focus();
      } else if (scrollOptions.focus) {
        scrollTarget.ref.current.focus();
      }

      resolve("SCROLLING");
    }, targetOptions.delay || 0);
  });

const setSequence = (...sequence) => {
  state.sequence = sequence;
  return sequence;
};

const setOptions = ({ offset, filterByMounted }) => {
  state.options = {
    ...state.options,
    filterByMounted,
    scrollOptions: { ...state.options.scrollOptions, offset },
  };
  return state.options;
};

const useScrollTarget = (id, options = {}) => {
  const ref = useRef(null);
  state.targets[id] = { ...state.targets[id], ref, options };

  return { ref };
};

const useFocusTarget = (id) => {
  const ref = useRef(null);
  state.targets[id] = { ...state.targets[id], focusRef: ref };

  return { ref };
};

const start = () => {
  return scrollTo(state.sequence[0]);
};

const next = () => {
  if (!state.sequence?.length) {
    return Promise.reject("MISSING_SEQUENCE");
  }

  const sequence = state.options.filterByMounted
    ? state.sequence.filter((targetId) =>
        Boolean(state.targets[targetId]?.ref?.current)
      )
    : state.sequence;

  const activeIndex = sequence.indexOf(state.active);

  if (activeIndex === -1) {
    return scrollTo(sequence[0]);
  } else if (activeIndex + 1 < sequence.length) {
    return scrollTo(sequence[activeIndex + 1]);
  }

  return Promise.reject("REACHED_END");
};

const reset = () => {
  state = { ...defaultState };
};

export default function useScroll() {
  return {
    setOptions,
    createScrollTarget: useScrollTarget,
    createFocusTarget: useFocusTarget,
    setSequence,
    start,
    next,
    reset,
  };
}
