import { z } from "zod"

export const surveySchema = z.object({
    year: z.enum(["freshman", "sophomore", "junior", "senior", "graduate"]),
    college: z.enum(["College of Agriculture, Forestry and Life Sciences",                                                                                                                                                      
                        "College of Architecture, Arts and Humanities",
                        "College of Behavioral, Social and Health Sciences", 
                        "College of Business",
                        "College of Education", 
                        "College of Engineering, Computing and Applied Sciences", 
                        "College of Science", 
                        "Graduate School", 
                        "Other"]),
    greek_life: z.boolean(),
    has_job: z.boolean(),
    monthly_income: z.number().min(0).max(20000).optional(),
    rent: z.number().min(0).max(3000),
    groceries: z.number().min(0).max(3000),
    dining_out: z.number().min(0).max(3000),
    transportation: z.number().min(0).max(3000),
    subscriptions: z.number().min(0).max(3000),
    entertainment: z.number().min(0).max(3000),
    clothing: z.number().min(0).max(3000),
    personal_care: z.number().min(0).max(3000),
    misc: z.number().min(0).max(10000)
})

export type SurveyFormData = z.infer<typeof surveySchema>