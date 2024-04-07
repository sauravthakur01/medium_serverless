import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, CreatePostType, updatePostInput  } from 'serverless-common-app'
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const bookRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string,
	},
	Variables : {
		userId: string
	}
}>();

bookRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
})

bookRouter.get('/:id', async(c) => {
	const id = c.req.param('id')
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
        where :{
            id
        },
		select: {
			id: true,
			title: true ,
			content: true ,
			author :{
				select: {
					name:true
				}
			}
		}
    })
	return c.json(post)
})

bookRouter.get('/bulk', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
		select : {
			content : true,
			title : true,
			id: true,
			author :{
				select: {
					name:true
				}
			}
		}
	});

	return c.json(posts) ;
})

bookRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();

    const { success } = createPostInput.safeParse(body);

    if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})

bookRouter.put('/', async(c) => {

    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    
    await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data:{
            title: body.title,
            content: body.content
        }
    })

	return c.text('updated successfully')
})