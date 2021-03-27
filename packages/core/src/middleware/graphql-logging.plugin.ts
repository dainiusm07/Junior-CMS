import { Logger } from '@nestjs/common';
import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

import { capitalizeFirstLetter } from '../utils/capitalize-first-letter';

@Plugin()
export class GraphqlLoggingPlugin implements ApolloServerPlugin {
  requestDidStart(): GraphQLRequestListener {
    return {
      willSendResponse({ operation: graphqlOperation }) {
        if (graphqlOperation) {
          const parentType = capitalizeFirstLetter(graphqlOperation.operation);

          graphqlOperation.selectionSet.selections.forEach((selection) => {
            const fieldName: string = graphqlOperation.name
              ? graphqlOperation.name.value
              : (selection as any).name.value;

            Logger.debug(`🧨 ${parentType} » ${fieldName}`, 'GraphQL');
          });
        }
      },
    };
  }
}
