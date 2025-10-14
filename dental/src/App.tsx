import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Mic, Calendar, Users, Shield, Instagram, Twitter, PlayCircle } from 'lucide-react';

type Language = 'en' | 'cs';

type LanguageContent = {
  nav: {
    howItWorks: string;
    bookDemo: string;
  };
  hero: {
    titleLines: [string, string, string];
    lead: string[];
    primaryCta: string;
    secondaryCta: string;
    features: string[];
  };
  howItWorks: {
    label: string;
    heading: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  benefits: {
    label: string;
    heading: string;
    items: string[];
  };
  bookDemo: {
    label: string;
    heading: string;
    description: string;
    bullets: string[];
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      clinicLabel: string;
      clinicPlaceholder: string;
      notesLabel: string;
      notesPlaceholder: string;
      submitCta: string;
      success: string;
    };
  };
  footer: {
    privacy: string;
    terms: string;
  };
};

const languageOptions: { id: Language; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'cs', label: 'CZ' }
];

const translations: Record<Language, LanguageContent> = {
  en: {
    nav: {
      howItWorks: 'How It Works',
      bookDemo: 'Book a Demo'
    },
    hero: {
      titleLines: ['AI Voice Assistant for', 'Modern Dental', 'Clinics'],
      lead: ['Streamline Appointments,', 'Automate Communication,', 'Enhance Patient Experience'],
      primaryCta: 'Book a Demo',
      secondaryCta: 'See How It Works',
      features: [
        'Appointment Scheduling & Reminders',
        'Patient FAQs & Support',
        'Secure Data Integration'
      ]
    },
    howItWorks: {
      label: 'How It Works',
      heading: 'A concierge flow that feels human and never sleeps',
      description:
        "Our AI receptionist handles calls and messages around the clock. It introduces itself with your clinic's name, guides patients through a simple flow (basic details \u203a available slots \u203a confirmation), and writes everything back into your systems. We configure the voice, language, questions, service durations, opening hours, and integrations so the experience mirrors your front desk even in special cases like new vs. returning patients, cancellations, urgent needs, or waitlists.",
      steps: [
        {
          title: 'Greet every call or chat',
          description:
            "The AI receptionist answers in your clinic's name, matches your tone, and sets expectations for the conversation."
        },
        {
          title: 'Collect details and offer times',
          description:
            'It gathers only the essentials, checks your availability, and shares open time slots immediately - no waiting or manual follow-up.'
        },
        {
          title: 'Confirm and send the summary',
          description:
            'Once the patient chooses a slot, the AI books it, sends a confirmation (email/SMS), and logs everything in your systems.'
        }
      ]
    },
    benefits: {
      label: 'Key Benefits',
      heading: 'Results your team and patients will feel',
      items: [
        'Never miss another after-hours call - 24/7 coverage, weekends and holidays included.',
        'Increase booked appointments with instant access to open times and frictionless scheduling.',
        'Reduce front-desk busywork thanks to automatic notes and updates pushed to your calendar, CRM, or PMS.',
        'Deliver a branded patient experience; we fine-tune the voice, flows, and rules to match your processes.',
        'Protect patient data with workflows designed for healthcare compliance and GDPR best practices.'
      ]
    },
    bookDemo: {
      label: 'Book a Demo',
      heading: 'See your AI receptionist in action',
      description:
        'Pick a time that works for your team and we will tailor a walkthrough for your clinic. We can explore scheduling flows, language options, CRM or PMS integrations, and custom call scripts for new and returning patients.',
      bullets: [
        'Share context on your current tools and we will show ready-to-use integrations.',
        'Collaborate on sample scripts covering after-hours calls, cancellations, and urgent care.',
        'Decide whether you prefer a live sandbox, voice clone, or CRM trial connection.'
      ],
      form: {
        nameLabel: 'Full name',
        namePlaceholder: 'Jane Doe',
        emailLabel: 'Work email',
        emailPlaceholder: 'demo@yourclinic.com',
        clinicLabel: 'Clinic or organization',
        clinicPlaceholder: 'BrightSmiles Dental',
        notesLabel: 'What would you like to cover?',
        notesPlaceholder: 'e.g. Integrate with Dentrix, after-hours voice, custom cancellation flow',
        submitCta: 'Request demo',
        success: 'Thanks! We will reach out within one business day to confirm your session.'
      }
    },
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  },
  cs: {
    nav: {
      howItWorks: 'Jak to funguje',
      bookDemo: 'Objednat demo'
    },
    hero: {
      titleLines: ['AI hlasov\u00fd asistent pro', 'modern\u00ed zubn\u00ed', 'kliniky'],
      lead: ['Zrychlete objedn\u00e1v\u00e1n\u00ed,', 'Automatizujte komunikaci,', 'Vylep\u0161ete z\u00e1\u017eitek pacient\u016f'],
      primaryCta: 'Objednat demo',
      secondaryCta: 'Zjist\u011bte, jak to funguje',
      features: [
        'Pl\u00e1nov\u00e1n\u00ed term\u00edn\u016f a p\u0159ipom\u00ednky',
        'Podpora pacient\u016f a odpov\u011bdi na \u010dast\u00e9 dotazy',
        'Bezpe\u010dn\u00e9 napojen\u00ed na syst\u00e9my'
      ]
    },
    howItWorks: {
      label: 'Jak to funguje',
      heading: 'Recepce na m\u00edru, kter\u00e1 nikdy nesp\u00ed',
      description:
        'N\u00e1\u0161 AI recep\u010dn\u00ed p\u0159ij\u00edm\u00e1 hovory i zpr\u00e1vy 24/7, p\u0159edstav\u00ed se jm\u00e9nem va\u0161\u00ed kliniky, provede pacienta jednoduch\u00fdm procesem (z\u00e1kladn\u00ed \u00fadaje \u203a nab\u00eddka voln\u00fdch term\u00edn\u016f \u203a potvrzen\u00ed) a v\u0161e zap\u00ed\u0161e do va\u0161eho syst\u00e9mu. Cel\u00fd pr\u016fb\u011bh nastav\u00edme na m\u00edru: jazyk a t\u00f3n, ot\u00e1zky, d\u00e9lky slu\u017eeb, pracovn\u00ed hodiny, integrace (kalend\u00e1\u0159, CRM, e-mail/SMS) i speci\u00e1ln\u00ed sc\u00e9n\u00e1\u0159e pro nov\u00e9/st\u00e1vaj\u00edc\u00ed pacienty, ru\u0161en\u00ed, urgence nebo waitlist. V\u00fdsledek: m\u00e9n\u011b ping-pongu, v\u00edce rezervac\u00ed.',
      steps: [
        {
          title: 'Zvedne hovor nebo chat a p\u0159edstav\u00ed se va\u0161\u00edm jm\u00e9nem',
          description:
            'Hovor \u010di zpr\u00e1vu p\u0159evezme okam\u017eit\u011b, nastav\u00ed t\u00f3n konverzace a vysv\u011bt\u00ed dal\u0161\u00ed kroky.'
        },
        {
          title: 'Zjist\u00ed nezbytn\u00e9 informace a nab\u00eddne voln\u00e9 term\u00edny',
          description:
            'Zjist\u00ed pouze nezbytn\u00e9 informace, zkontroluje va\u0161e kalend\u00e1\u0159e a nab\u00eddne voln\u00e9 term\u00edny bez \u010dek\u00e1n\u00ed.'
        },
        {
          title: 'Potvrd\u00ed rezervaci a ode\u0161le shrnut\u00ed nebo pozv\u00e1nku',
          description:
            'Po v\u00fdb\u011bru term\u00ednu vytvo\u0159\u00ed rezervaci, ode\u0161le potvrzen\u00ed (e-mail/SMS) a zap\u00ed\u0161e detaily do va\u0161eho syst\u00e9mu.'
        }
      ]
    },
    benefits: {
      label: 'Hlavn\u00ed p\u0159\u00ednosy',
      heading: 'P\u0159\u00ednosy, kter\u00e9 pozn\u00e1 t\u00fdm i pacienti',
      items: [
        'U\u017e \u017e\u00e1dn\u00fd zme\u0161kan\u00fd hovor mimo pracovn\u00ed dobu: 24/7 pokryt\u00ed v\u010detn\u011b v\u00edkend\u016f a sv\u00e1tk\u016f.',
        'V\u00edce objednan\u00fdch n\u00e1v\u0161t\u011bv: okam\u017eit\u00e1 nab\u00eddka voln\u00fdch term\u00edn\u016f bez zbyte\u010dn\u00e9ho \u010dek\u00e1n\u00ed.',
        'M\u00e9n\u011b administrativy pro recepci: automatick\u00fd z\u00e1pis do va\u0161eho syst\u00e9mu a jasn\u00e9 shrnut\u00ed pro pacienta.',
        'Z\u00e1\u017eitek ve va\u0161em stylu: hlas, sc\u00e9n\u00e1\u0159e i pravidla pln\u011b p\u0159izp\u016fsob\u00edme va\u0161im proces\u016fm.',
        'Bezpe\u010dnost a soukrom\u00ed: pracujeme v souladu s GDPR a osv\u011bd\u010den\u00fdmi postupy.'
      ]
    },
    bookDemo: {
      label: 'Objednejte si demo',
      heading: 'Pod\u00edvejte se na AI recep\u010dn\u00ed v akci',
      description:
        'Vyberte si term\u00edn, kter\u00fd v\u00e1m vyhovuje, a p\u0159iprav\u00edme uk\u00e1zku na m\u00edru. Spole\u010dn\u011b projdeme rezerva\u010dn\u00ed toky, jazykov\u00e9 varianty, integrace a specifick\u00e9 sc\u00e9n\u00e1\u0159e pro va\u0161i kliniku.',
      bullets: [
        'Dejte n\u00e1m kontext k va\u0161im n\u00e1stroj\u016fm a uk\u00e1\u017eeme hotov\u00e9 integrace.',
        'Spole\u010dn\u011b nastav\u00edme uk\u00e1zkov\u00e9 skripty pro no\u010dn\u00ed hovory, ru\u0161en\u00ed nebo urgentn\u00ed p\u0159\u00edpady.',
        'Vyberete si, zda chcete sandbox, hlasovou uk\u00e1zku nebo testovac\u00ed napojen\u00ed na CRM.'
      ],
      form: {
        nameLabel: 'Jm\u00e9no a p\u0159\u00edjmen\u00ed',
        namePlaceholder: 'Jana Nov\u00e1kov\u00e1',
        emailLabel: 'Pracovn\u00ed e-mail',
        emailPlaceholder: 'demo@vasaklinika.cz',
        clinicLabel: 'Klinika nebo organizace',
        clinicPlaceholder: 'DentCare Praha',
        notesLabel: 'Co chcete probrat?',
        notesPlaceholder: 'nap\u0159. napojen\u00ed na Dentrix, hlas po pracovn\u00ed dob\u011b, ru\u0161en\u00ed term\u00edn\u016f',
        submitCta: 'Po\u017eadat o demo',
        success: 'D\u011bkujeme! Ozveme se do jednoho pracovn\u00edho dne a potvrd\u00edme term\u00edn uk\u00e1zky.'
      }
    },
    footer: {
      privacy: 'Z\u00e1sady ochrany soukrom\u00ed',
      terms: 'Obchodn\u00ed podm\u00ednky'
    }
  }
};

