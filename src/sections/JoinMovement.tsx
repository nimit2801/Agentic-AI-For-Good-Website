import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JoinMovement() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            end: 'top 55%',
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
      id="join"
      className="relative w-full bg-[#F5F1EB] py-20 lg:py-32 z-50"
    >
      <div ref={contentRef} className="px-6 lg:px-[6vw]">
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h2 className="display-heading text-[clamp(28px,3.6vw,64px)] text-[#1A1A1A] mb-4 lg:mb-5">
            JOIN THE MOVEMENT
          </h2>

          {/* Subcopy */}
          <p className="text-[#6B6560] text-base lg:text-lg mb-8 lg:mb-10 max-w-lg mx-auto">
            Builders, founders, researchers, operators—share what you're shipping. We'll feature the best.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 h-12 lg:h-14 bg-white border border-[#1A1A1A]/8 rounded-[14px] px-5 text-sm lg:text-base text-[#1A1A1A] placeholder:text-[#6B6560]/60 focus:outline-none focus:ring-2 focus:ring-[#D4754E]/30 transition-all duration-200"
              />
              <Button
                type="submit"
                className="h-12 lg:h-14 bg-[#D4754E] hover:bg-[#C0653E] text-white rounded-[14px] px-6 lg:px-8 text-sm font-medium transition-all duration-200"
              >
                {isSubmitted ? 'Subscribed!' : 'Get Early Access'}
              </Button>
            </div>
          </form>

          {/* Secondary Link */}
          <button className="text-[#1A1A1A]/70 text-sm hover:text-[#D4754E] transition-colors duration-200 flex items-center gap-1 justify-center mx-auto">
            Or submit a use case directly
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
