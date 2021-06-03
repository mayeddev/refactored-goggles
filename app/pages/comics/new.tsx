import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createComic from "app/comics/mutations/createComic"
import { ComicForm, FORM_ERROR } from "app/comics/components/ComicForm"

const NewComicPage: BlitzPage = () => {
  const router = useRouter()
  const [createComicMutation] = useMutation(createComic)

  return (
    <div>
      <h1>Create New Comic</h1>

      <ComicForm
        submitText="Create Comic"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateComic}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const comic = await createComicMutation(values)
            router.push(`/comics/${comic.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ComicsPage()}>
          <a>Comics</a>
        </Link>
      </p>
    </div>
  )
}

NewComicPage.authenticate = true
NewComicPage.getLayout = (page) => <Layout title={"Create New Comic"}>{page}</Layout>

export default NewComicPage
