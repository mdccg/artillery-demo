import { connect, connection } from 'mongoose'

export const connectToMongoDB = async () => {
  await connect(`${process.env.DB_URL}`)
}

connection.on('connecting', () =>
  console.log(`[${process.pid}]: Opening connection to database...`)
)

connection.on('connected', () =>
  console.log(`App connected to db ${connection.db.databaseName}`)
)

connection.on('disconnecting', () =>
  console.log(`[${process.pid}]: Closing connection to database...`)
)

connection.on('disconnected', () =>
  console.log(`App disconnected to db ${connection.db.databaseName}`)
)
