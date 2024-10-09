const createRxDatabase = require('rxdb').createRxDatabase;
const getRxStorageMemory = require('rxdb/plugins/storage-memory').getRxStorageMemory;
const userModel = require('../models/user/user.model');

// dbInstance singleton. Her call da yeni bir instance oluşturulmaması için.
let dbInstance = null;

async function createDatabase() {
    if (!dbInstance) {
        dbInstance = await createRxDatabase({
            name: 'era1db',
            storage: getRxStorageMemory()
        });

        if (!dbInstance.collections.users) {
            await dbInstance.addCollections({
                users: {
                    schema: userModel,
                }
            });
        }
    }
    return dbInstance;
}


module.exports = createDatabase;