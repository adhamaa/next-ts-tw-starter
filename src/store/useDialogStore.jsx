import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import produce from 'immer';
import create from 'zustand';

const useDialogStoreBase = create((set) => ({
  awaitingPromise: {},
  open: false,
  state: {
    title: 'Title',
    description: 'Description',
    submitText: 'Yes',
    variant: 'warning',
    catchOnCancel: false,
  },
  dialog: (options) => {
    set(
      produce((state) => {
        state.open = true;
        state.state = { ...state.state, ...options };
      })
    );
    return new Promise((resolve, reject) => {
      set(
        produce((state) => {
          state.awaitingPromise = { resolve, reject };
        })
      );
    });
  },
  handleClose: () => {
    set(
      produce((state) => {
        state.state.catchOnCancel && state.awaitingPromise?.reject?.();
        state.open = false;
      })
    );
  },
  handleSubmit: () => {
    set(
      produce((state) => {
        state.awaitingPromise?.resolve?.();
        state.open = false;
      })
    );
  },
}));

const useDialogStore = createSelectorHooks(useDialogStoreBase);

export default useDialogStore;
