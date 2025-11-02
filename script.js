// /counter 
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter-number');

  const options = {
    threshold: 0.5 // Trigger animation when 50% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const plusSign = counter.nextElementSibling.textContent.includes('+') ? '+' : '';
        const step = target / 200; // Adjust for faster or slower counting

        let count = 0;
        const updateCount = () => {
          if (count < target) {
            count += step;
            counter.innerText = Math.ceil(count) + plusSign;
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target + plusSign;
          }
        };
        updateCount();
        observer.unobserve(counter); // Stop observing after animation
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
  });
});


// gsap
function page1Animation() {
  let tl = gsap.timeline();

  tl.from(".contracted, .manage", {
    y: -30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
  });

  tl.from(
    ".title",
    {
      y: 50,
      opacity: 0,
      duration: 0.7,
    },
    "-=0.3"
  );

  tl.from(".graph, .button", {
    opacity: 0,
    duration: 0.5,
  }, "-=0.2");

  tl.from(".section-collection > div, .right", {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
  }, "-=0.3");
}

function page2Animation(){
    let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".section2",
          scroller: "body",
          start: "top 70%",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      tl2.from(".services", {
        y: 30,
        opacity:0,
        duration:0.5
      });

      tl2.from(".elem.line1.elem-left", { x:-300, opacity: 0, duration: 1 }, "line-start");
      tl2.from(".elem.line1.elem-right", { x:300, opacity: 0, duration: 1 }, "line-start");
      tl2.from(".elem.line2.elem-left", { x:-300, opacity: 0, duration: 1 }, "line-start+=0.5");
      tl2.from(".elem.line2.elem-right", { x:300, opacity: 0, duration: 1 }, "line-start+=0.5");
      tl2.from(".elem.line3.elem-left", { x:-300, opacity: 0, duration: 1 }, "line-start+=1");
      tl2.from(".elem.line3.elem-right", { x:300, opacity: 0, duration: 1 }, "line-start+=1");
}

// cards animation
const cards = document.querySelectorAll(".card-element");
const textSections = document.querySelectorAll(".text-area");
const total = cards.length;

textSections.forEach((section, index) => {
  if (index === 0) {
    section.classList.remove('inactive');
  } else {
    section.classList.add('inactive');
  }
});

window.addEventListener("scroll", () => {
  const main = document.querySelector(".sticky-card-stack-container");
  if (!main) return;

  const rect = main.getBoundingClientRect();
  const containerTop = rect.top;
  const containerHeight = rect.height;
  const windowHeight = window.innerHeight;
  
  if (containerTop > windowHeight || containerTop + containerHeight < 0) {
    return;
  }

  let progress = 0;
  if (containerTop <= 0) {
    progress = Math.min(Math.abs(containerTop) / (containerHeight - windowHeight), 1);
  }

  const isMobile = window.innerWidth <= 768;

  cards.forEach((card, i) => {
    let scale;
    const translateY = i * 30 - progress * i * 20;

    // MOBILE CHANGE: Cards after the 3rd will now mimic the 3rd card's scale
    if (isMobile && i > 2) {
      const thirdCardIndex = 2; // Index of the 3rd card
      scale = Math.max(0.8, 1 - (total - thirdCardIndex - 1) * 0.05 + progress * 0.3);
    } else {
      // Original logic for desktop/tablet and first 3 cards on mobile
      scale = Math.max(0.8, 1 - (total - i - 1) * 0.05 + progress * 0.3);
    }
    
    card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    card.style.zIndex = total - i;
  });

  const sectionProgress = progress * total;
  let activeSection;
  
  if (progress >= 0.95) {
    activeSection = total - 1;
  } else {
    activeSection = Math.min(Math.floor(sectionProgress), total - 1);
  }
  
  textSections.forEach((textSection, i) => {
    if (i === activeSection) {
      textSection.classList.remove('inactive');
    } else {
      textSection.classList.add('inactive');
    }
  });
});

// Run animations
page1Animation();

// Use GSAP's matchMedia to conditionally run animations
gsap.matchMedia().add("(min-width: 769px)", () => {
  // This code only runs on screens wider than 768px
  page2Animation();
});


// portfolio filter
function filterProjects(category) {
  const cards = document.querySelectorAll('.portfolio-card');
  const tabs = document.querySelectorAll('.filter-tab');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.8s ease';
      } else {
          card.style.display = 'none';
      }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.portfolio-card');
  
  cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px) rotateX(5deg)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) rotateX(0deg)';
      });
  });
});

