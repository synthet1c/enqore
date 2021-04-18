"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupMongoDBConnection = exports.wipeMongoDBCollections = exports.initMongoDB = void 0;
const mongodb_1 = require("mongodb");
function initMongoDB({ app, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield mongodb_1.MongoClient.connect(process.env.MONGO_DB_HOST, {
            useUnifiedTopology: true,
        });
        return {
            app,
            Db: client.db(process.env.MONGO_DB_NAME),
            mongoClient: client,
        };
    });
}
exports.initMongoDB = initMongoDB;
function wipeMongoDBCollections({ Db }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([Db.collection('users').drop()]);
        yield Db.collection('users').insertOne({
            firstName: 'Andrew',
            lastName: 'Fountain',
            nickname: 'foonta',
            login: 'founts',
            password: 'p@55w0rd!',
            email: 'founts24@gmail.com',
            addresses: [
                {
                    number: 38,
                    unit: 1,
                    street: 'Dalgety',
                    type: 'Street',
                    suburb: 'St Kilda',
                    postcode: 3182,
                },
                {
                    number: 348,
                    street: 'High',
                    suburb: 'Windsor',
                    type: 'Street',
                    postcode: 3181,
                },
            ],
        });
    });
}
exports.wipeMongoDBCollections = wipeMongoDBCollections;
function cleanupMongoDBConnection({ mongoClient, }) {
    return __awaiter(this, void 0, void 0, function* () {
        process.on('SIGINT', function () {
            mongoClient
                .close()
                .then(function () {
                console.log('Mongo connection closed on app termination');
            })
                .then(() => process.exit(0));
        });
    });
}
exports.cleanupMongoDBConnection = cleanupMongoDBConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L21vbmdvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBTXJDLFNBQXNCLFdBQVcsQ0FBQyxFQUNoQyxHQUFHLEdBQ1k7O1FBQ2YsTUFBTSxNQUFNLEdBQUcsTUFBTSxxQkFBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtZQUNsRSxrQkFBa0IsRUFBRSxJQUFJO1NBQ3pCLENBQUMsQ0FBQTtRQUVGLE9BQU87WUFDTCxHQUFHO1lBQ0gsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7WUFDeEMsV0FBVyxFQUFFLE1BQU07U0FDcEIsQ0FBQTtJQUNILENBQUM7Q0FBQTtBQVpELGtDQVlDO0FBRUQsU0FBc0Isc0JBQXNCLENBQUMsRUFBRSxFQUFFLEVBQWtCOztRQUNqRSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNsRCxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3JDLFNBQVMsRUFBRSxRQUFRO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFLFdBQVc7WUFDckIsS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLENBQUM7b0JBQ1AsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLElBQUksRUFBRSxRQUFRO29CQUNkLE1BQU0sRUFBRSxVQUFVO29CQUNsQixRQUFRLEVBQUUsSUFBSTtpQkFDZjtnQkFDRDtvQkFDRSxNQUFNLEVBQUUsR0FBRztvQkFDWCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxNQUFNLEVBQUUsU0FBUztvQkFDakIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2Y7YUFDRjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FBQTtBQTNCRCx3REEyQkM7QUFFRCxTQUFzQix3QkFBd0IsQ0FBQyxFQUM3QyxXQUFXLEdBQ0k7O1FBQ2YsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsV0FBVztpQkFDUixLQUFLLEVBQUU7aUJBQ1AsSUFBSSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQTtZQUMzRCxDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNoQyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FBQTtBQVhELDREQVdDIn0=