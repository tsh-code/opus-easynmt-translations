import { StackContext, Function } from "sst/constructs";

export function Translations({ stack }: StackContext) {
  const translationFn = new Function(stack, "TranslationLambda", {
    runtime: "container",
    handler: "packages/functions/src/translation",
    memorySize: 8000,
    diskSize: 1024,
    timeout: "10 minutes",
  });

  return { translationFn };
}
