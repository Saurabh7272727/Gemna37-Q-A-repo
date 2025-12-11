import React from 'react';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaHeart,
    FaArrowUp
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Footer as StudentFooter } from '../workSpaceStudent/componentSpace/Footer.jsx';
const Footer = ({ renderPart }) => {
    const navi = useNavigate();
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {
                renderPart ? <StudentFooter /> :
                    <footer className="relative bg-gray-900 text-white pt-16 pb-8 px-4 md:px-8 overflow-hidden">
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                                backgroundSize: '30px'
                            }}></div>
                        </div>

                        <div className="container mx-auto relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                                <div className="lg:col-span-1">
                                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Gemna.ai</h3>
                                    <p className="text-gray-400 mb-6 max-w-md">
                                        Transforming education through innovative AI-powered solutions for college management, student engagement, and academic excellence.
                                    </p>
                                    <div className="flex space-x-4">
                                        <a href="#" className="bg-gray-800 hover:bg-blue-600 transition-all duration-300 p-3 rounded-full">
                                            <FaFacebookF className="text-lg" />
                                        </a>
                                        <a href="#" className="bg-gray-800 hover:bg-blue-400 transition-all duration-300 p-3 rounded-full">
                                            <FaTwitter className="text-lg" />
                                        </a>
                                        <a href="#" className="bg-gray-800 hover:bg-pink-600 transition-all duration-300 p-3 rounded-full">
                                            <FaInstagram className="text-lg" />
                                        </a>
                                        <a href="#" className="bg-gray-800 hover:bg-blue-700 transition-all duration-300 p-3 rounded-full">
                                            <FaLinkedinIn className="text-lg" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-6 relative inline-block">
                                        Resources
                                        <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"></span>
                                    </h4>
                                    <ul className="space-y-3">
                                        <li>
                                            <button onClick={() => navi('/admin/registeration')} href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                                Registeration Dashboard - Gemna.edu.support
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                {/* Newsletter */}
                                <div>
                                    <h4 className="text-lg font-semibold mb-6 relative inline-block">
                                        Stay Updated
                                        <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"></span>
                                    </h4>
                                    <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
                                    <div className="flex flex-col space-y-3">
                                        <input
                                            type="email"
                                            placeholder="Your email address"
                                            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                        />
                                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom section */}
                            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                                <div className="flex items-center text-gray-400 mb-4 md:mb-0">
                                    <span>© {currentYear} Gemna.edu.support Made with</span>
                                    <FaHeart className="text-red-500 mx-1" />
                                    <span>for better education and integrity</span>
                                </div>

                                <div className="flex space-x-6">
                                    {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                        <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Scroll to top button */}
                        <button
                            onClick={scrollToTop}
                            className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 z-50"
                            aria-label="Scroll to top"
                        >
                            <FaArrowUp />
                        </button>
                    </footer>
            }
        </>

    );
};

export default Footer;