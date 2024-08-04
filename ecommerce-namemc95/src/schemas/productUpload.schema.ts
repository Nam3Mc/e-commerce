export const ProductUploadSchema = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
        description: 'Image file (jpg, jpeg, png, webp)',
      },
      
      productDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the product, must be a string',
            example: 'Laptop',
          },
          description: {
            type: 'string',
            description: 'The description of the product, must be a string',
            example: 'A high-performance laptop suitable for all your computing needs',
          },
          price: {
            type: 'number',
            description: 'The price of the product',
            example: 99.50,
          },
          stock: {
            type: 'integer',
            description: 'The stock quantity of the product, must be an integer',
            example: 50,
          },
          category: {
            type: 'string',
            description: 'It could be a new or an existend categorie',
            example: 'computer'
          }
        },
      },
    },
  },
};
