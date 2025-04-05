import { Briefcase, Compass, Users, BarChart, Brain, Target } from "lucide-react"; // or use Heroicons

const features = [
  {
    icon: <Compass className="w-8 h-8 text-indigo-400" />,
    title: "Personalized Roadmaps",
    description: "Get step-by-step learning paths tailored to your goals.",
  },
  {
    icon: <Brain className="w-8 h-8 text-indigo-400" />,
    title: "AI Career Guidance",
    description: "Smart suggestions based on your skills and interests.",
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-400" />,
    title: "Community Groups",
    description: "Learn together with peers, mentors, and role models.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-indigo-400" />,
    title: "Skill Tracking",
    description: "Track your progress and master new skills over time.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-indigo-400" />,
    title: "Job Insights",
    description: "Understand roles, salaries, and job demand in real-time.",
  },
  {
    icon: <Target className="w-8 h-8 text-indigo-400" />,
    title: "Goal-Based Learning",
    description: "Set goals and let the roadmap guide your journey.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-[#0f172a] text-white relative z-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What You’ll Get
        </h2>
        <p className="text-gray-400 text-md md:text-lg mb-12">
          Tools, guidance, and a powerful community — everything you need to grow.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1e293b] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
