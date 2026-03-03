import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        right,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative w-full bg-[#F5F1EB] py-16 lg:py-24 z-50"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
          {/* Left - Text */}
          <div ref={leftRef} className="lg:w-[44vw] max-w-lg">
            <h2 className="display-heading text-[clamp(24px,2.8vw,48px)] text-[#1A1A1A] mb-4">
              STAY IN THE LOOP
            </h2>
            <p className="text-[#6B6560] text-base lg:text-lg leading-relaxed">
              One email per week. No hype. Real deployments, real metrics, real patterns.
            </p>
          </div>

          {/* Right - Card */}
          <div ref={rightRef} className="lg:w-auto w-full max-w-md">
            <div className="bg-white rounded-[18px] card-shadow p-6 lg:p-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 h-12 bg-[#F5F1EB] border border-[#1A1A1A]/8 rounded-xl px-4 text-sm text-[#1A1A1A] placeholder:text-[#6B6560]/60 focus:outline-none focus:ring-2 focus:ring-[#D4754E]/30 transition-all duration-200"
                  />
                  <Button
                    type="submit"
                    className="h-12 bg-[#D4754E] hover:bg-[#C0653E] text-white rounded-xl px-6 text-sm font-medium transition-all duration-200"
                  >
                    {isSubmitted ? 'Subscribed!' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-[#6B6560]/70 text-xs">
                  Unsubscribe anytime. No spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
