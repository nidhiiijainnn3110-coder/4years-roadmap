import React, { useState, useEffect, useMemo } from 'react';
import { 
  Rocket, BookOpen, Code2, Target, CheckCircle2, Circle, Clock, 
  Briefcase, GraduationCap, LayoutDashboard, Map, Terminal, 
  FileCode2, Trophy, CalendarDays, Layers, User, ChevronRight,
  Sun, Moon, Github, ExternalLink, LogOut, Search
} from 'lucide-react';


const CAREER_PATHS = [
  'Software Developer', 'Full Stack Developer', 'AI/ML Engineer', 
  'Data Scientist', 'Cloud Engineer', 'Cybersecurity', 'DevOps', 'Mobile App Developer'
];

const SKILL_CATEGORIES = {
  Programming: ['C/C++', 'Python', 'Java', 'JavaScript/TypeScript', 'Go'],
  'Web Development': ['HTML/CSS', 'React', 'Node.js', 'Next.js', 'Tailwind CSS'],
  'AI/ML': ['Maths/Stats', 'NumPy/Pandas', 'Scikit-learn', 'TensorFlow/PyTorch', 'GenAI/LLMs'],
  Databases: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'],
  'Core CS': ['Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks'],
  Tools: ['Git/GitHub', 'Docker', 'AWS/Azure', 'Linux Basics']
};

const PROJECTS_DB = [
  { id: 'p1', title: 'Personal Portfolio', path: 'Software Developer', difficulty: 'Beginner', tech: ['HTML', 'CSS', 'JS'], hours: '10h' },
  { id: 'p2', title: 'Task Management App', path: 'Software Developer', difficulty: 'Intermediate', tech: ['React', 'Node.js'], hours: '25h' },
  { id: 'p3', title: 'E-commerce API', path: 'Full Stack Developer', difficulty: 'Intermediate', tech: ['Express', 'MongoDB'], hours: '30h' },
  { id: 'p4', title: 'Fullstack Social Platform', path: 'Full Stack Developer', difficulty: 'Advanced', tech: ['Next.js', 'PostgreSQL', 'Prisma'], hours: '50h' },
  { id: 'p5', title: 'House Price Predictor', path: 'AI/ML Engineer', difficulty: 'Beginner', tech: ['Python', 'Scikit-learn'], hours: '15h' },
  { id: 'p6', title: 'Image Classification API', path: 'AI/ML Engineer', difficulty: 'Advanced', tech: ['PyTorch', 'FastAPI'], hours: '40h' },
  { id: 'p7', title: 'Automated CI/CD Pipeline', path: 'DevOps', difficulty: 'Intermediate', tech: ['GitHub Actions', 'Docker'], hours: '20h' },
  { id: 'p8', title: 'AWS Serverless API', path: 'Cloud Engineer', difficulty: 'Intermediate', tech: ['AWS Lambda', 'DynamoDB'], hours: '25h' }
];

const RESOURCES_DB = [
  { id: 'r1', category: 'Programming', title: 'CS50: Introduction to Computer Science', type: 'Course', link: '#' },
  { id: 'r2', category: 'Web Dev', title: 'FreeCodeCamp Responsive Web Design', type: 'Course', link: '#' },
  { id: 'r3', category: 'DSA', title: 'NeetCode 150', type: 'Practice Platform', link: '#' },
  { id: 'r4', category: 'AI/ML', title: 'Fast.ai Deep Learning', type: 'Course', link: '#' },
  { id: 'r5', category: 'Interview', title: 'Tech Interview Handbook', type: 'Guide', link: '#' }
];


