import { zxcvbnAsync, zxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnLanguageCommon from "@zxcvbn-ts/language-common";
import zxcvbnLanguageEn from "@zxcvbn-ts/language-en";

const options = {
  translations: zxcvbnLanguageEn.translations,
  graphs: zxcvbnLanguageCommon.adjacencyGraphs,
  dictionary: { ...zxcvbnLanguageCommon.dictionary, ...zxcvbnLanguageEn.dictionary },
};

zxcvbnOptions.setOptions(options);

export default function checkPassword(input: string) {
  return zxcvbnAsync(input);
}
