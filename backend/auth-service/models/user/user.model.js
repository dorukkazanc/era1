const userModel = {
    title: 'User',
    type: 'object',
    primaryKey: "id",
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
            maxLength: 100
        },
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
        }
    },
    required: ['id', 'email', 'password'],
}

module.exports = userModel;
