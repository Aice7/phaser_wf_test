
const helpTool = {
  // 控制台打印
  slog: slog
}


// 控制台打印
function slog(...args: any): void {
  // 前缀时间
  const t: string = new Date().toLocaleString();
  args.unshift(`%c控制台调试-${t}\n\r`, 'color:#8F28FFFF');
  console.log.apply(console, args)
}

export default helpTool