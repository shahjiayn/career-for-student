export interface Career {
  id: string;
  title: string;
  stream: 'Science' | 'Commerce' | 'Arts' | 'Vocational';
  description: string;
  topColleges: string[];
  entranceExams: string[];
  salaryRange: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: Record<string, number>; // e.g., { science: 2, commerce: 0, arts: 1 }
  }[];
}

export interface QuizResult {
  scores: Record<string, number>;
  recommendation: string;
}
