import { z } from 'zod'

export const InsuranceSchema = z.object({
    name: z.string().min(2, { message: "Name is too short" }),
    company: z.string().min(2, { message: "Company name is too short write the full company info" }),
    insuranceCost: z.number().min(0, { message: "Cost is too low" }),
    benificial: z.string().min(2, { message: "Please write the full benificial info" }),
    policynumber: z.string().min(2, { message: "Please write the full policy number" }),
    claimdate: z.string().min(2, { message: "Please write the full claim date" }),
    document: z.string().array().min(1, { message: "Please upload single document" }),
})