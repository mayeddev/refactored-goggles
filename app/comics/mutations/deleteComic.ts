import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteComic = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteComic), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const comic = await db.comic.deleteMany({ where: { id } })

  return comic
})
