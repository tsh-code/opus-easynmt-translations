import { StackContext, Function, Stack } from "sst/constructs";

const LANGUAGE_PAIRS = [
  ["es", "en"],
  ["pl", "en"],
] as const;
interface UnidirectionalTranslation {
  from: string;
  to: string;
}

const getTranslatingFunction = (stack: Stack, { from, to }: UnidirectionalTranslation) => {
  const key = `${from}-${to}`;

  const fn = new Function(stack, `StaticTranslations-${key}`, {
    runtime: "container",
    handler: "packages/functions/src/preloaded-translation",
    memorySize: 6000,
    timeout: "10 minutes",
    environment: {
      FROM_LANGUAGE_CODE: from,
      TO_LANGUAGE_CODE: to,
    },
    container: {
      buildArgs: {
        LANGUAGE_CODE_PAIR: key,
      },
    },
  });

  return { key, fn };
};

export function Translations({ stack }: StackContext) {
  const translationFn = new Function(stack, "TranslationLambda", {
    runtime: "container",
    handler: "packages/functions/src/translation",
    memorySize: 6000,
    diskSize: 1024,
    timeout: "10 minutes",
  });

  const translationFns = LANGUAGE_PAIRS.map(([from, to]) =>
    getTranslatingFunction(stack, { from, to })
  );

  return { translationFn, translationFns };
}
