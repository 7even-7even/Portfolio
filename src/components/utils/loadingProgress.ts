export interface LoadingProgress {
  finish: () => Promise<void>;
  cancel: () => void;
}

export const createLoadingProgress = (
  setLoading: (value: number) => void,
): LoadingProgress => {
  let percent = 0;
  let interval: number | undefined;
  let cancelled = false;
  let resolveFinish: (() => void) | null = null;

  const update = (nextValue: number) => {
    percent = Math.min(100, Math.max(percent, nextValue));
    setLoading(percent);
  };

  interval = window.setInterval(() => {
    if (percent < 50) {
      update(percent + Math.max(1, Math.round(Math.random() * 5)));
      return;
    }

    if (percent < 92 && Math.random() > 0.5) {
      update(percent + 1);
    }
  }, 120);

  const cancel = () => {
    cancelled = true;
    window.clearInterval(interval);
    resolveFinish?.();
    resolveFinish = null;
  };

  const finish = () =>
    new Promise<void>((resolve) => {
      window.clearInterval(interval);

      if (cancelled) {
        resolve();
        return;
      }

      resolveFinish = resolve;
      interval = window.setInterval(() => {
        if (cancelled || percent >= 100) {
          window.clearInterval(interval);
          resolveFinish?.();
          resolveFinish = null;
          return;
        }

        update(percent + 2);
      }, 16);
    });

  return { finish, cancel };
};
