import './monaco-editor.css';

import * as monaco from 'monaco-editor';

const el = document.querySelector('#code');
let editor = null;

const defaultOptions = {
  automaticLayout: true,
  foldingStrategy: 'indentation',
  renderLineHighlight: 'all',
  lineNumbers: 'on',
  wordWrap: 'on',
  selectOnLineNumbers: true,
  minimap: {
    enabled: false,
  },
  readOnly: false,
  fontSize: 14,
  scrollBeyondLastLine: false,
  overviewRulerBorder: false,
};

function init() {
  let theme = 'dark';
  
  editor = monaco.editor.create(el, {
    value: '// Type your code here',
    language: 'java',
    theme: theme === 'light' ? 'vs' : 'vs-dark',
    ...{ ...defaultOptions },
  });
  
  // 监听编辑器内值的变化（可对外进行事件触发）
  editor.onDidChangeModelContent(() => {
    const value = editor.getValue(); 
    console.log(value);
  });
}

init();

// 设置编辑器的值
editor.setValue('dd');

// 插入一段代码后是否将光标移动到代码内部
function insert(text) {
  text = text || '';
  const position = editor.getPosition();
  editor.executeEdits('', [
    {
      range: {
        startLineNumber: position.lineNumber,
        startColumn: position.column ,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      },
      text: text,
    },
  ]);
}