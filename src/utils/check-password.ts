import { zxcvbnAsync, zxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnLanguageCommon from "@zxcvbn-ts/language-common";
import zxcvbnTranslations from "@zxcvbn-ts/language-en/dist/translations";

// IMPROVEMENT: find a way to include the language-en package without increasing the bundle size too much.

const options = {
  translations: zxcvbnTranslations,
  graphs: zxcvbnLanguageCommon.adjacencyGraphs,
  dictionary: { ...zxcvbnLanguageCommon.dictionary },
};

zxcvbnOptions.setOptions(options);

export default function checkPassword(input: string) {
  return zxcvbnAsync(input);
}
