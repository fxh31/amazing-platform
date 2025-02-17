import CodeMirror from 'codemirror';

// css
import './codemirror.css';
import 'codemirror/theme/juejin.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/material-palenight.css';
// modes
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/clike/clike';

// addons 
import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/comment/comment';
// import 'codemirror/addon/fold/foldcode';
// import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
// import 'codemirror/addon/fold/indent-fold';
// import 'codemirror/addon/lint/json-lint';
// import 'codemirror/addon/fold/comment-fold';

const el = document.querySelector('#code');
let editor = null;

const MODE = {
  JSON : 'application/json',
  HTML : 'htmlmixed',
  JS: 'javascript',
  Java: 'text/x-java',
}

function init() {
  // 需要与 addons 配合
  const addonOptions = {
    autoCloseBrackets: true, // 自动关闭括号
    autoCloseTags: true, // 自动关闭 HTML/XML 标签
    foldGutter: true, // 启用代码折叠功能
    gutters: ['CodeMirror-linenumbers'], // 定义 gutter 的内容
    matchBrackets: true, // 匹配括号
    styleActiveLine: true, // 高亮当前活动行
    // hintOptions: {
    //   keywords: ['SUM', 'SUBTRACT', 'PRODUCT', 'DIVIDE', 'COUNT'], // 配置代码提示选项
    // },
  };
  
  editor = CodeMirror(el, {
    value: '',
    mode: MODE['JSON'],
    readOnly: false,
    tabSize: 2,
    theme: 'material-palenight',
    lineWrapping: true,
    lineNumbers: true,
    ...addonOptions
  });
  
  // 设置编辑器初始值
  editor.setValue('SUM(1, 2, 3)');
  
  setTheme()
  
  // 监听编辑器内值的变化（可对外进行事件触发）
  editor.on('change', (cm) => {
    const v = editor.getValue(); // 获取值
    console.log(v)
  });
}

init();

// 刷新编辑器（可配合防抖和节流函数）
function refresh() {
  editor?.refresh();
}
// 插入一段代码后是否将光标移动到代码内部
function insert(val, hasBrackets = false) {
  editor?.replaceSelection(val);
  editor?.focus();
  let pos1 = editor?.getCursor();
  let pos2 = {};
  pos2.line = pos1.line;
  pos2.ch = hasBrackets ? pos1.ch - 1 : pos1.ch;
  editor?.setCursor(pos2);
}

// 设置代码编辑器主题
function setTheme() {
  let theme = 'dark';
  editor.setOption('theme', theme === 'light' ? 'idea' : 'material-palenight');
}