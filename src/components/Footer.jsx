import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';

const LINK_COLUMNS = [
  {
    titleKey: 'footer.quickLinks',
    links: [
      { to: '/', labelKey: 'nav.home' },
      { to: '/shop', labelKey: 'footer.ourCollections' },
      { to: '/orderProcess', labelKey: 'footer.orderProcess' },
      { to: '/about', labelKey: 'footer.aboutUs' },
    ],
  },
  {
    titleKey: 'footer.support',
    links: [
      { to: '/contact', labelKey: 'footer.contactUs' },
      { to: '/sizeGuide', labelKey: 'footer.sizeGuide' },
      { to: '/privacy', labelKey: 'footer.privacyPolicy' },
    ],
  },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg overflow-hidden">
              <img src={logo} alt="Foysal Garments Logo" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Foysal Garments</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">{t('footer.tagline')}</p>
        </div>

        {LINK_COLUMNS.map((column) => (
          <div key={column.titleKey}>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm border-l-4 border-[#FF6A1A] pl-3">
              {t(column.titleKey)}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-[#FF6A1A] transition-colors">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm border-l-4 border-[#FF6A1A] pl-3">
            {t('footer.contactInfo')}
          </h3>
          <div className="text-sm space-y-2 text-gray-400">
            <p>{t('footer.address')}</p>
            <p className="font-medium text-[#FF6A1A]">Phone: +880 1676952977, +880 1820809695</p>
            <p>Email: foysolgarments@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        <div className="flex justify-center gap-5">
          <a
            href="#"
            aria-label="Facebook"
            className="bg-gray-800 p-3 rounded-full hover:scale-110 transition-transform shadow-lg group"
          >
            <FaFacebook size={20} className="text-[#1877F2] group-hover:brightness-125" />
          </a>
          <a
            href="https://wa.me/8801820809695"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="bg-gray-800 p-3 rounded-full hover:scale-110 transition-transform shadow-lg group"
          >
            <FaWhatsapp size={20} className="text-[#25D366] group-hover:brightness-125" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-gray-400">
          <span className="text-[10px] uppercase tracking-[2px]">{t('footer.developedBy')}</span>
          <a
            href="https://www.smartpathshalabd.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-full border border-gray-800 hover:border-[#FF6A1A]/50 transition-all group"
          >
            <div className="h-6 w-6 overflow-hidden rounded-sm">
              <img src="/SIEMS.png" alt="SIEMS Logo" className="h-full w-full object-contain group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-bold text-xs text-gray-200 tracking-tight">SIEMS</span>
          </a>
          <span className="hidden sm:inline">&bull;</span>
          <span>&copy; {new Date().getFullYear()} Foysal Garments. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
