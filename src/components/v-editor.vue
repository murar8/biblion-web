<script setup lang="ts">
import { StateEffect } from "@codemirror/state";
import type { ViewUpdate } from "@codemirror/view";
import { lineNumbers } from "@codemirror/view";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { EditorView, minimalSetup } from "codemirror";
import { useThemeVars } from "naive-ui";
import { changeColor } from "seemly";
import { computed, onMounted, ref, shallowRef, toRef, watch, watchEffect } from "vue";
import { isDark } from "@/composables/dark";
import { languagesByName } from "@/languages";

const props = defineProps<{
  modelValue?: string;
  readonly?: boolean;
  language?: string;
}>();

const modelValue = toRef(props, "modelValue");
const readonly = toRef(props, "readonly");
const language = toRef(props, "language");

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const themeVars = useThemeVars();

const parentRef = ref<HTMLElement | undefined>();
const editorRef = shallowRef<EditorView | undefined>();

watchEffect(() => {
  if (editorRef.value && modelValue.value !== editorRef.value!.state.doc.toString()) {
    editorRef.value!.dispatch({
      changes: { from: 0, to: editorRef.value!.state.doc.length, insert: modelValue.value },
    });
  }
});

const onUpdateContent = (viewUpdate: ViewUpdate) => {
  if (viewUpdate.docChanged && viewUpdate.state.doc.toString() !== props.modelValue) {
    emit("update:modelValue", viewUpdate.state.doc.toString());
  }
};

const extensions = computed(() => {
  const extensions = [
    minimalSetup,
    lineNumbers(),
    EditorView.updateListener.of(onUpdateContent),
    EditorView.editable.of(!readonly.value),
  ];

  if (isDark.value) extensions.push(githubDark);
  else extensions.push(githubLight);

  if (language.value) {
    const languageMode = languagesByName[language.value]?.mode;
    if (languageMode) extensions.push(languageMode);
  }

  return extensions;
});

watch(extensions, (extensions) => {
  editorRef.value!.dispatch({
    effects: StateEffect.reconfigure.of(extensions),
  });
});

onMounted(() => {
  editorRef.value = new EditorView({ parent: parentRef.value!, extensions: extensions.value });
});
</script>

<template>
  <div ref="parentRef" class="cm-root" />
</template>

<!-- Please note all the following styles are applied to the global namespace! -->

<style>
.cm-root {
  display: flex;
}

.cm-root .cm-editor {
  width: 100%;
  border: 1px solid v-bind("themeVars.borderColor");
  border-radius: v-bind("themeVars.borderRadius");
  transition: all 0.3s v-bind("themeVars.cubicBezierEaseInOut");
}

.cm-root .cm-gutters {
  border-top-left-radius: v-bind("themeVars.borderRadius");
  border-bottom-left-radius: v-bind("themeVars.borderRadius");
}

.cm-root .cm-editor:hover,
.cm-root .cm-editor.cm-focused {
  outline: none;
  border-color: v-bind("themeVars.primaryColorHover");
}

.cm-root .cm-editor.cm-focused {
  box-shadow: v-bind("`0 0 0 2px ${changeColor(themeVars.primaryColor, { alpha: 0.2 })}`");
}
</style>
