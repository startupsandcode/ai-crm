import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section with Modern Design */}
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-20 relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-purple-800/10 z-0"></div>
        <div className="absolute top-20 -translate-x-1/4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 translate-x-1/3 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 -translate-x-1/4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-sm font-medium text-white/80">AI-Powered CRM Solution</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-glow">
            The AI-Native CRM for <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">Modern Business</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-white/80 leading-relaxed">
            Stop wasting time on manual data entry. Let AI handle your outreach, score your leads, and grow your audience while you focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link href="/auth/signup" className="btn-primary px-8 py-3 rounded-xl text-lg cursor-pointer text-center font-bold">
              Get Started for Free
            </Link>
            <Link href="/#features" className="btn-secondary px-8 py-3 rounded-xl text-lg cursor-pointer text-center font-medium">
              Learn More
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16">
            <p className="text-sm uppercase tracking-wider text-white/50 mb-4">Trusted by forward-thinking companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div>COMPANY</div>
              <div>BRAND</div>
              <div>ENTERPRISE</div>
              <div>STARTUP</div>
              <div>TECH</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 z-0"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-sm font-medium text-white/80">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Intelligent Tools for Modern Teams</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-16">Our AI-powered platform streamlines your workflow and amplifies your productivity.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-item p-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Automated Outreach</h3>
              <p className="text-white/70 leading-relaxed">Engage leads with personalized, AI-driven email campaigns that sound authentically human.</p>
            </div>
            
            <div className="feature-item p-8">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Intelligent Lead Scoring</h3>
              <p className="text-white/70 leading-relaxed">Prioritize your efforts on the most promising prospects with AI-powered lead qualification.</p>
            </div>
            
            <div className="feature-item p-8">
              <div className="bg-gradient-to-br from-blue-400 to-violet-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Audience Growth</h3>
              <p className="text-white/70 leading-relaxed">Scale your reach without sacrificing the human touch. Build meaningful relationships at scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-sm font-medium text-white/80">What Our Customers Say</span>
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium mb-10 leading-relaxed">
              "AI-CRM has transformed our sales process. We're closing deals faster and maintaining genuine relationships with our customers. The ROI has been incredible."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 mr-4 shadow-lg shadow-blue-500/20"></div>
              <div className="text-left">
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-white/70">VP of Sales, Tech Innovators Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 z-0"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-sm font-medium text-white/80">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-16">Everything you need to grow your business, at a price that works for you.</p>
          
          <div className="max-w-lg mx-auto feature-item p-10 border border-white/10">
            <div className="bg-gradient-to-br from-blue-500 to-violet-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-2">Pro Plan</h3>
            <p className="text-white/70 mb-6">Everything you need for a growing business</p>
            <div className="mb-8">
              <span className="text-6xl font-extrabold">$49</span>
              <span className="text-xl text-white/70">/month</span>
            </div>
            <ul className="text-left space-y-4 mb-8 border-t border-b border-white/10 py-6 px-4">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Unlimited Contacts</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>AI-Powered Campaigns</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Advanced Analytics</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Priority Support</span>
              </li>
            </ul>
            <Link href="/auth/signup" className="btn-primary w-full py-4 rounded-xl font-bold text-lg block">
              Start Your 14-Day Free Trial
            </Link>
            <p className="mt-4 text-sm text-white/50">No credit card required</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 z-0"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-xl text-white/70 mb-10">Join thousands of forward-thinking businesses using AI-CRM to grow their customer relationships.</p>
            <Link href="/auth/signup" className="btn-primary px-8 py-4 rounded-xl text-lg font-bold inline-block">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
