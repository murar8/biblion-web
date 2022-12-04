<script setup lang="ts">
import { useColorModeStore } from "@/stores/color-mode";
import { StateEffect } from "@codemirror/state";
import type { ViewUpdate } from "@codemirror/view";
import { lineNumbers } from "@codemirror/view";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { EditorView, minimalSetup } from "codemirror";
import { useThemeVars } from "naive-ui";
import { storeToRefs } from "pinia";
import { changeColor } from "seemly";
import { computed, onMounted, ref, shallowRef, toRef, watch, watchEffect } from "vue";

const props = defineProps<{
  modelValue?: string;
  readonly?: boolean;
}>();

const modelValue = toRef(props, "modelValue");
const readonly = toRef(props, "readonly");

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const themeVars = useThemeVars();
const { colorMode } = storeToRefs(useColorModeStore());

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
  return [
    minimalSetup,
    lineNumbers(),
    colorMode.value === "dark" ? githubDark : githubLight,
    EditorView.updateListener.of(onUpdateContent),
    EditorView.editable.of(!readonly.value),
  ];
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
