// async function connectWithRetry() {

//     const maxAttempts =
//         config.database.retryAttempts;

//     let attempt = 1;

//     while (attempt <= maxAttempts) {

//         try {

//             return await mongoose.connect(
//                 config.database.uri,
//                 databaseOptions
//             );

//         }

//         catch (error) {

//             logger.warn({

//                 event:
//                     "DATABASE_CONNECTION_RETRY",

//                 attempt,

//                 message:
//                     error.message,

//             });

//             if (attempt === maxAttempts) {

//                 throw error;

//             }

//             await wait(

//                 config.database.retryDelay *
//                 attempt

//             );

//             attempt++;

//         }

//     }

// }