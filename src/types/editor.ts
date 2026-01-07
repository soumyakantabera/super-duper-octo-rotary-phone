export interface EditorSettings {
  fontSize: number;
  lineNumbers: boolean;
  lineWrapping: boolean;
  tabSize: number;
  autoCloseBrackets: boolean;
  highlightActiveLine: boolean;
}

export interface PreviewSettings {
  showPreview: boolean;
  syncScroll: boolean;
  fontSize: number;
  mathRenderer: 'mathjax' | 'katex';
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  editorSettings: EditorSettings;
  previewSettings: PreviewSettings;
  snippetFavorites: string[];
}
