import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateComic = z.object({
  id: z.number(),
  title: z.string(),
  genres: z.string(),
  type: z.string(),
  desc: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateComic),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const comic = await db.comic.update({ where: { id }, data })

    return comic
  }
)
