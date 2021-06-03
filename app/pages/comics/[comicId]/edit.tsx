import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getComic from "app/comics/queries/getComic"
import updateComic from "app/comics/mutations/updateComic"
import { ComicForm, FORM_ERROR } from "app/comics/components/ComicForm"

export const EditComic = () => {
  const router = useRouter()
  const comicId = useParam("comicId", "number")
  const [comic, { setQueryData }] = useQuery(getComic, { id: comicId })
  const [updateComicMutation] = useMutation(updateComic)

  return (
    <>
      <Head>
        <title>Edit Comic {comic.id}</title>
      </Head>

      <div>
        <h1>Edit Comic {comic.id}</h1>
        <pre>{JSON.stringify(comic)}</pre>

        <ComicForm
          submitText="Update Comic"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateComic}
          initialValues={comic}
          onSubmit={async (values) => {
            try {
              const updated = await updateComicMutation({
                id: comic.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowComicPage({ comicId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditComicPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditComic />
      </Suspense>

      <p>
        <Link href={Routes.ComicsPage()}>
          <a>Comics</a>
        </Link>
      </p>
    </div>
  )
}

EditComicPage.authenticate = true
EditComicPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditComicPage
