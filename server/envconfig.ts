
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

const MongodbUrl = process.env.MongodbUrl!

const OAuthClientId = process.env.OAuthClientId!
const OAuthClientSecret = process.env.OAuthClientSecret!
const CallbackUrl = process.env.CallbackUrl!











export {PORT, MongodbUrl, OAuthClientId, OAuthClientSecret, CallbackUrl}