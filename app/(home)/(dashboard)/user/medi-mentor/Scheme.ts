import { z } from 'zod'

export const SearchPrompt = z.object({
    search: z.string().nonempty('Search is required.'),

})