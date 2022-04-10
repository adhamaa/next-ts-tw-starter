import * as React from 'react';
import toast from 'react-hot-toast';

import useLoadingToast from '@/hooks/toast/useLoadingToast';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

export default function useWithToast(
  swr,
  { runCondition = true, ...customMessages } = {}
) {
  const { data, error } = swr;

  const toastStatus = React.useRef(data ? 'done' : 'idle');

  const toastMessage = {
    ...DEFAULT_TOAST_MESSAGE,
    ...customMessages,
  };

  React.useEffect(() => {
    if (!runCondition) return;

    // if toastStatus is done,
    // then it is not the first render or the data is already cached
    if (toastStatus.current === 'done') return;

    if (error) {
      toast.error(toastMessage.error, { id: toastStatus.current });
      toastStatus.current = 'done';
    } else if (data) {
      toast.success(toastMessage.success, { id: toastStatus.current });
      toastStatus.current = 'done';
    } else {
      toastStatus.current = toast.loading(toastMessage.loading);
    }

    return () => {
      toast.dismiss(toastStatus.current);
    };
  }, [
    data,
    error,
    runCondition,
    toastMessage.error,
    toastMessage.loading,
    toastMessage.success,
  ]);

  return { ...swr, isLoading: useLoadingToast() };
}