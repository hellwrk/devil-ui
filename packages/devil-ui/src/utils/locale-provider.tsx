import { createContext, useContext, useMemo, type ReactNode } from "react";

export interface DevilTranslations {
  layerDialog: {
    close: string;
    cancel: string;
  };
}

export type DevilTranslationsPartial = {
  [Key in keyof DevilTranslations]?: Partial<DevilTranslations[Key]>;
};

const defaultTranslations: DevilTranslations = {
  layerDialog: {
    close: "Close",
    cancel: "Cancel",
  },
};

const DevilLocaleContext = createContext<DevilTranslations>(defaultTranslations);

export interface DevilLocaleProviderProps {
  children: ReactNode;
  /**
   * Partial overrides for Devil's built-in English copy. Components without an
   * override continue to use their English defaults.
   */
  translations?: DevilTranslationsPartial;
}

/**
 * Supplies translations for Devil-owned UI copy. Explicit component props take
 * precedence over these defaults.
 */
export function DevilLocaleProvider({
  children,
  translations,
}: DevilLocaleProviderProps) {
  const value = useMemo<DevilTranslations>(
    () => ({
      layerDialog: {
        ...defaultTranslations.layerDialog,
        ...translations?.layerDialog,
      },
    }),
    [translations],
  );

  return (
    <DevilLocaleContext.Provider value={value}>
      {children}
    </DevilLocaleContext.Provider>
  );
}

/** @internal Used by Devil components to resolve translated built-in copy. */
export function useDevilLocale(): DevilTranslations {
  return useContext(DevilLocaleContext);
}
