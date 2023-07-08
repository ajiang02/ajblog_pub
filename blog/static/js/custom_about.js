// 获取要复制的邮箱地址元素和复制按钮元素
var emailAddress = document.getElementById("emailAddress");
var copyIcon = document.getElementById("copyIcon");

// 添加点击事件处理程序
copyIcon.addEventListener("click", function() {
  // 创建一个临时的输入框元素
  var tempInput = document.createElement("input");
  // 设置输入框的值为邮箱地址
  tempInput.value = emailAddress.innerText.trim();

  // 将输入框元素添加到DOM中
  document.body.appendChild(tempInput);

  // 选中输入框中的文本
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // 兼容移动端

  // 复制选中的文本
  document.execCommand("copy");

  // 移除输入框元素
  document.body.removeChild(tempInput);

  // 可以显示一条提示消息，表示已成功复制邮箱地址
  alert("复制成功");
});
