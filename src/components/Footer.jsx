import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-500 text-white mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About TASPEF</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              Tamil Nadu Association of Senior Professionals of Environment and
              Forests - Working together to protect and conserve Tamil Nadu
              forests and wildlife.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/office-bearers"
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                >
                  Office Bearers
                </Link>
              </li>
              <li>
                <Link
                  to="/agm-reports"
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                >
                  AGM Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/e-magazines"
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                >
                  E-Magazine
                </Link>
              </li>
              <li>
                <Link
                  to="/members"
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                >
                  Members
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Location</h3>
            <div className="text-sm text-gray-200 space-y-2">
              <p>Chennai, Tamil Nadu, India</p>
              {/* <p>Email: info@taspef.org</p> */}
              {/* <p>Phone: +91 XXX XXX XXXX</p> */}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-400 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-200">
              © {currentYear} TASPEF. All rights reserved.
            </p>
            <p className="text-sm text-gray-200">
              Powered by{" "}
              <a
                href="https://skieztechnologies.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-500 hover:text-accent-400 font-medium transition-colors duration-200"
              >
                Skiez Technologies India Private Limited&nbsp;
              </a>
              <a
                href="https://www.skiezdigital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-500 hover:text-accent-400 font-medium transition-colors duration-200"
              >
                & Skiez Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
