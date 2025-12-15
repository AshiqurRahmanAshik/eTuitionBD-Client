import Container from "../../components/Shared/Container";
import { FaCheckCircle, FaUsers, FaBook, FaStar, FaHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About eTuitionBD</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting students with qualified tutors across Bangladesh for personalized learning experiences
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-blue-100 leading-relaxed">
              To revolutionize the tutoring industry in Bangladesh by providing a transparent, efficient, and secure platform that connects students with qualified tutors. We believe every student deserves access to quality education, and every tutor deserves fair compensation for their expertise.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose eTuitionBD?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCheckCircle className="text-4xl text-green-600" />,
                title: "Verified Tutors",
                desc: "All tutors are thoroughly verified and background checked for your safety and peace of mind.",
              },
              {
                icon: <FaUsers className="text-4xl text-blue-600" />,
                title: "Large Network",
                desc: "Access to hundreds of qualified tutors across Bangladesh in various subjects and classes.",
              },
              {
                icon: <FaBook className="text-4xl text-purple-600" />,
                title: "All Subjects",
                desc: "From Mathematics to English, Science to Arts - we cover all academic subjects.",
              },
              {
                icon: <FaStar className="text-4xl text-yellow-600" />,
                title: "Quality Guaranteed",
                desc: "Rating and review system ensures you get the best tutors for your needs.",
              },
              {
                icon: <FaHeart className="text-4xl text-red-600" />,
                title: "Student-Centric",
                desc: "We prioritize student needs and ensure the best learning experience possible.",
              },
              {
                icon: <FaCheckCircle className="text-4xl text-indigo-600" />,
                title: "Secure Payments",
                desc: "Safe and secure payment system powered by Stripe for your financial safety.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Post Your Requirements",
                desc: "Create a tuition post with your subject, class, location, and budget details.",
              },
              {
                step: "2",
                title: "Review Applications",
                desc: "Qualified tutors will apply. Review their profiles, qualifications, and experience.",
              },
              {
                step: "3",
                title: "Hire & Start Learning",
                desc: "Choose the best tutor, make payment, and begin your learning journey!",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "500+", label: "Active Tutors" },
            { number: "1000+", label: "Students" },
            { number: "50+", label: "Subjects" },
            { number: "4.8", label: "Average Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white"
            >
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center border-2 border-blue-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of students and tutors on eTuitionBD today
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
            >
              Sign Up Now
            </a>
            <a
              href="/tuitions"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition"
            >
              Browse Tuitions
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;