// import {db} from '../../../lib/perplexica/db/index';

// import { Prisma } from '@workspace/database';
import { prisma } from '@workspace/database/client';

export const GET = async (req: Request) => {
  try {
    // let chats = await db.query.chats.findMany();
    // chats = chats.reverse();
    const chats = await prisma.chat.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return Response.json({ chats: chats }, { status: 200 });
  } catch (err) {
    console.error('Error in getting chats: ', err);
    return Response.json(
      { message: 'An error has occurred.' },
      { status: 500 },
    );
  }
};
