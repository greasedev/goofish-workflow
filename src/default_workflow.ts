/**
 * ---
 * name: Default Workflow
 * description: "Default workflow entry point"
 *
 * use when:
 * - User requests an action
 *
 * output: Workflow execution result
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