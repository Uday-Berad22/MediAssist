// client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: '0q44iqkk', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    useCdn: false, // `false` if you want to ensure fresh data
    apiVersion: 'v2022-03-07', // use a UTC date string
})
export const writeClient = createClient({
    projectId: '0uqhi6co', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: '2021-10-21', // use a UTC date string
    token: 'skWcZM8jNDXXmDqNb6lXfbFQdU1tG8LLVxP9ztWxrzeyFteaZwBOZFv4RVeSjJKdKNaQ5S6keDp0zg8QhLw6asVuT1KDUisWn0RCPQynPZQcNfzknJB91dEV1QdlDPxBTRDO8rmpjSdoprryp0khlTifjKM4fYFEohVRmp14RgN3BPW6TMKj'
})