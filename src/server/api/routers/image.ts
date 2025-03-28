import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { deleteFileFromDisk } from "~/utils/deleteFileFromDisk";
import { uploadFileSchema } from "~/utils/schemas";
import { writeFileToDisk } from "~/utils/writeFileToDisk";

export const imageRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.images.findMany();
  }),

  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const image = await ctx.db
        .delete(images)
        .where(eq(images.id, input.id))
        .returning();
      image.forEach(async (image) => {
        await deleteFileFromDisk(image.path);
      });
    }),

  upload: publicProcedure.input(uploadFileSchema).mutation(async (opts) => {
    const savedImage = await writeFileToDisk(opts.input.image);
    const foundImage = await db
      .select()
      .from(images)
      .where(eq(images.path, savedImage.url));
    if (foundImage.length === 0) {
      await db.insert(images).values({
        name: savedImage.name,
        path: savedImage.url,
      });
    }
    return {
      image: savedImage,
    };
  }),
});
