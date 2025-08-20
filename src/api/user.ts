import { toast } from "@/hooks/use-toast";

// Your live Vercel backend URL - THIS REMAINS UNCHANGED

//const API_BASE_URL = "https://projectshunnobackend.vercel.app/api";
const API_BASE_URL = "http://localhost:5000/api";
// --- START OF HARDCODED DATA ---
// Using hardcoded subjects list as requested.
const subjectsData = [
  {
    name: "পদার্থবিজ্ঞান ১ম পত্র",
    chapters: [ "ভৌতজগত ও পরিমাপ", "ভেক্টর", "নিউটনিয়ান বলবিদ্যা", "কাজ, শক্তি ও ক্ষমতা", "মহাকর্ষ ও অভিকর্ষ", "পদার্থের গাঠনিক ধর্ম", "পর্যাবৃত্ত গতি", "আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব" ],
  },
  {
    name: "পদার্থবিজ্ঞান ২য় পত্র",
    chapters: [ "তাপগতিবিদ্যা", "স্থির তড়িৎ", "চল তড়িৎ", "ভৌত আলোকবিজ্ঞান", "আধুনিক পদার্থবিজ্ঞানের সূচনা", "পরমাণুর মডেল এবং নিউক্লিয় পদার্থবিজ্ঞান", "সেমিকন্ডাক্টর ও ইলেকট্রনিক্স" ],
  },
  {
    name: "উচ্চতর গণিত ১ম পত্র",
    chapters: [ "ম্যাট্রিক্স", "সরলরেখা", "বৃত্ত", "সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত", "অন্তরীকরণ", "যোগজীকরণ" ],
  },
  {
    name: "উচ্চতর গণিত ২য় পত্র",
    chapters: [ "জটিল সংখ্যা", "বহুপদী ও বহুপদী সমীকরণ", "কনিক", "বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ", "স্থিতিবিদ্যা", "সমতলে বস্তুকণার গতি" ],
  },
  {
    name: "রসায়ন ১ম পত্র",
    chapters: [ "গুনগত রসায়ন", "মৌল সমূহের পর্যায়বৃত্ত ধর্ম ও রসায়নিক বন্ধন", "রাসায়নিক পরিবর্তন", "কর্মমুখী রসায়ন" ],
  },
  {
    name: "রসায়ন ২য় পত্র",
    chapters: ["পরিবেশ রসায়ন", "জৈব রসায়ন", "পরিমাণগত রসায়ন", "তড়িৎ রসায়ন"],
  },
  {
    name: "জীববিজ্ঞান ১ম পত্র",
    chapters: [ "কোষ ও এর গঠন", "কোষ বিভাজন", "অণুজীব", "নগ্নবীজী ও আবৃতবীজী উদ্ভিদ", "টিস্যু ও টিস্যতন্ত্র", "উদ্ভিদ শারীরতত্ত্ব", "জীবপ্রযুক্তি" ],
  },
  {
    name: "জীববিজ্ঞান ২য় পত্র",
    chapters: [ "প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস", "প্রাণী পরিচিতি", "পরিপাক ও শোষণ", "রক্ত সংবহন", "শ্বসন ও শ্বাসক্রিয়া", "চলন ও অঙ্গ চালনা", "জিনতত্ত্ব ও বিবর্তন" ],
  },
  {
    name: "English 2nd Paper",
    chapters: [ "Parts of Speech", "Preposition", "Article", "Voice", "Narration", "Transformation", "Right form of verb", "Degree", "Sentence Completion", "Sentence correction", "Subject verb agreement", "Translation", "Idiom & Phrases", "Synonyms", "Antonyms", "Spelling", "Analogy", "Conditionals", "Literature" ],
  },
  {
    name: "বাংলা ১ম পত্র",
    chapters: [ "অপরিচিতা", "আমার পথ", "মানব কল্যাণ", "রেইনকোট", "৫২ এর দিনগুলি", "আমি কিংবদন্তির কথা বলছি", "সোনার তরী", "তাহারেই পড়ে মনে", "আঠারো বছর বয়স", "মাসি-পিসি", "বিলাসী", "বিদ্রোহী", "প্রতিদান", "সিরাজ্জুদৌলা", "লালসালু" ],
  },
];
// --- END OF HARDCODED DATA ---


// --- TYPESCRIPT INTERFACES (Matching your Mongoose Schemas) ---

export interface Subject {
  id: string; // The component uses `id` as a key, so we'll create it from `name`.
  name: string;
  chapters: string[];
}

export interface QuestionOption {
  text: string;
  image?: string | null;
  label: "ক" | "খ" | "গ" | "ঘ";
  _id: string;
}

export interface Question {
  _id: string;
  subject: string;
  chapter: string;
  topic: string;
  text: string;
  image?: string | null;
  options: QuestionOption[];
}

export interface FullQuestion extends Question {
  correctOption: "ক" | "খ" | "গ" | "ঘ";
  explanation?: string;
  explanationImage?: string;
}

export interface ExamSetupOptions {
  subjects: string[];
  chapters: string[];
  numQuestions: number;
  timeLimitMinutes: number;
  negativeMarking: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number | null;
}

export interface QuestionResult extends FullQuestion {
  userAnswerIndex: number | null;
  correctAnswerIndex: number;
  isCorrect: boolean;
}

export interface ExamResult {
  id: string;
  score: number;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  rank: number;
  results: QuestionResult[];
  options: ExamSetupOptions;
}

// --- API FUNCTIONS ---

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'The server returned an unreadable error.' }));
    toast({
      variant: "destructive",
      title: `Error: ${response.status}`,
      description: errorData.message || "Failed to communicate with the server."
    });
    throw new Error(errorData.message);
  }
  return response.json();
}

/**
 * [MODIFIED] Fetches available subjects from the local constant.
 * This no longer makes a network request.
 */
export async function getSubjectsAndChapters(): Promise<Subject[]> {
  console.log("Fetching subjects from local constant.");
  // We map the raw data to match the Subject interface, ensuring components that use `id` still work.
  const formattedSubjects: Subject[] = subjectsData.map(s => ({
    id: s.name, // Use the unique name as the ID for React keys.
    name: s.name,
    chapters: s.chapters,
  }));
  return Promise.resolve(formattedSubjects);
}

/**
 * [UNCHANGED] Creates a new mock exam by calling the backend.
 * Endpoint: POST /api/exams/start
 */
export async function startMockExam(options: ExamSetupOptions): Promise<Question[]> {
  console.log("Starting exam with options:", options);
  const response = await fetch(`${API_BASE_URL}/exams/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
  
  const questions = await handleResponse<Question[]>(response);
  if (questions.length === 0) {
      toast({ variant: "destructive", title: "No Questions", description: "No questions were found for the selected criteria. Please try again."});
  } else if (questions.length < options.numQuestions) {
     toast({ title: "Warning", description: `Only ${questions.length} questions found for your criteria.` });
  }
  return questions;
}

/**
 * [UNCHANGED] Submits user's answers to the backend and gets the result.
 * Endpoint: POST /api/exams/submit
 */
export async function submitMockExam(
  questions: Question[],
  answers: UserAnswer[],
  options: ExamSetupOptions
): Promise<ExamResult> {
  console.log("Submitting exam...");
  const questionIds = questions.map(q => q._id);
  
  const response = await fetch(`${API_BASE_URL}/exams/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionIds, answers, options }),
  });
  
  const result = await handleResponse<ExamResult>(response);
  toast({ title: "Success!", description: "Your exam has been submitted and graded." });
  return result;
}