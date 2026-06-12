import { aboutPage } from "./aboutPage";
import { afkarIssue } from "./afkarIssue";
import { book } from "./book";
import { faqEntry } from "./faqEntry";
import { honor } from "./honor";
import { lecture } from "./lecture";
import { careerMilestone } from "./objects/careerMilestone";
import { organization } from "./organization";
import { readingRecommendation } from "./readingRecommendation";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  siteSettings,
  aboutPage,
  careerMilestone,
  book,
  readingRecommendation,
  lecture,
  honor,
  organization,
  afkarIssue,
  faqEntry,
];
