import {
  IntegrationEventPayload,
  IntegrationPayloadEventType,
} from '@tegonhq/types';
import { integrationCreate } from 'integrations/slack/account-create';
import { getToken } from 'integrations/slack/get-token';
import { spec } from 'integrations/slack/spec';
import { webhookRespose } from 'integrations/slack/webhook-response';

export default async function run(eventPayload: IntegrationEventPayload) {
  switch (eventPayload.event) {
    /**
     * This is used to identify to which integration account the webhook belongs to
     */
    case IntegrationPayloadEventType.GET_CONNECTED_ACCOUNT_ID:
      return eventPayload.data.eventBody.team_id;

    case IntegrationPayloadEventType.SPEC:
      return spec();

    // Used to save settings data
    case IntegrationPayloadEventType.CREATE:
      return await integrationCreate(
        eventPayload.userId,
        eventPayload.workspaceId,
        eventPayload.data,
      );

    case IntegrationPayloadEventType.GET_TOKEN:
      return await getToken(eventPayload.integrationAccountId);

    case IntegrationPayloadEventType.WEBHOOK_RESPONSE:
      return await webhookRespose(eventPayload.eventBody);

    case IntegrationPayloadEventType.IS_ACTION_SUPPORTED_EVENT:
      return true;

    default:
      return {
        message: `The event payload type is ${eventPayload.event}`,
      };
  }
}
