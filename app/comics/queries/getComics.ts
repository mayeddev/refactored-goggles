import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetComicsInput
  extends Pick<Prisma.ComicFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetComicsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: comics,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.comic.count({ where }),
      query: (paginateArgs) => db.comic.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      comics,
      nextPage,
      hasMore,
      count,
    }
  }
)
