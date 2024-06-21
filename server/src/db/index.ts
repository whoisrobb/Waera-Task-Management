import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';

dotenv.config();

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

export default db;