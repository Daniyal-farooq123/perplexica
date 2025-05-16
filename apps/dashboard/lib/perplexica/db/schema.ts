import { pgTable, serial, text, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

interface File {
  name: string;
  fileId: string;
}

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  chatId: text('chat_id').notNull(),
  messageId: text('message_id').notNull(),
  role: text('role', { enum: ['assistant', 'user'] }).notNull(),
  metadata: jsonb('metadata').$type<Record<string, any>>(),
});

export const chats = pgTable('chats', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: text('created_at').notNull(),
  focusMode: text('focus_mode').notNull(),
  files: jsonb('files').$type<File[]>().default(sql`'[]'::jsonb`),
});