const generateRoadmap = (careerInterest) => {
  const roadmap = [
    {
      sem: 1, title: 'Foundation I', description: 'Starting your tech journey.',
      tasks: [
        { id: 's1-1', label: 'Master C or C++ Basics' },
        { id: 's1-2', label: 'Understand Memory Management' },
        { id: 's1-3', label: 'Basic Problem Solving (HackerRank/CodeChef)' },
        { id: 's1-4', label: 'Build 1 Console Application' }
      ]
    },
    {
      sem: 2, title: 'Foundation II', description: 'Web basics & Version Control.',
      tasks: [
        { id: 's2-1', label: 'Learn HTML, CSS & JS Fundamentals' },
        { id: 's2-2', label: 'Git & GitHub Basics' },
        { id: 's2-3', label: 'Object Oriented Programming (OOP)' },
        { id: 's2-4', label: 'Deploy a Static Portfolio Site' }
      ]
    },
    {
      sem: 3, title: 'Core CS I', description: 'Data Structures and Algorithms.',
      tasks: [
        { id: 's3-1', label: 'Data Structures (Arrays, Linked Lists, Stacks, Queues)' },
        { id: 's3-2', label: 'Basic Algorithms (Sorting, Searching)' },
        { id: 's3-3', label: 'Database Management Systems (DBMS) & SQL' },
        { id: 's3-4', label: 'Participate in a Hackathon' }
      ]
    },
    {
      sem: 4, title: 'Core CS II', description: 'Advanced fundamentals.',
      tasks: [
        { id: 's4-1', label: 'Operating Systems' },
        { id: 's4-2', label: 'Computer Networks' },
        { id: 's4-3', label: 'Advanced DSA (Trees, Graphs, DP)' },
        { id: 's4-4', label: 'Build 1 Full-Stack or Core Project' }
      ]
    }
  ];

  // Dynamic Specialization Semesters
  let sem5Tasks = [];
  let sem6Tasks = [];

  if (careerInterest === 'AI/ML Engineer' || careerInterest === 'Data Scientist') {
    sem5Tasks = [
      { id: 's5-1', label: 'Advanced Python (NumPy, Pandas, Matplotlib)' },
      { id: 's5-2', label: 'Probability & Statistics for ML' },
      { id: 's5-3', label: 'Machine Learning Basics (Scikit-learn)' }
    ];
    sem6Tasks = [
      { id: 's6-1', label: 'Deep Learning Basics (TensorFlow/PyTorch)' },
      { id: 's6-2', label: 'Generative AI & LLM Fundamentals' },
      { id: 's6-3', label: 'Build 2 Real-world AI Models' }
    ];
  } else if (careerInterest === 'Full Stack Developer') {
    sem5Tasks = [
      { id: 's5-1', label: 'Advanced JS & React (Hooks, State Management)' },
      { id: 's5-2', label: 'Node.js & Express Fundamentals' },
      { id: 's5-3', label: 'REST APIs & Postman' }
    ];
    sem6Tasks = [
      { id: 's6-1', label: 'Database Design (MongoDB/PostgreSQL)' },
      { id: 's6-2', label: 'Authentication & Security (JWT, OAuth)' },
      { id: 's6-3', label: 'Deploy a Full Stack App (Vercel/Render)' }
    ];
  } else {
    // Default / Software Developer
    sem5Tasks = [
      { id: 's5-1', label: 'Deep dive into primary language/framework' },
      { id: 's5-2', label: 'API Integration & Usage' },
      { id: 's5-3', label: 'Cloud Fundamentals (AWS/GCP/Azure)' }
    ];
    sem6Tasks = [
      { id: 's6-1', label: 'System Design Basics' },
      { id: 's6-2', label: 'Microservices & Docker Basics' },
      { id: 's6-3', label: 'Contribute to Open Source (1 PR)' }
    ];
  }

  roadmap.push({ sem: 5, title: 'Specialization I', description: `Focusing on ${careerInterest}.`, tasks: sem5Tasks });
  roadmap.push({ sem: 6, title: 'Specialization II', description: 'Advanced concepts & Projects.', tasks: sem6Tasks });

  roadmap.push({
    sem: 7, title: 'Placement Prep I', description: 'Polishing skills for interviews.',
    tasks: [
      { id: 's7-1', label: 'Revise CS Fundamentals (OS, DBMS, CN)' },
      { id: 's7-2', label: 'Advanced DSA Practice (LeetCode/GeeksForGeeks)' },
      { id: 's7-3', label: 'Resume Building & LinkedIn Optimization' },
      { id: 's7-4', label: 'Apply for Internships' }
    ]
  });

  roadmap.push({
    sem: 8, title: 'Placement Prep II', description: 'Mock interviews & Job hunt.',
    tasks: [
      { id: 's8-1', label: 'Aptitude & Logical Reasoning Practice' },
      { id: 's8-2', label: 'Give 3+ Mock Interviews' },
      { id: 's8-3', label: 'System Design Interview Prep' },
      { id: 's8-4', label: 'Final Job Applications' }
    ]
  });

  return roadmap;
};


