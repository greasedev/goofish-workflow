import type { ShoppingIntent } from "./types";

export function buildIntentPrompt(userText: string, currentIntent: ShoppingIntent): string {
  return [
    "你是购物请求解析器。",
    "请从用户输入中提取四要素：location、shop、product、spec。",
    "仅输出 JSON，不要输出其他文本。",
    "若某字段未知，输出空字符串。",
    `当前已知要素: ${JSON.stringify(currentIntent)}`,
    `用户输入: ${userText}`,
    '输出示例: {"location":"","shop":"","product":"","spec":""}',
  ].join("\n");
}

export function buildPriceExtractPrompt(message: string): string {
  return [
    "你是价格抽取器。",
    "从输入消息中提取价格数值，单位元。",
    "如果没有价格，输出 price 为 0。",
    "仅输出 JSON。",
    `消息: ${message}`,
    '输出示例: {"price":23.5}',
  ].join("\n");
}
