class MyButton extends HTMLElement {
  constructor() {
    super();
    // 附加 Shadow DOM
    const shadow = this.attachShadow({ mode: "open" }); // 克隆模板内容
    const template = document.getElementById("my-button-template").content;
    shadow.appendChild(template.cloneNode(true)); // 3. 添加点击事件（示例功能：点击计数）
    this.count = 0;
    shadow.querySelector("button").addEventListener("click", () => {
      this.count++;
      console.log(`点击次数: ${this.count}`);
    });
  }
}
customElements.define("my-button", MyButton);
