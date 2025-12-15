import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSearch, FaCheckCircle, FaUsers } from "react-icons/fa";

import Container from "./../../components/Shared/Container";
import LoadingSpinner from "./../../components/Shared/LoadingSpinner";
import Card from "./../../components/Home/Card";
import TutorCard from "./../../components/Home/TutorCard";

const Home = () => {
  // Fetch latest 6 tuitions - using the correct endpoint
  const { data: tuitions = [], isLoading: tuitionsLoading } = useQuery({
    queryKey: ["latestTuitions"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/latest-tuitions`
      );
      return result.data;
    },
  });

  // Fetch latest 6 tutors - using the correct endpoint
  const { data: tutors = [], isLoading: tutorsLoading } = useQuery({
    queryKey: ["latestTutors"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/latest-tutors`
      );
      return result.data;
    },
  });

  if (tuitionsLoading || tutorsLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Tutor Today
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with qualified tutors for personalized learning experience
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/tuitions"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
              >
                Browse Tuitions
              </Link>
              <Link
                to="/tutors"
                className="px-8 py-4 border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition font-semibold"
              >
                Find Tutors
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Tuitions */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Latest Tuition Posts
            </h2>
            <p className="text-gray-600 text-lg">
              Browse recent tuition opportunities posted by students
            </p>
          </div>

          {tuitions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No tuitions available at the moment
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tuitions.map((tuition) => (
                  <Card key={tuition._id} tuition={tuition} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/tuitions"
                  className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
                >
                  View All Tuitions
                </Link>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Featured Tutors */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Featured Tutors
            </h2>
            <p className="text-gray-600 text-lg">
              Meet our qualified and experienced tutors
            </p>
          </div>

          {tutors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No tutors available at the moment
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor._id} tutor={tutor} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/tutors"
                  className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold shadow-lg"
                >
                  View All Tutors
                </Link>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-linear-to-br from-blue-50 to-purple-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              How Our Platform Works
            </h2>
            <p className="text-gray-600 text-lg">Simple 3-step process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSearch />,
                title: "Post Your Requirements",
                desc: "Create a tuition post with subject, class, and budget",
                color: "blue",
              },
              {
                icon: <FaUsers />,
                title: "Receive Applications",
                desc: "Tutors apply and you review their profiles",
                color: "purple",
              },
              {
                icon: <FaCheckCircle />,
                title: "Hire & Start Learning",
                desc: "Select tutor and begin learning",
                color: "green",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div
                  className={`text-5xl mb-4 text-${item.color}-600 flex justify-center`}
                >
                  {item.icon}
                </div>
                <div className="w-12 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Why Choose eTuitionBD?
            </h2>
            <p className="text-gray-600 text-lg">
              The best platform for finding tutors in Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Verified Tutors",
                desc: "All tutors are verified and background checked",
                icon: "✓",
              },
              {
                title: "Secure Payment",
                desc: "Safe and secure payment system with Stripe",
                icon: "💳",
              },
              {
                title: "24/7 Support",
                desc: "Round the clock customer support",
                icon: "🎧",
              },
              {
                title: "Best Prices",
                desc: "Competitive rates and transparent pricing",
                icon: "💰",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-xl text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of students and tutors on eTuitionBD
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/signup"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold shadow-lg"
              >
                Sign Up Now
              </Link>
              <Link
                to="/tuitions"
                className="px-8 py-4 border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition font-semibold"
              >
                Browse Tuitions
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
