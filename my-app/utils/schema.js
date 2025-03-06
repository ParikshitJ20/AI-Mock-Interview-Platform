import {pgTable,serial,text,varchar} from "drizzle-orm/pg-core";

export const InterviewDB=pgTable('InterviewDB',{
     id:serial('id').primaryKey(),
     jsonMockResp:text('jsonMockResp').notNull(),
     jobPosition: varchar('jobPosition').notNull(),
     jobDesc:varchar('jobDesc').notNull(),
     createdBy:varchar('createdBy'),
     createdAt:varchar('createdAt'),
     mockId:varchar('mockId').notNull(),
     jobExperience:varchar('jobExperience').notNull()
})
export const UserAnswer=pgTable('UserAnswer',{
     id:serial('id').primaryKey(),
     mockIdRef:varchar('mockId').notNull(),
     question:varchar('question').notNull(),
     correctAns:varchar('correctAns'),
     userAns:text('userAns'),
     feedback:text('feedback'),
     rating:varchar('rating'),
     userEmail:varchar('userEmail'),
     createdAt:varchar('createdAt'),

})