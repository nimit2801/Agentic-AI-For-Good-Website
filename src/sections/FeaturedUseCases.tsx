import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    id: 1,
    tag: 'Healthcare',
    title: 'Medical Triage Routing',
    description: 'Autonomous intake → priority scoring → department dispatch.',
    image: '/images/usecase_triage.jpg',
  },
  {
    id: 2,
    tag: 'Logistics',
    title: 'Supply Chain Recovery',
    description: 'Agent detects delays and rebooks freight in minutes.',
    image: '/images/usecase_supplychain.jpg',
  },
  {
    id: 3,
    tag: 'Engineering',
    title: 'Code Review Agent',
    description: 'Reviews PRs, suggests patches, learns team conventions.',
    image: '/images/usecase_code_review.jpg',
  },
  {
    id: 4,
    tag: 'Compliance',
    title: 'Policy Compliance Check',
    description: 'Scans documents, flags risk, cites sources.',
    image: '/images/usecase_policy.jpg',
  },
];

export default function FeaturedUseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation with stagger
      cards.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );

        // Parallax on images
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="relative w-full bg-[#F5F1EB] py-20 lg:py-32 z-30"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <h2 className="display-heading text-[clamp(28px,3.2vw,52px)] text-[#1A1A1A] mb-4">
            Featured Use Cases
          </h2>
          <p className="text-[#6B6560] text-base lg:text-lg max-w-xl">
            Real workflows. Real architectures. Real impact.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group bg-white rounded-[18px] card-shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Image */}
              <div className="relative h-48 lg:h-64 overflow-hidden">
                <span className="absolute top-4 left-4 z-10 micro-label bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-3 py-1.5 rounded-full">
                  {useCase.tag}
                </span>
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 lg:p-6">
                <h3 className="text-[#1A1A1A] font-semibold text-lg lg:text-xl mb-2">
                  {useCase.title}
                </h3>
                <p className="text-[#6B6560] text-sm lg:text-base leading-relaxed mb-4">
                  {useCase.description}
                </p>
                <button className="text-[#D4754E] text-sm font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                  Read the breakdown
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
