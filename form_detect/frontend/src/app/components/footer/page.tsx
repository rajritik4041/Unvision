"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Opportunities", href: "/opportunities" }
  ];

  const services = [
    { name: "Analyze", href: "/profile/analyze" },
    { name: "Support", href: "/profile/contactus" },
    { name: "History", href: "/profile/history" },
    { name: "Technical Support", href: "/profile/blog" }
  ];

  const solutions = [
    { name: "Privacy Policy", href: "/profile/policy" },
    { name: "Terms & Conditions", href: "/profile/Terms&Condition" }
  ];

  const socialLinks = [
    { icon: faInstagram, href: "https://www.instagram.com/raj_ritik_455", name: "Instagram" },
    { icon: faLinkedin, href: "https://www.instagram.com/raj_ritik_455", name: "LinkedIn" },
    { icon: faWhatsapp, href: "https://whatsapp.com/channel/0029VbCHCP4Fi8xWduAeZu2B", name: "WhatsApp" }
  ];

  return (
    <footer className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="space-y-4">
            <Image
              src="/MultiDesease.svg"
              alt="Unvision Logo"
              width={160}
              height={60}
              className="h-12 w-auto"
            />

            <p className="text-sm text-green-200 leading-relaxed">
              We build smart and reliable AI solutions for modern farming.
              Helping farmers identify breeds, detect diseases, and improve productivity with ease.
            </p>

            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-yellow-400 transition"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </motion.a>
              ))}
            </div>
          </div>


          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-green-300 hover:text-yellow-400 transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

  
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-green-300 hover:text-yellow-400 transition text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">

              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-yellow-400 mt-1" />
                <span className="text-green-200 text-sm">
                  Akbarpur, Ambedkar Nagar, Uttar Pradesh, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-yellow-400" />
                <a
                  href="tel:+919236134041"
                  className="text-green-300 hover:text-yellow-400 transition text-sm"
                >
                  +91 9236134041
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-yellow-400" />
                <a
                  href="mailto:rajritik.9236@gmail.com"
                  className="text-green-300 hover:text-yellow-400 transition text-sm"
                >
                  rajritik.9236@gmail.com
                </a>
              </li>

            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 mb-6">
          <div className="flex flex-wrap justify-center gap-6">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                href={solution.href}
                className="text-green-300 hover:text-yellow-400 transition text-sm"
              >
                {solution.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 text-center">
          <p className="text-green-300 text-sm">
            © {currentYear} <span className="text-yellow-400 font-semibold">Unvision</span>.
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}