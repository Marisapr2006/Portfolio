import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Progressive enhancement: the page is complete without this script. Every
// animation uses transform only (never text opacity) so that the contrast of
// the copy is stable at any frame, and nothing is registered when the user
// asks for reduced motion.
gsap.registerPlugin(ScrollTrigger);

const media = gsap.matchMedia();

// One observer instead of a ScrollTrigger per element: each trigger measured the
// layout right after the previous one wrote styles, forcing a reflow per element.
// The margin reproduces the old 'top 90%' start line.
const onceVisible = (elements: HTMLElement[], reveal: (element: HTMLElement) => void) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        reveal(entry.target as HTMLElement);
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  elements.forEach((element) => observer.observe(element));
  return observer;
};

media.add('(prefers-reduced-motion: no-preference)', () => {
  const ease = 'power3.out';

  // Hero entrance
  const heroMain = gsap.utils.toArray<HTMLElement>('.hero__main > *');
  const heroAside = document.querySelector<HTMLElement>('.hero__aside');

  if (heroMain.length > 0) {
    gsap.from(heroMain, {
      y: 44,
      duration: 1,
      ease,
      stagger: 0.12,
      clearProps: 'transform',
    });
  }

  if (heroAside) {
    gsap.from(heroAside, {
      x: 56,
      duration: 1.1,
      ease,
      stagger: 0.18,
      delay: 0.25,
      clearProps: 'transform',
    });
  }

  // Scroll reveals. Pages without any [data-reveal] skip this block entirely:
  // gsap.set() on an empty target list logs a "GSAP target not found" warning.
  const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  let revealObserver: IntersectionObserver | null = null;

  if (reveals.length > 0) {
    gsap.set(reveals, { y: 56, scale: 0.97 });
    revealObserver = onceVisible(reveals, (element) => {
      gsap.to(element, { y: 0, scale: 1, duration: 0.9, ease, clearProps: 'transform' });
    });
  }

  const nodeObservers: IntersectionObserver[] = [];

  // Experience timeline: the line draws as you scroll and each node pops in.
  gsap.utils.toArray<HTMLElement>('[data-timeline]').forEach((timeline) => {
    const line = timeline.querySelector<HTMLElement>('[data-timeline-line]');

    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: 0.4,
          },
        },
      );
    }

    const nodes = Array.from(timeline.querySelectorAll<HTMLElement>('.timeline__node'));

    if (nodes.length > 0) {
      // Like gsap.from(): the end state is whatever the CSS says (a 45deg diamond).
      const restingRotation = new Map(
        nodes.map((node) => [node, gsap.getProperty(node, 'rotation')]),
      );
      gsap.set(nodes, { scale: 0, rotation: 225 });
      nodeObservers.push(
        onceVisible(nodes, (node) => {
          gsap.to(node, {
            scale: 1,
            rotation: restingRotation.get(node),
            duration: 0.7,
            ease: 'back.out(2)',
          });
        }),
      );
    }
  });

  // Marquees: same loop as the CSS fallback, but they speed up with the scroll.
  const tweens = gsap.utils.toArray<HTMLElement>('[data-marquee-track]').map((track) => {
    const reverse = track.closest('.marquee--reverse') !== null;
    track.style.animation = 'none';

    return gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: 34, ease: 'none', repeat: -1 },
    );
  });

  if (tweens.length > 0) {
    ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = gsap.utils.clamp(0, 5, Math.abs(self.getVelocity()) / 350);
        tweens.forEach((tween) => {
          gsap.to(tween, { timeScale: 1 + boost, duration: 0.25, overwrite: true });
        });
      },
    });
  }

  return () => {
    revealObserver?.disconnect();
    nodeObservers.forEach((observer) => observer.disconnect());
    tweens.forEach((tween) => tween.kill());
  };
});

// Fonts shift the layout, so measure the triggers again once they are ready.
void document.fonts?.ready.then(() => ScrollTrigger.refresh());
