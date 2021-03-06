import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateComic = z.object({
  title: z.string(),
  genres: z.string(),
  type: z.string(),
  desc: z.string(),
})

export default resolver.pipe(resolver.zod(CreateComic), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const comic = await db.comic.create({ data: input })

  return comic
})
