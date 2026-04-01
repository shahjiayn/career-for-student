import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Compass, 
  GraduationCap, 
  BrainCircuit, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Search,
  Building2,
  Trophy
} from 'lucide-react';
import { CAREERS, QUESTIONS } from './data';
import { cn } from './lib/utils';
import { getCareerAdvice } from './services/geminiService';
import Markdown from 'react-markdown';

type Section = 'home' | 'explorer' | 'quiz' | 'result' | 'colleges';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Science: 0, Commerce: 0, Arts: 0 });
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAnswer = (score: Record<string, number>) => {
    const newScores = { ...scores };
    Object.keys(score).forEach(key => {
      newScores[key] = (newScores[key] || 0) + score[key];
    });
    setScores(newScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setActiveSection('result');
      generateAdvice(newScores);
    }
  };

  const generateAdvice = async (finalScores: Record<string, number>) => {
    setLoadingAdvice(true);
    try {
      const advice = await getCareerAdvice(finalScores, "I want to know about the best options in India.");
      setAiAdvice(advice || "Unable to generate advice at the moment.");
    } catch (error) {
      console.error(error);
      setAiAdvice("Error generating AI advice. Please try again later.");
    } finally {
      setLoadingAdvice(false);
    }
  };

  const resetQuiz = () => {
    setScores({ Science: 0, Commerce: 0, Arts: 0 });
    setCurrentQuestion(0);
    setAiAdvice(null);
    setActiveSection('quiz');
  };

  const filteredCareers = CAREERS.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.stream.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveSection('home')}
          >
            <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Compass className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Margdarshak</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button onClick={() => setActiveSection('explorer')} className={cn("hover:text-blue-600 transition-colors", activeSection === 'explorer' && "text-blue-600")}>Careers</button>
            <button onClick={() => setActiveSection('quiz')} className={cn("hover:text-blue-600 transition-colors", activeSection === 'quiz' && "text-blue-600")}>Aptitude Test</button>
            <button onClick={() => setActiveSection('colleges')} className={cn("hover:text-blue-600 transition-colors", activeSection === 'colleges' && "text-blue-600")}>Top Colleges</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    For Class 10 Students in India
                  </div>
                  <h1 className="text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                    Find Your <span className="text-blue-600">Perfect</span> Career Path.
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                    Confused about Science, Commerce, or Arts? Take our AI-powered aptitude test and explore the best careers and colleges in India.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setActiveSection('quiz')}
                      className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                    >
                      Start Aptitude Test <ChevronRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setActiveSection('explorer')}
                      className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                    >
                      Explore Streams <BookOpen className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-2xl opacity-50 -z-10 animate-pulse" />
                  <img 
                    src="https://picsum.photos/seed/education/800/600" 
                    alt="Student studying" 
                    className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/3]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Quick Stats/Features */}
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: BrainCircuit, title: "AI Analysis", desc: "Get personalized recommendations based on your unique strengths." },
                  { icon: GraduationCap, title: "Top Colleges", desc: "Curated list of premium institutions like IITs, AIIMS, and NLUs." },
                  { icon: Trophy, title: "Career Roadmap", desc: "Step-by-step guide from Class 10 to your dream job." }
                ].map((feature, i) => (
                  <div key={i} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <feature.icon className="w-10 h-10 text-blue-600 mb-6" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'explorer' && (
            <motion.div 
              key="explorer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold">Career Explorer</h2>
                  <p className="text-slate-600">Discover paths across all major streams in India.</p>
                </div>
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search careers or streams..." 
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCareers.map((career) => (
                  <div key={career.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
                    <div className={cn(
                      "inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-4",
                      career.stream === 'Science' ? "bg-blue-50 text-blue-700" :
                      career.stream === 'Commerce' ? "bg-green-50 text-green-700" :
                      "bg-purple-50 text-purple-700"
                    )}>
                      {career.stream}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{career.title}</h3>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">{career.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Top Colleges</span>
                        <div className="flex flex-wrap gap-2">
                          {career.topColleges.slice(0, 2).map(college => (
                            <span key={college} className="text-xs bg-slate-50 px-2 py-1 rounded border border-slate-100">{college}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                        <span className="text-xs font-bold text-blue-600">{career.salaryRange}</span>
                        <button className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1">
                          Details <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                  <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  {QUESTIONS[currentQuestion].text}
                </h2>

                <div className="grid gap-4">
                  {QUESTIONS[currentQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full text-left p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group flex justify-between items-center"
                    >
                      <span className="font-medium text-slate-700 group-hover:text-blue-700">{option.text}</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-4xl font-bold">Your Career Profile is Ready!</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Based on your answers, we've analyzed your aptitude and interests. Here's your personalized roadmap.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Score Breakdown */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-blue-600" />
                    Aptitude Scores
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(scores).map(([stream, score]) => (
                      <div key={stream} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                          <span>{stream}</span>
                          <span>{Math.round((score / 20) * 100)}%</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            className={cn(
                              "h-full rounded-full",
                              stream === 'Science' ? "bg-blue-500" :
                              stream === 'Commerce' ? "bg-green-500" :
                              "bg-purple-500"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${(score / 20) * 100}%` }}
                            transition={{ delay: 0.5, duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={resetQuiz}
                    className="w-full py-3 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Retake Quiz <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* AI Advice */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <Sparkles className="w-6 h-6 text-blue-200" />
                  </div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    AI Counselor's Roadmap
                  </h3>
                  
                  {loadingAdvice ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                      <p className="text-slate-400 font-medium animate-pulse">Analyzing your profile...</p>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-blue-600">
                      <Markdown>{aiAdvice}</Markdown>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'colleges' && (
            <motion.div 
              key="colleges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Top Institutions in India</h2>
                <p className="text-slate-600">Premium colleges categorized by stream and specialization.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { 
                    stream: "Engineering", 
                    icon: Building2, 
                    colleges: ["IIT Madras", "IIT Delhi", "IIT Bombay", "IIT Kanpur", "IIT Kharagpur", "BITS Pilani"],
                    color: "blue"
                  },
                  { 
                    stream: "Medical", 
                    icon: GraduationCap, 
                    colleges: ["AIIMS Delhi", "PGIMER Chandigarh", "CMC Vellore", "NIMHANS Bangalore", "Amrita Vishwa Vidyapeetham"],
                    color: "red"
                  },
                  { 
                    stream: "Management", 
                    icon: Trophy, 
                    colleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Kozhikode", "IIT Delhi (DoMS)", "IIM Calcutta"],
                    color: "green"
                  },
                  { 
                    stream: "Law", 
                    icon: BookOpen, 
                    colleges: ["NLSIU Bangalore", "NLU Delhi", "NALSAR Hyderabad", "WBNUJS Kolkata", "JMI New Delhi"],
                    color: "purple"
                  }
                ].map((group, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                      group.color === 'blue' ? "bg-blue-50 text-blue-600" :
                      group.color === 'red' ? "bg-red-50 text-red-600" :
                      group.color === 'green' ? "bg-green-50 text-green-600" :
                      "bg-purple-50 text-purple-600"
                    )}>
                      <group.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6">{group.stream}</h3>
                    <div className="grid gap-3">
                      {group.colleges.map((college, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-slate-600 group cursor-default">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors" />
                          <span className="font-medium group-hover:text-slate-900 transition-colors">{college}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Compass className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">Margdarshak</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Empowering Indian students to make informed career choices after Class 10. Built with AI to provide personalized guidance.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button onClick={() => setActiveSection('explorer')} className="hover:text-blue-600">Career Library</button></li>
              <li><button onClick={() => setActiveSection('colleges')} className="hover:text-blue-600">College Rankings</button></li>
              <li><button onClick={() => setActiveSection('quiz')} className="hover:text-blue-600">Aptitude Test</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-100 text-center text-xs text-slate-400">
          © 2026 Margdarshak Career Counseling. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