function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const unicornWindow = window as typeof window & {
      UnicornStudio?: { init: () => void; isInitialized?: boolean };
    };

    const badgeSelectors = [
      '[data-us-badge]',
      'a[href*="unicornstudio"]',
      'a[href*="unicorn.studio"]',
      '[class*="unicornstudio"]',
      '[class*="unicorn-studio"]'
    ];

    const shouldRemoveNode = (node: Element) => {
      const textContent = node.textContent?.toLowerCase() ?? '';
      return textContent.includes('unicorn.studio') || badgeSelectors.some((selector) => node.matches(selector));
    };

    const removeBadgesFromRoot = (root: ParentNode | ShadowRoot) => {
      badgeSelectors.forEach((selector) => {
        root.querySelectorAll(selector).forEach((node) => node.remove());
      });

      root.querySelectorAll('*').forEach((rawNode) => {
        if (!(rawNode instanceof Element)) return;

        if (shouldRemoveNode(rawNode)) {
          rawNode.remove();
          return;
        }

        const shadowRoot = (rawNode as HTMLElement).shadowRoot;
        if (shadowRoot) {
          removeBadgesFromRoot(shadowRoot);
        }
      });
    };

    const removeBadges = () => removeBadgesFromRoot(document.body);

    removeBadges();

    const badgeObserver = new MutationObserver(removeBadges);
    badgeObserver.observe(document.body, { childList: true, subtree: true });

    let intervalRuns = 0;
    const intervalId = window.setInterval(() => {
      removeBadges();
      intervalRuns += 1;
      if (intervalRuns > 20) {
        window.clearInterval(intervalId);
      }
    }, 500);

    const ensureInitialized = () => {
      if (!unicornWindow.UnicornStudio) return;
      removeBadges();
      if (unicornWindow.UnicornStudio.isInitialized) return;
      unicornWindow.UnicornStudio.init();
      unicornWindow.UnicornStudio.isInitialized = true;
      removeBadges();
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-unicornstudio]');

    if (existingScript) {
      existingScript.addEventListener('load', ensureInitialized);
      ensureInitialized();
      return () => {
        existingScript.removeEventListener('load', ensureInitialized);
        badgeObserver.disconnect();
        window.clearInterval(intervalId);
      };
    }

    const script = document.createElement('script');
    script.setAttribute('data-unicornstudio', 'true');
    script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.31/dist/unicornStudio.umd.js';
    script.async = true;
    script.addEventListener('load', ensureInitialized);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', ensureInitialized);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      badgeObserver.disconnect();
      window.clearInterval(intervalId);
    };
  }, []);

  const [language, setLanguage] = useState<Language>('en');
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    clinic: '',
    notes: ''
  });
  const [demoStatus, setDemoStatus] = useState<'idle' | 'success'>('idle');

  const content = translations[language];
  const featureIcons = [Calendar, Users, Shield];

  const renderLanguageSwitcher = (className = '') => (
    <div className={`flex items-center rounded-full bg-slate-100 p-1 ${className}`.trim()}>
      {languageOptions.map((option) => {
        const isActive = language === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLanguage(option.id)}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
              isActive ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'
            }`}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );

  const handleDemoChange = (
    field: keyof typeof demoForm,
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDemoForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (demoStatus === 'success') {
      setDemoStatus('idle');
    }
  };

  const handleDemoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDemoStatus('success');
    setDemoForm({ name: '', email: '', clinic: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100 via-slate-100/80 to-transparent z-[2147483647]" />
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Denta<span className="text-cyan-400">Speak AI</span>
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                {content.nav.howItWorks}
              </a>
              <div className="flex items-center space-x-4">
                {renderLanguageSwitcher()}
                <a
                  href="#book-demo"
                  className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
                >
                  {content.nav.bookDemo}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-10 lg:pt-14 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {renderLanguageSwitcher('md:hidden mb-4')}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                {content.hero.titleLines[0]}
                <br />
                <span className="text-gray-800">{content.hero.titleLines[1]}</span>
                <br />
                <span className="text-gray-800">{content.hero.titleLines[2]}</span>
              </h1>

              <div className="space-y-2 text-lg text-gray-600">
                {content.hero.lead.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#book-demo"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-white shadow-sm transition-colors hover:bg-blue-600"
              >
                {content.hero.primaryCta}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-600 transition-colors hover:border-blue-300 hover:text-blue-700"
              >
                {content.hero.secondaryCta}
              </a>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {content.hero.features.map((feature, index) => {
                const Icon = featureIcons[index] ?? Calendar;
                return (
                  <div key={feature} className="flex items-center space-x-3">
                    <div className="w-6 h-6 text-gray-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Gradient Orb */}
          <div className="flex justify-center lg:justify-end lg:items-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[520px] aspect-square overflow-hidden">
              <div
                data-us-project="UGGhY00TcKLLwXfBl4qJ"
                className="absolute inset-0"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-100/98 via-slate-100/70 to-transparent backdrop-blur-md z-[2147483647]" />
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section id="how-it-works" className="mt-20 lg:mt-28">
          <div className="max-w-4xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-cyan-500">{content.howItWorks.label}</span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">{content.howItWorks.heading}</h2>
            <p className="mt-4 text-lg text-gray-600">{content.howItWorks.description}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.howItWorks.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 font-semibold">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="mt-20 lg:mt-24">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-cyan-500">{content.benefits.label}</span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 lg:text-4xl">{content.benefits.heading}</h2>
            <ul className="mt-6 space-y-4 text-gray-600">
              {content.benefits.items.map((benefit) => (
                <li key={benefit} className="flex items-start space-x-3 text-base">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-cyan-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Book a Demo */}
        <section id="book-demo" className="mt-20 lg:mt-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <span className="text-sm font-semibold uppercase tracking-widest text-cyan-500">{content.bookDemo.label}</span>
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">{content.bookDemo.heading}</h2>
              <p className="text-lg text-gray-600">{content.bookDemo.description}</p>
              <ul className="space-y-3 text-gray-600">
                {content.bookDemo.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start space-x-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-blue-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur">
              <form className="space-y-5" onSubmit={handleDemoSubmit}>
                <div>
                  <label htmlFor="demo-name" className="block text-sm font-medium text-gray-700">
                    {content.bookDemo.form.nameLabel}
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    required
                    value={demoForm.name}
                    onChange={handleDemoChange('name')}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={content.bookDemo.form.namePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="demo-email" className="block text-sm font-medium text-gray-700">
                    {content.bookDemo.form.emailLabel}
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    required
                    value={demoForm.email}
                    onChange={handleDemoChange('email')}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={content.bookDemo.form.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="demo-clinic" className="block text-sm font-medium text-gray-700">
                    {content.bookDemo.form.clinicLabel}
                  </label>
                  <input
                    id="demo-clinic"
                    type="text"
                    required
                    value={demoForm.clinic}
                    onChange={handleDemoChange('clinic')}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={content.bookDemo.form.clinicPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="demo-notes" className="block text-sm font-medium text-gray-700">
                    {content.bookDemo.form.notesLabel}
                  </label>
                  <textarea
                    id="demo-notes"
                    rows={4}
                    value={demoForm.notes}
                    onChange={handleDemoChange('notes')}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={content.bookDemo.form.notesPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
                >
                  {content.bookDemo.form.submitCta}
                </button>

                {demoStatus === 'success' && (
                  <p className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {content.bookDemo.form.success}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <div>
            <a href="#privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
              {content.footer.privacy}
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#terms" className="text-gray-600 hover:text-gray-900 transition-colors">
              {content.footer.terms}
            </a>

            <div className="flex space-x-4">
              <a href="#instagram" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#video" className="text-gray-400 hover:text-gray-600 transition-colors">
                <PlayCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
