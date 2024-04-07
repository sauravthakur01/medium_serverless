import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { userRouter } from './routes/user';
import { bookRouter } from './routes/blog';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string,
	}
}>();

app.use('/*', cors()) ;
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', bookRouter)

// postgresql://medium_owner:8T2trAMNBjDF@ep-floral-rice-a5k76e0o.us-east-2.aws.neon.tech/medium?sslmode=require
// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNzE1NjdkYzEtN2Q1My00YmYxLWExZjEtNzBjNDQ0MWU3MDY3IiwidGVuYW50X2lkIjoiMjlhNTIzZDEyOTRiODFlNGM3N2VjNGQzYWFiYjA3YzEwMmQxYjViZGFjZTE1MWRkMWU2NTRlZGUyZGVlZDNjYyIsImludGVybmFsX3NlY3JldCI6ImM3ZGUwZGVhLWRlOTctNDgzNy04YWRlLTA1MmJkN2E3MDM2OSJ9.T9XQ7E8NhHhgBr6XOd5W3ekE7hVTxRynWP-VLtyZp6k"

export default app
