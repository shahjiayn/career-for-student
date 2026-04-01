import { Career, Question } from './types';

export const CAREERS: Career[] = [
  {
    id: 'eng',
    title: 'Engineering',
    stream: 'Science',
    description: 'Design, build, and maintain structures, machines, and systems. Requires strong Math and Physics.',
    topColleges: ['IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'BITS Pilani'],
    entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT'],
    salaryRange: '₹6L - ₹40L+ per annum'
  },
  {
    id: 'med',
    title: 'Medicine (MBBS)',
    stream: 'Science',
    description: 'Diagnosis and treatment of diseases. Requires strong Biology and Chemistry.',
    topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER Puducherry', 'MAMC Delhi'],
    entranceExams: ['NEET UG'],
    salaryRange: '₹8L - ₹25L+ per annum'
  },
  {
    id: 'ca',
    title: 'Chartered Accountancy',
    stream: 'Commerce',
    description: 'Expertise in accounting, auditing, and taxation. High demand in corporate sectors.',
    topColleges: ['ICAI (Institute of Chartered Accountants of India)'],
    entranceExams: ['CA Foundation'],
    salaryRange: '₹7L - ₹20L+ per annum'
  },
  {
    id: 'law',
    title: 'Law',
    stream: 'Arts',
    description: 'Legal advice and representation. Can specialize in corporate, criminal, or civil law.',
    topColleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'WBNUJS Kolkata'],
    entranceExams: ['CLAT', 'AILET', 'LSAT India'],
    salaryRange: '₹5L - ₹15L+ per annum'
  },
  {
    id: 'design',
    title: 'Graphic/Product Design',
    stream: 'Arts',
    description: 'Creative field focusing on visual communication or physical product aesthetics.',
    topColleges: ['NID Ahmedabad', 'IIT Bombay (IDC)', 'NIFT Delhi'],
    entranceExams: ['UCEED', 'CEED', 'NID DAT'],
    salaryRange: '₹4L - ₹12L+ per annum'
  },
  {
    id: 'mgmt',
    title: 'Management (BBA/MBA)',
    stream: 'Commerce',
    description: 'Focuses on business operations, marketing, finance, and human resources.',
    topColleges: ['IIM Ahmedabad (IPM)', 'IIM Indore (IPM)', 'Shaheed Sukhdev College of Business Studies'],
    entranceExams: ['IPMAT', 'JIPMAT', 'CUET'],
    salaryRange: '₹6L - ₹25L+ per annum'
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What kind of problems do you enjoy solving most?",
    options: [
      { text: "Mathematical puzzles and logical riddles", score: { Science: 3, Commerce: 1, Arts: 0 } },
      { text: "Understanding people's behavior and social issues", score: { Science: 0, Commerce: 1, Arts: 3 } },
      { text: "Managing money, budgets, or business ideas", score: { Science: 0, Commerce: 3, Arts: 1 } },
      { text: "Creating art, writing stories, or designing things", score: { Science: 1, Commerce: 0, Arts: 3 } }
    ]
  },
  {
    id: 2,
    text: "Which subject do you look forward to the most in school?",
    options: [
      { text: "Physics/Chemistry/Math", score: { Science: 4, Commerce: 0, Arts: 0 } },
      { text: "History/Geography/Civics", score: { Science: 0, Commerce: 0, Arts: 4 } },
      { text: "Economics/Math", score: { Science: 1, Commerce: 4, Arts: 0 } },
      { text: "Biology", score: { Science: 4, Commerce: 0, Arts: 0 } }
    ]
  },
  {
    id: 3,
    text: "How do you prefer to spend your free time?",
    options: [
      { text: "Building gadgets or coding", score: { Science: 3, Commerce: 0, Arts: 0 } },
      { text: "Reading literature or debating", score: { Science: 0, Commerce: 1, Arts: 3 } },
      { text: "Tracking stock markets or planning events", score: { Science: 0, Commerce: 3, Arts: 1 } },
      { text: "Sketching, painting, or photography", score: { Science: 0, Commerce: 0, Arts: 3 } }
    ]
  },
  {
    id: 4,
    text: "In a group project, which role do you naturally take?",
    options: [
      { text: "The technical expert who does the core work", score: { Science: 3, Commerce: 0, Arts: 0 } },
      { text: "The manager who organizes and tracks progress", score: { Science: 0, Commerce: 3, Arts: 1 } },
      { text: "The creative lead who handles the presentation", score: { Science: 0, Commerce: 0, Arts: 3 } },
      { text: "The researcher who gathers all the facts", score: { Science: 1, Commerce: 1, Arts: 2 } }
    ]
  },
  {
    id: 5,
    text: "What kind of environment do you see yourself working in?",
    options: [
      { text: "A laboratory or a high-tech office", score: { Science: 3, Commerce: 0, Arts: 0 } },
      { text: "A corporate boardroom or a bank", score: { Science: 0, Commerce: 3, Arts: 0 } },
      { text: "A creative studio or a field location", score: { Science: 0, Commerce: 0, Arts: 3 } },
      { text: "A courtroom or a government office", score: { Science: 0, Commerce: 1, Arts: 3 } }
    ]
  }
];