// Loading animation logic
document.addEventListener('DOMContentLoaded', function() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const mainContent = document.getElementById('mainContent');
  const progressBars = document.querySelectorAll('.progress-fill');

  if (loadingOverlay) {
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        
        setTimeout(() => {
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                  bar.style.width = width;
                }
            });
        }, 500);
    }, 3000);
  }

  // Tab switching functionality
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
      tab.addEventListener('click', function() {
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          progressBars.forEach(bar => {
              bar.style.width = '0%';
              bar.style.transition = 'none';
          });
          
          setTimeout(() => {
              progressBars.forEach(bar => {
                  bar.style.transition = 'width 2s ease';
                  const width = bar.getAttribute('data-width');
                  if (width) {
                    bar.style.width = width;
                  }
              });
          }, 100);
          
          updateTabContent(this.getAttribute('data-tab'));
      });
  });

  function updateTabContent(tabName) {
      const caseHeader = document.querySelector('.case-header');
      const sections = document.querySelectorAll('.section p');
      
      if (!caseHeader) return;
      
      const tabData = {
          'aiims': {
              logo: 'https://brandingpioneers.com/assets/aiims.webp',
              title: 'AIIMS Geriatrics',
              subtitle: 'Healthcare • Video Marketing • Social Media Strategy',
              challenge: 'AIIMS Geriatrics faced challenges in expanding its digital presence and educating the public about geriatric health issues. They needed to enhance patient engagement, particularly with elderly patients and their caregivers.',
              solution: 'We developed a comprehensive video marketing strategy, producing tailored content to engage the older demographic. By utilizing targeted social media, we boosted patient education and outreach.',
              impact: 'Our strategic efforts resulted in a 400% increase in video engagement and a 2x growth in social media following. These outcomes helped drive patient consultations and raise awareness.'
          },
          'apollo': {
              logo: 'logo.webp',
              title: 'Apollo Indraprastha',
              subtitle: 'Healthcare • Digital Transformation • Patient Experience',
              challenge: 'Apollo Indraprastha needed to modernize their patient experience and streamline digital appointments. Legacy systems were causing delays and patient dissatisfaction.',
              solution: 'We implemented a comprehensive digital transformation strategy with AI-powered chatbots, online appointment system, and personalized patient portals for better healthcare delivery.',
              impact: 'Achieved 250% increase in online appointments, reduced waiting times by 60%, and improved patient satisfaction scores by 85% through our digital solutions.'
          },
          'astro': {
              logo: 'astrovazar.webp',
              title: 'Astro Bazar',
              subtitle: 'E-commerce • Mobile App • User Experience',
              challenge: 'Astro Bazar struggled with low mobile conversion rates and poor user experience. Their existing platform was not optimized for mobile commerce.',
              solution: 'We redesigned their mobile app with intuitive navigation, implemented AI-driven product recommendations, and optimized the checkout process for better conversions.',
              impact: 'Mobile conversions increased by 180%, app ratings improved to 4.8 stars, and monthly active users grew by 320% within six months of launch.'
          },
          'dst': {
              logo: 'dst.webp',
              title: 'DST Solutions',
              subtitle: 'Technology • Data Analytics • Business Intelligence',
              challenge: 'DST needed to modernize their data analytics capabilities and provide real-time business intelligence to their clients across multiple industries.',
              solution: 'We built a comprehensive data analytics platform with real-time dashboards, predictive analytics, and automated reporting systems for better business insights.',
              impact: 'Data processing speed improved by 500%, client satisfaction increased by 75%, and helped clients make 3x faster business decisions with our analytics platform.'
          }
      };
      
      const data = tabData[tabName];
      if (data) {
          caseHeader.innerHTML = `
              <div class="logo">
                  <img src="${data.logo}" alt="${data.title} Logo">
              </div>
              <div class="case-info">
                  <h3>${data.title}</h3>
                  <p>${data.subtitle}</p>
              </div>
          `;
          
          const challengeSolution = document.querySelector('.challenge-solution');
          if (challengeSolution) {
            challengeSolution.innerHTML = `
                <div class="section challenge challenge-box-animate">
                    <h4>The Challenge</h4>
                    <p>${data.challenge}</p>
                </div>
                <div class="section solution solution-box-animate">
                    <h4>The Solution</h4>
                    <p>${data.solution}</p>
                </div>
                <div class="section impact impact-box-animate">
                    <h4>The Impact</h4>
                    <p>${data.impact}</p>
                </div>
            `;
          }
      }
  }

  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px)';
        }, 150);
        
        console.log('View Full Case Study clicked');
    });
  }

  const metrics = document.querySelectorAll('.metric');
  metrics.forEach(metric => {
      metric.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px)';
          this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      });
      
      metric.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = 'none';
      });
  });
});


// START: DROPDOWN MENU SCRIPT
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('is-open');

            const icon = hamburger.querySelector('i');
            if (mobileNav.classList.contains('is-open')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    }
});
// END: DROPDOWN MENU SCRIPT