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

// Main workflow entry point
async function execute(context: WorkflowContext) {
  const agent = new Agent(context.agentOptions || {});
  const apis = createWorkflowApis(agent);

  console.log('Task:', context.task);
  console.log('Executing workflow...');

  // Test all APIs
  try {
    // 1. Test login
    console.log('Testing login...');
    const loginResult = await apis.login('test_user', 'test_password');
    console.log('Login result:', loginResult);

    // 2. Test check_login
    console.log('Testing check_login...');
    const checkLoginResult = await apis.check_login();
    console.log('Check login result:', checkLoginResult);

    // 3. Test search
    console.log('Testing search...');
    const searchResult = await apis.search('test query');
    console.log('Search result:', searchResult);

    // 4. Test get_message
    console.log('Testing get_message...');
    const getMessageResult = await apis.get_message('https://example.com/goods/123');
    console.log('Get message result:', getMessageResult);

    // 5. Test inquire
    console.log('Testing inquire...');
    const inquireResult = await apis.inquire('https://example.com/goods/123', '询问商品信息');
    console.log('Inquire result:', inquireResult);

    // 6. Test payment
    console.log('Testing payment...');
    const paymentResult = await apis.payment('https://example.com/goods/123');
    console.log('Payment result:', paymentResult);

    console.log('All API tests completed!');
  } catch (error) {
    console.error('API test error:', error);
    return {
      success: false,
      message: 'Workflow failed during API tests',
      error: error
    };
  }

  return {
    success: true,
    message: 'Workflow completed successfully'
  };
}

// @ts-ignore
globalThis.default_workflow = { execute };