const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:scale-[1.02]",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700",
    outline: "border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
    ghost: "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 ${className}`}>
    {children}
  </div>
);

const ProgressBar = ({ progress, className = '' }) => (
  <div className={`w-full bg-slate-800 rounded-full h-2.5 overflow-hidden ${className}`}>
    <div 
      className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 h-2.5 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    ></div>
  </div>
);


const LandingPage = ({ onStart }) => (
  <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full pointer-events-none"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none"></div>
    
    <nav className="p-6 flex justify-between items-center z-10 max-w-7xl w-full mx-auto">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Rocket className="text-indigo-500" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">CareerLaunch</span>
      </div>
      <Button onClick={onStart}>Get Started</Button>
    </nav>

    <main className="flex-1 flex flex-col items-center justify-center text-center p-6 z-10">
      <div className="max-w-4xl space-y-8 animate-fade-in-up">
        <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-semibold mb-4 backdrop-blur-md">
          Gen-Z's #1 Career Planner
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          4 Years. One Roadmap. <br className="hidden md:block"/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500">
            Your Dream IT Career.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Turn your college years into skills, projects, internships, and a job-ready portfolio. Personalized for B.Tech, BCA, and CS students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button onClick={onStart} className="text-lg px-8 py-4">Build My Roadmap <ChevronRight size={20}/></Button>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {[
          { icon: Map, title: "Personalized Roadmap", desc: "Dynamic semester-by-semester planning tailored to your chosen path." },
          { icon: Trophy, title: "Job Readiness Score", desc: "Track your real-world employability, not just your GPA." },
          { icon: FileCode2, title: "Project Builder", desc: "Curated portfolio projects with tech stacks and difficulty ratings." }
        ].map((feature, i) => (
          <div key={i} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-3xl hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-4 text-indigo-400">
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">{feature.title}</h3>
            <p className="text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </main>
  </div>
);


const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', course: '', year: '1', interest: 'Software Developer', hours: '10'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      <div className="absolute top-0 w-full h-1 bg-slate-900">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      
      <Card className="max-w-xl w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {step === 1 ? "Let's get to know you" : step === 2 ? "Academic Details" : "Your Goals"}
          </h2>
          <p className="text-slate-400">Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">What's your name?</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. Alex" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Degree / Course</label>
                <select name="course" value={formData.course} onChange={handleChange} required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-indigo-500">
                  <option value="" disabled>Select course...</option>
                  <option value="B.Tech CS/IT">B.Tech CS/IT</option>
                  <option value="BCA">BCA</option>
                  <option value="B.Sc CS/IT">B.Sc CS/IT</option>
                  <option value="MCA">MCA</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Current Year</label>
                <select name="year" value={formData.year} onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-indigo-500">
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Target Career Path</label>
                <select name="interest" value={formData.interest} onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-indigo-500">
                  {CAREER_PATHS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Weekly Learning Hours Available</label>
                <input type="number" name="hours" min="1" max="40" value={formData.hours} onChange={handleChange} required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-indigo-500" />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <Button type="button" variant="secondary" onClick={() => setStep(step - 1)} className="flex-1">Back</Button>
            )}
            <Button type="submit" className="flex-1">{step === 3 ? "Generate Roadmap" : "Continue"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};


const DashboardLayout = ({ children, userData, onLogout, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'roadmap', icon: Map, label: 'My Roadmap' },
    { id: 'skills', icon: Terminal, label: 'Skills Tracker' },
    { id: 'projects', icon: FileCode2, label: 'Project Builder' },
    { id: 'placement', icon: Target, label: 'Placement Prep' },
    { id: 'planner', icon: CalendarDays, label: 'Weekly Planner' },
    { id: 'resources', icon: BookOpen, label: 'Resources' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2 text-xl font-bold">
          <Rocket className="text-indigo-500" size={24} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">CareerLaunch</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === item.id 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-xl mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex items-center justify-center font-bold text-white">
              {userData.name.charAt(0)}
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-semibold truncate">{userData.name}</p>
              <p className="text-slate-400 text-xs truncate">{userData.interest}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={16} /> Logout / Reset
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};


const DashboardHome = ({ userData, progress, score, switchTab }) => (
  <div className="space-y-8">
    <header>
      <h1 className="text-3xl font-bold text-white">Welcome back, {userData.name}! 👋</h1>
      <p className="text-slate-400 mt-2">Here's your progress towards becoming a {userData.interest}.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Score Card */}
      <Card className="md:col-span-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-[100px] pointer-events-none"></div>
        <h3 className="text-lg font-semibold text-slate-200 mb-6 w-full text-left">Job Readiness Score</h3>
        
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-800" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" 
              className="text-indigo-500 transition-all duration-1000 ease-out" 
              strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * score) / 100} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">{score}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 mt-6 mt-auto italic text-left">
          *This score is a progress indicator based on completed tasks, not a guarantee of employment.
        </p>
      </Card>

      {/* Stats Cards */}
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        <Card className="hover:border-indigo-500/50 transition-colors">
          <div className="flex items-center gap-3 text-indigo-400 mb-4"><CheckCircle2 size={24}/> <h4 className="font-semibold text-slate-200">Roadmap Progress</h4></div>
          <div className="text-3xl font-bold text-white mb-2">{progress.checkedItems.length} <span className="text-sm text-slate-400 font-normal">tasks done</span></div>
          <Button variant="ghost" className="w-full justify-between px-0 text-indigo-400" onClick={() => switchTab('roadmap')}>Continue Roadmap <ChevronRight size={16}/></Button>
        </Card>
        
        <Card className="hover:border-fuchsia-500/50 transition-colors">
          <div className="flex items-center gap-3 text-fuchsia-400 mb-4"><Terminal size={24}/> <h4 className="font-semibold text-slate-200">Skills Learned</h4></div>
          <div className="text-3xl font-bold text-white mb-2">{Object.values(progress.skills).filter(v => v === 'completed').length} <span className="text-sm text-slate-400 font-normal">completed</span></div>
          <Button variant="ghost" className="w-full justify-between px-0 text-fuchsia-400" onClick={() => switchTab('skills')}>Update Skills <ChevronRight size={16}/></Button>
        </Card>

        <Card className="hover:border-blue-500/50 transition-colors">
          <div className="flex items-center gap-3 text-blue-400 mb-4"><FileCode2 size={24}/> <h4 className="font-semibold text-slate-200">Projects Built</h4></div>
          <div className="text-3xl font-bold text-white mb-2">{progress.projects.length} <span className="text-sm text-slate-400 font-normal">completed</span></div>
          <Button variant="ghost" className="w-full justify-between px-0 text-blue-400" onClick={() => switchTab('projects')}>View Projects <ChevronRight size={16}/></Button>
        </Card>

        <Card className="hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center gap-3 text-emerald-400 mb-4"><Code2 size={24}/> <h4 className="font-semibold text-slate-200">DSA Solved</h4></div>
          <div className="text-3xl font-bold text-white mb-2">{progress.dsa} <span className="text-sm text-slate-400 font-normal">problems</span></div>
          <Button variant="ghost" className="w-full justify-between px-0 text-emerald-400" onClick={() => switchTab('placement')}>Practice More <ChevronRight size={16}/></Button>
        </Card>
      </div>
    </div>
  </div>
);


const RoadmapView = ({ interest, progress, updateProgress }) => {
  const roadmapData = useMemo(() => generateRoadmap(interest), [interest]);

  const toggleTask = (taskId) => {
    const newChecked = progress.checkedItems.includes(taskId)
      ? progress.checkedItems.filter(id => id !== taskId)
      : [...progress.checkedItems, taskId];
    updateProgress({ checkedItems: newChecked });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Your 4-Year Master Plan</h2>
        <p className="text-slate-400 mt-1">Customized for {interest}. Check off items as you complete them.</p>
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 space-y-12 pb-12">
        {roadmapData.map((semester, index) => {
          const semCompletedTasks = semester.tasks.filter(t => progress.checkedItems.includes(t.id)).length;
          const isFullyCompleted = semCompletedTasks === semester.tasks.length;

          return (
            <div key={semester.sem} className="relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div className={`absolute -left-[11px] top-2 w-5 h-5 rounded-full border-4 border-slate-950 ${isFullyCompleted ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
              
              <Card className={`transition-all duration-300 ${isFullyCompleted ? 'border-indigo-500/30 bg-indigo-500/5' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div>
                    <div className="text-indigo-400 text-sm font-bold mb-1">SEMESTER {semester.sem}</div>
                    <h3 className="text-xl font-bold text-white">{semester.title}</h3>
                    <p className="text-slate-400 text-sm">{semester.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-300 mb-2">{semCompletedTasks} / {semester.tasks.length} Completed</div>
                    <ProgressBar progress={(semCompletedTasks / semester.tasks.length) * 100} className="w-32" />
                  </div>
                </div>

                <div className="space-y-3">
                  {semester.tasks.map(task => {
                    const isChecked = progress.checkedItems.includes(task.id);
                    return (
                      <div 
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-start gap-4 p-3 rounded-xl cursor-pointer transition-colors border ${
                          isChecked 
                            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-200' 
                            : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="mt-0.5">
                          {isChecked ? <CheckCircle2 className="text-indigo-400" size={20} /> : <Circle className="text-slate-600" size={20} />}
                        </div>
                        <span className={`flex-1 ${isChecked ? 'line-through opacity-75' : ''}`}>{task.label}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const SkillsTracker = ({ progress, updateProgress }) => {
  const handleStatusChange = (skill, status) => {
    updateProgress({ skills: { ...progress.skills, [skill]: status } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Skills Tracker</h2>
        <p className="text-slate-400 mt-1">Monitor your proficiency across different domains.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
          <Card key={category}>
            <h3 className="text-xl font-bold text-slate-200 mb-6">{category}</h3>
            <div className="space-y-4">
              {skills.map(skill => {
                const status = progress.skills[skill] || 'not-started';
                return (
                  <div key={skill} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                    <span className="font-medium text-slate-300">{skill}</span>
                    <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                      <button 
                        onClick={() => handleStatusChange(skill, 'not-started')}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${status === 'not-started' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                      >Todo</button>
                      <button 
                        onClick={() => handleStatusChange(skill, 'learning')}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${status === 'learning' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                      >Learning</button>
                      <button 
                        onClick={() => handleStatusChange(skill, 'completed')}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                      >Done</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


const ProjectBuilder = ({ interest, progress, updateProgress }) => {
  const toggleProject = (projectId) => {
    const newProjects = progress.projects.includes(projectId)
      ? progress.projects.filter(id => id !== projectId)
      : [...progress.projects, projectId];
    updateProgress({ projects: newProjects });
  };

  // Sort to put career-specific projects first
  const sortedProjects = [...PROJECTS_DB].sort((a, b) => {
    if (a.path === interest && b.path !== interest) return -1;
    if (a.path !== interest && b.path === interest) return 1;
    return 0;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Project Builder</h2>
        <p className="text-slate-400 mt-1">Recommended real-world projects to build your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedProjects.map(project => {
          const isCompleted = progress.projects.includes(project.id);
          const isRecommended = project.path === interest;
          return (
            <Card key={project.id} className={`flex flex-col ${isRecommended ? 'border-indigo-500/30' : ''}`}>
              {isRecommended && <div className="text-xs font-bold text-indigo-400 mb-2 tracking-wider">HIGHLY RECOMMENDED</div>}
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>{project.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-md font-medium border ${
                  project.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  project.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>{project.difficulty}</span>
              </div>
              
              <div className="flex gap-2 mb-6 flex-wrap">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md">{t}</span>
                ))}
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock size={16} /> Est. {project.hours}
                </div>
                <Button 
                  variant={isCompleted ? 'secondary' : 'primary'} 
                  onClick={() => toggleProject(project.id)}
                  className="py-1.5 px-3 text-sm"
                >
                  {isCompleted ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};


const PlacementPrep = ({ progress, updateProgress }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Placement Preparation</h2>
        <p className="text-slate-400 mt-1">Track your interview readiness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="text-emerald-400" />
            <h3 className="text-xl font-bold text-slate-200">DSA Tracker</h3>
          </div>
          <p className="text-slate-400 text-sm mb-4">Total problems solved on LeetCode / GFG / CodeStudio:</p>
          <div className="flex items-center gap-4">
            <input 
              type="number" min="0" 
              value={progress.dsa} 
              onChange={(e) => updateProgress({ dsa: parseInt(e.target.value) || 0 })}
              className="w-32 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 focus:border-indigo-500 text-center text-xl font-bold"
            />
            <span className="text-slate-500">problems</span>
          </div>
          <ProgressBar progress={(progress.dsa / 300) * 100} className="mt-6" />
          <p className="text-xs text-slate-500 mt-2 text-right">Target: 300+</p>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-fuchsia-400" />
            <h3 className="text-xl font-bold text-slate-200">Pre-requisites Checklist</h3>
          </div>
          <div className="space-y-3">
            {[
              { id: 'resume', label: '1-Page ATS Resume Ready' },
              { id: 'linkedin', label: 'LinkedIn Profile Optimized' },
              { id: 'github', label: 'GitHub Profile Pinned with Projects' },
              { id: 'mock1', label: 'Completed Mock Interview 1' }
            ].map(item => {
              const isChecked = progress.checkedItems.includes(item.id);
              return (
                <div 
                  key={item.id} onClick={() => {
                    const newChecked = isChecked 
                      ? progress.checkedItems.filter(id => id !== item.id) 
                      : [...progress.checkedItems, item.id];
                    updateProgress({ checkedItems: newChecked });
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border ${
                    isChecked ? 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-200' : 'bg-slate-900/50 border-slate-800 text-slate-300'
                  }`}
                >
                  {isChecked ? <CheckCircle2 className="text-fuchsia-400" size={18} /> : <Circle className="text-slate-600" size={18} />}
                  <span className="text-sm">{item.label}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

const ResourcesView = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold text-white">Curated Resources</h2>
      <p className="text-slate-400 mt-1">Best free learning materials on the internet.</p>
    </div>

    <div className="space-y-4">
      {RESOURCES_DB.map(res => (
        <a key={res.id} href={res.link} className="block group">
          <Card className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                {res.type === 'Course' ? <GraduationCap size={20}/> : <ExternalLink size={20}/>}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">{res.title}</h4>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{res.category}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{res.type}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="hidden sm:block text-slate-600 group-hover:text-indigo-400 transition-colors" />
          </Card>
        </a>
      ))}
    </div>
  </div>
);

const WeeklyPlanner = ({ userData }) => {
  const dailyHours = (userData.hours / 7).toFixed(1);
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Weekly Planner</h2>
        <p className="text-slate-400 mt-1">Based on your {userData.hours} hrs/week commitment.</p>
      </div>
      <Card>
        <div className="text-center py-12">
          <CalendarDays className="mx-auto text-indigo-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Your Daily Goal: ~{dailyHours} Hours</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            Consistency beats intensity. Try to split your learning into 1-hour focus blocks (Pomodoro technique).
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            Calendar sync feature coming soon!
          </div>
        </div>
      </Card>
    </div>
  )
}


const App = () => {
  const [view, setView] = useState('landing'); // 'landing', 'onboarding', 'dashboard'
  const [activeTab, setActiveTab] = useState('home');
  const [userData, setUserData] = useState(null);
  
  const [progress, setProgress] = useState({
    checkedItems: [],
    skills: {}, // { 'Python': 'learning', 'HTML/CSS': 'completed' }
    projects: [], // ['p1', 'p3']
    dsa: 0
  });

  // Load from local storage
  useEffect(() => {
    document.documentElement.classList.add('dark'); // Force dark mode for premium look
    const storedUser = localStorage.getItem('cl_user');
    const storedProgress = localStorage.getItem('cl_progress');
    
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      setView('dashboard');
    }
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Save progress to local storage
  const updateProgress = (newData) => {
    const updated = { ...progress, ...newData };
    setProgress(updated);
    localStorage.setItem('cl_progress', JSON.stringify(updated));
  };

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    localStorage.setItem('cl_user', JSON.stringify(data));
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('cl_user');
    localStorage.removeItem('cl_progress');
    setUserData(null);
    setProgress({ checkedItems: [], skills: {}, projects: [], dsa: 0 });
    setView('landing');
  };

  // Calculate Job Readiness Score (0-100)
  const calculateScore = () => {
    if (!userData) return 0;
    
    // Total Roadmap items logic (approx 4 tasks * 8 sems = 32)
    const maxRoadmap = 32;
    const roadmapScore = Math.min((progress.checkedItems.length / maxRoadmap) * 35, 35); // 35% weight
    
    // Skills (completed)
    const completedSkills = Object.values(progress.skills).filter(v => v === 'completed').length;
    const skillsScore = Math.min((completedSkills / 15) * 25, 25); // 25% weight, assume 15 skills is good
    
    // Projects
    const projectsScore = Math.min((progress.projects.length / 3) * 20, 20); // 20% weight, 3 projects is good
    
    // DSA
    const dsaScore = Math.min((progress.dsa / 200) * 20, 20); // 20% weight, 200 is good

    return Math.round(roadmapScore + skillsScore + projectsScore + dsaScore);
  };

  // Render Views
  if (view === 'landing') return <LandingPage onStart={() => setView('onboarding')} />;
  if (view === 'onboarding') return <Onboarding onComplete={handleOnboardingComplete} />;
  
  if (view === 'dashboard' && userData) {
    return (
      <DashboardLayout 
        userData={userData} 
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {activeTab === 'home' && <DashboardHome userData={userData} progress={progress} score={calculateScore()} switchTab={setActiveTab} />}
        {activeTab === 'roadmap' && <RoadmapView interest={userData.interest} progress={progress} updateProgress={updateProgress} />}
        {activeTab === 'skills' && <SkillsTracker progress={progress} updateProgress={updateProgress} />}
        {activeTab === 'projects' && <ProjectBuilder interest={userData.interest} progress={progress} updateProgress={updateProgress} />}
        {activeTab === 'placement' && <PlacementPrep progress={progress} updateProgress={updateProgress} />}
        {activeTab === 'planner' && <WeeklyPlanner userData={userData} />}
        {activeTab === 'resources' && <ResourcesView />}
      </DashboardLayout>
    );
  }

  return null;
};

export default App;