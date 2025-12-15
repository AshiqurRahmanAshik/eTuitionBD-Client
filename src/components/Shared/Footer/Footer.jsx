import { Link } from "react-router";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Container from './../Container';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">eT</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  eTuitionBD
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Bangladesh's leading platform for connecting students with
                qualified tutors. Find your perfect tutor today!
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                >
                  <FaXTwitter className="text-xl" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tuitions"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Browse Tuitions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutors"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Find Tutors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Users */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                For Users
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/post-tuition"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Post Tuition
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Become a Tutor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-400 mt-1" />
                  <span>Dhanmondi, Dhaka-1205, Bangladesh</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-blue-400" />
                  <span>+880 1700-000000</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400" />
                  <span>info@etuitionbd.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-6 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} eTuitionBD. All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
