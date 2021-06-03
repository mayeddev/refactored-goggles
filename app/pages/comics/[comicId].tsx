import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getComic from "app/comics/queries/getComic"
import deleteComic from "app/comics/mutations/deleteComic"

export const Comic = () => {
  const router = useRouter()
  const comicId = useParam("comicId", "number")
  const [deleteComicMutation] = useMutation(deleteComic)
  const [comic] = useQuery(getComic, { id: comicId })

  return (
    <>
      <Head>
        <title>Comic {comic.id}</title>
      </Head>

      <div>
        <h1>Comic {comic.id}</h1>
        <pre>{JSON.stringify(comic, null, 2)}</pre>

        <Link href={Routes.EditComicPage({ comicId: comic.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteComicMutation({ id: comic.id })
              router.push(Routes.ComicsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowComicPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ComicsPage()}>
          <a>Comics</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Comic />
      </Suspense>
    </div>
  )
}

ShowComicPage.authenticate = true
ShowComicPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowComicPage
