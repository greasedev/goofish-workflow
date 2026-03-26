/**
 * ---
 * name: 闲鱼比价代购下单
 * description: "闲鱼商品比价、代购、下单工作流"
 *
 * use when:
 * - 用户需要在闲鱼上比价购买商品
 * - 用户需要代购闲鱼商品
 *
 * input:
 *   - name: 城市
 *     description: 目标城市
 *     required: true
 *   - name: 区域
 *     description: 目标区域（商圈、商场等）
 *     required: true
 *   - name: 店铺名
 *     description: 目标店铺名称
 *     required: true
 *   - name: 商品名
 *     description: 要购买的商品名称
 *     required: true
 *   - name: 规格
 *     description: 商品规格
 *     required: false
 *   - name: 数量
 *     description: 购买数量
 *     required: true
 *
 * output:
 *   - success: 是否成功
 *   - message: 结果消息
 *   - orderInfo: 订单信息（成功时返回）
 * ---
 */

import { Agent, type WorkflowContext } from '@greaseclaw/workflow-sdk';
import { createWorkflowApis } from './api';
import { createShoppingFlow } from "./workflow/shopping-flow";
import { createLogger } from "./logger";

const logger = createLogger({ level: "debug" });


// Main workflow entry point
async function execute(context: WorkflowContext) {
  const agent = new Agent(context.agentOptions || {});
  const apis = createWorkflowApis(agent);

  const shoppingFlow = createShoppingFlow({ logger, agent,  goofish:apis});

  console.log('Task:', context.task);
  console.log('Executing workflow...');

  // Test all APIs
  try {
     await shoppingFlow.handleIncoming({
      chatId: context.chatId ?? "",
      userText: context.task,
    });
  } catch (error) {
    console.error('Workflow  error:', error);
    return {
      success: false,
      message: 'Workflow failed',
      error: error
    };
  }

  return {
    success: true,
    message: 'Workflow completed successfully'
  };
}

// @ts-ignore
globalThis.execute = execute;