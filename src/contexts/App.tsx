import React, { createContext, useContext } from "react";
import { Constants, Store } from "utils";
import { Feedback } from "types";

interface ProvidedValueType {
  user: any;
  setUser: (user: any) => void;
  t: any;
  locale: string;
  locales: any;
  setLocale: (language: string) => void;
  feedback: Feedback | null;
  setFeedback: (feedback: Feedback | null) => void;
}

const initialState = {
  locale: "EN",
  translations: Constants.LOCALE_STRINGS[Constants.REGIONS.EN],
  locales: Object.keys(Constants.REGIONS),
  user: Store.sessionStorage.get() as any,
  feedback: null,
};

export const AppContext = createContext<ProvidedValueType>({
  user: initialState.user,
  setUser: () => {},
  t: initialState.translations,
  locale: initialState.locale,
  locales: initialState.locales,
  setLocale: () => {},
  feedback: initialState.feedback,
  setFeedback: () => {},
});

interface Props {
  initLocale: string;
  children?: React.ReactNode;
}

export const AppProvider = React.memo<Props>(
  ({ initLocale, children }: Props) => {
    const [user, setUser] = React.useState<any>(initialState.user);

    const [locale, setLocale] = React.useState<string>(initLocale);
    const [feedback, setFeedback] = React.useState<Feedback | null>(
      initialState.feedback
    );

    const setUserCallback = React.useCallback((newUser: any | null) => {
      setUser((currentUser: any | null) => {
        const user = {
          ...currentUser,
          ...newUser,
        } as any;
        if (newUser === null) {
          Store.sessionStorage.clear();
        } else {
          Store.sessionStorage.set({ ...user });
        }
        return Store.sessionStorage.get();
      });
    }, []);

    const setLocaleCallback = React.useCallback((newLocale: string) => {
      setLocale((currentLocale: string) =>
        currentLocale === newLocale ? currentLocale : newLocale
      );
    }, []);

    const setFeedbackCallback = React.useCallback(
      (newFeedback: Feedback | null) => {
        setFeedback((_: Feedback | null) => newFeedback);
      },
      []
    );

    const MemoizedValue = React.useMemo(() => {
      const value: ProvidedValueType = {
        locale,
        t: Constants.LOCALE_STRINGS[locale],
        locales: Constants.LOCALE_STRINGS[locale],
        setLocale: setLocaleCallback,
        user,
        setUser: setUserCallback,
        feedback,
        setFeedback: setFeedbackCallback,
      };
      return value;
    }, [
      locale,
      setLocaleCallback,
      user,
      setUserCallback,
      feedback,
      setFeedbackCallback,
    ]);

    return (
      <AppContext.Provider value={MemoizedValue}>
        {children}
      </AppContext.Provider>
    );
  }
);

export const useApp = () => useContext(AppContext);
