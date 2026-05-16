import { createClient } from '@sanity/client'
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'cg64ot9n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: import.meta.env.SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

export const queries = {
  allPosts: `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt,
    coverImage { asset, alt },
    "author": author->{ name, image },
    "tags": tags[]->{ title, slug }
  }`,

  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, body,
    coverImage { asset, alt },
    "author": author->{ name, image, bio, twitter, website },
    "tags": tags[]->{ title, slug }
  }`,

  postsByTag: `*[_type == "post" && $slug in tags[]->slug.current && defined(publishedAt)] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt,
    coverImage { asset, alt },
    "author": author->{ name, image },
    "tags": tags[]->{ title, slug }
  }`,

  allTags: `*[_type == "tag"] | order(title asc) { _id, title, slug }`,
}
