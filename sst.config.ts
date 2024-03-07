import { SSTConfig } from "sst";
import { Translations } from "./stacks/Translations";
import { API } from "./stacks/Api";

export default {
  config(_input) {
    return {
      name: "easynmt-opus-translation",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(Translations);
    app.stack(API);
  },
} satisfies SSTConfig;
