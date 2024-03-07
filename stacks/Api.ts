import { Api, StackContext, use } from "sst/constructs";
import { Translations } from "./Translations";

export function API({ stack }: StackContext) {
  const { translationFn } = use(Translations);

  new Api(stack, "translation-api", {
    routes: {
      "POST /api/translate/{languageCode}": {
        cdk: {
          function: translationFn,
        },
      },
    },
  });
}
