import { Api, Function, StackContext, use } from "sst/constructs";
import { Translations } from "./Translations";

export function API({ stack }: StackContext) {
  const { translationFn, translationFns } = use(Translations);

  const staticTranslationLambdas: Record<string, { function: Function }> = Object.fromEntries(
    translationFns.map(({ key, fn }) => [`POST /api/translate/${key}`, { function: fn }])
  );

  const api = new Api(stack, "translation-api", {
    routes: {
      "POST /api/translate/{languageCode}": {
        function: translationFn,
      },
      ...staticTranslationLambdas,
    },
  });
}
