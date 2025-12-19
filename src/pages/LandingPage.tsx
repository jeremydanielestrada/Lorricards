import { useNavigate } from "react-router";
import Navbar from "../components/layout/Navbar";
import { Brain, Zap, Trophy, ArrowRight } from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-700 via-slate-800 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Master Any Subject with
            <span className="block bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Smart Flashcards
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            AI-powered learning platform that helps you create, organize, and
            study flashcards efficiently. Transform your notes into knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/register")}
              className="group bg-white hover:bg-slate-100 text-blue-600 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-lg border-2 border-white/40 hover:border-white/60 w-full sm:w-auto shadow-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Why Choose Lorricards?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/30 shadow-xl hover:shadow-2xl">
              <div className="bg-linear-to-br from-cyan-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Brain className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                AI-Powered Generation
              </h3>
              <p className="text-white/80 text-center text-lg">
                Upload your notes or paste content, and let AI automatically
                generate smart flashcards for efficient studying.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/30 shadow-xl hover:shadow-2xl">
              <div className="bg-linear-to-br from-cyan-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Smart Organization
              </h3>
              <p className="text-white/80 text-center text-lg">
                Organize your flashcards into folders by topic, subject, or
                course. Keep everything neat and accessible.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/30 shadow-xl hover:shadow-2xl">
              <div className="bg-linear-to-br from-cyan-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Trophy className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Track Your Progress
              </h3>
              <p className="text-white/80 text-center text-lg">
                Monitor your learning journey with intuitive progress tracking.
                See what you've mastered and what needs review.
              </p>
              <p className="text-white/80 text-center text-lg opacity-50 ">
                (Coming Soon)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white/15 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/30 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-6">
            Ready to Level Up Your Learning?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 text-center mb-8">
            Join thousands of students who are studying smarter with Lorricards.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/register")}
              className="group bg-white hover:bg-slate-100 text-blue-600 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center gap-2"
            >
              Start Learning Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-white/60">
        <p>&copy; 2025 Lorricards. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default LandingPage;
