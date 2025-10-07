import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Mic, Calendar, Users, Shield, Instagram, Twitter, PlayCircle } from 'lucide-react';

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

  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    clinic: '',
    notes: ''
  });
  const [demoStatus, setDemoStatus] = useState<'idle' | 'success'>('idle');

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

  const howItWorksSteps = [
    {
      title: 'Greet every call or chat',
      description: "The AI receptionist answers in your clinic's name, matches your tone, and sets expectations for the conversation."
    },
    {
      title: 'Collect details and offer times',
      description: 'It gathers only the essentials, checks your availability, and shares open time slots immediately - no waiting or manual follow-up.'
    },
    {
      title: 'Confirm and send the summary',
      description: 'Once the patient chooses a slot, the AI books it, sends a confirmation (email/SMS), and logs everything in your systems.'
    }
  ];

  const keyBenefits = [
    'Never miss another after-hours call - 24/7 coverage, weekends and holidays included.',
    'Increase booked appointments with instant access to open times and frictionless scheduling.',
    'Reduce front-desk busywork thanks to automatic notes and updates pushed to your calendar, CRM, or PMS.',
    'Deliver a branded patient experience; we fine-tune the voice, flows, and rules to match your processes.',
    'Protect patient data with workflows designed for healthcare compliance and GDPR best practices.'
  ];

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
                How It Works
              </a>
              <a
                href="#book-demo"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
              >
                Book a Demo
              </a>
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
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                AI Voice Assistant for
                <br />
                <span className="text-gray-800">Modern Dental</span>
                <br />
                <span className="text-gray-800">Clinics</span>
              </h1>

              <div className="space-y-2 text-lg text-gray-600">
                <p>Streamline Appointments,</p>
                <p>Automate Communication,</p>
                <p>Enhance Patient Experience</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#book-demo"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-white shadow-sm transition-colors hover:bg-blue-600"
              >
                Book a Demo
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-600 transition-colors hover:border-blue-300 hover:text-blue-700"
              >
                See How It Works
              </a>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 text-gray-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-gray-700 font-medium">Appointment Scheduling & Reminders</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 text-gray-600">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-gray-700 font-medium">Patient FAQs & Support</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 text-gray-600">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-gray-700 font-medium">Secure Data Integration</span>
              </div>
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
            <span className="text-sm font-semibold uppercase tracking-widest text-cyan-500">How It Works</span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">A concierge flow that feels human and never sleeps</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our AI receptionist handles calls and messages around the clock. It introduces itself with your clinic's name, guides patients through a simple flow (basic details &gt; available slots &gt; confirmation), and writes everything back into your systems. We configure the voice, language, questions, service durations, opening hours, and integrations so the experience mirrors your front desk even in special cases like new vs. returning patients, cancellations, urgent needs, or waitlists.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
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
            <span className="text-sm font-semibold uppercase tracking-widest text-cyan-500">Key Benefits</span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 lg:text-4xl">Results your team and patients will feel</h2>
            <ul className="mt-6 space-y-4 text-gray-600">
              {keyBenefits.map((benefit) => (
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
              <span className="text-sm font-semibold uppercase tracking-widest text-cyan-500">Book a Demo</span>
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">See your AI receptionist in action</h2>
              <p className="text-lg text-gray-600">
                Pick a time that works for your team and we will tailor a walkthrough for your clinic. We can explore scheduling flows, language options, CRM or PMS integrations, and custom call scripts for new and returning patients.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-blue-500" />
                  <span>Share context on your current tools and we will show ready-to-use integrations.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-blue-500" />
                  <span>Collaborate on sample scripts covering after-hours calls, cancellations, and urgent care.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-blue-500" />
                  <span>Decide whether you prefer a live sandbox, voice clone, or CRM trial connection.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur">
              <form className="space-y-5" onSubmit={handleDemoSubmit}>
                <div>
                  <label htmlFor="demo-name" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    required
                    value={demoForm.name}
                    onChange={handleDemoChange('name')}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="demo-email" className="block text-sm font-medium text-gray-700">
                    Work email
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    required
                    value={demoForm.email}
                    onChange={handleDemoChange('email')}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="demo@yourclinic.com"
                  />
                </div>

                <div>
                  <label htmlFor="demo-clinic" className="block text-sm font-medium text-gray-700">
                    Clinic or organization
                  </label>
                  <input
                    id="demo-clinic"
                    type="text"
                    required
                    value={demoForm.clinic}
                    onChange={handleDemoChange('clinic')}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="BrightSmiles Dental"
                  />
                </div>

                <div>
                  <label htmlFor="demo-notes" className="block text-sm font-medium text-gray-700">
                    What would you like to cover?
                  </label>
                  <textarea
                    id="demo-notes"
                    rows={4}
                    value={demoForm.notes}
                    onChange={handleDemoChange('notes')}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="e.g. Integrate with Dentrix, after-hours voice, custom cancellation flow"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
                >
                  Request demo
                </button>

                {demoStatus === 'success' && (
                  <p className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
                    Thanks! We will reach out within one business day to confirm your session.
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
              Privacy Policy
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#terms" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms of Service
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
