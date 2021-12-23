/*
* Advanced Example of how to use external services and stablish data aggregations
* For more information about How to implement a GraphQL Gateway see : https://github.com/segpacto/graphql-gateway-microservices-sample
* To know more about the package inside see: https://github.com/segpacto/gql-gateway
*/
module.exports = {
  endpointsList: [{
    name: 'customerApi',
    url: 'https://raw.githubusercontent.com/segpacto/graphql-gateway-microservices-sample/master/customer/swagger.json'
  }, {
    name: 'inoviceApi',
    url: 'https://raw.githubusercontent.com/segpacto/graphql-gateway-microservices-sample/master/invoice/swagger.json'
  }],
  localSchema: `
    extend type Customer {
      invoices: [Invoice]
    }
    extend type Invoice {
      customer: Customer
    }`
  ,
  resolvers: {
    Customer: {
      invoices: {
        fragment: '... on Customer {customerId}',
        async resolve (invoice, args, context, info) {
          const schema = await context.resolveSchema('invoiceApi')
  
          return info.mergeInfo.delegateToSchema({
            schema,
            operation: 'query',
            fieldName: 'getInvoicesByCustomerId',
            args: { customerId: invoice.customerId },
            context,
            info
          })
        }
      }
    },
    Invoice: {
      customer: {
        fragment: '... on Invoice {customerId}',
        async resolve (customer, args, context, info) {
          const schema = await context.resolveSchema('customerApi')
  
          return info.mergeInfo.delegateToSchema({
            schema,
            operation: 'query',
            fieldName: 'getCustomerById',
            args: { customerId: customer.customerId },
            context,
            info
          })
        }
      }
    }
  }
}
