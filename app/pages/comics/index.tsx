import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getComics from "app/comics/queries/getComics"

const ITEMS_PER_PAGE = 100

export const ComicsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ comics, hasMore }] = usePaginatedQuery(getComics, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {comics.map((comic) => (
          <li key={comic.id}>
            <Link href={Routes.ShowComicPage({ comicId: comic.id })}>
              <a>{comic.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ComicsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Comics</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewComicPage()}>
            <a>Create Comic</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ComicsList />
        </Suspense>
      </div>
    </>
  )
}

ComicsPage.authenticate = true
ComicsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ComicsPage
