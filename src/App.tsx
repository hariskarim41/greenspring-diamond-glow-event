import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Phone, CheckCircle, ChevronDown, ChevronUp, Sparkles, ArrowUpCircle, Star, Info, Gift, Users, Award } from 'lucide-react';

function App() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredTime: '',
    notes: ''
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [spotsLeft] = useState(12);
  const [isSticky, setIsSticky] = useState(false);
  
  // Refs for scroll animations
  const aboutRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  // For animation state tracking
  const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({
    about: false,
    offer: false,
    booking: false
  });

  // Calculate time until the event (April 8, 2025)
  useEffect(() => {
    const eventDate = new Date('April 8, 2025 09:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle scrolling effects
  useEffect(() => {
    const handleScroll = () => {
      // Scroll to top button visibility
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      // Calculate scroll progress for progress bar
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / fullHeight) * 100;
      setScrollProgress(scrolled);
      
      // Check if CTA should be sticky
      if (window.scrollY > 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      
      // Check if sections are visible for animations
      const checkVisibility = (ref: React.RefObject<HTMLElement>, key: string) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
          
          if (isVisible && !visibleSections[key]) {
            setVisibleSections(prev => ({...prev, [key]: true}));
          }
        }
      };
      
      checkVisibility(aboutRef, 'about');
      checkVisibility(offerRef, 'offer');
      checkVisibility(bookingRef, 'booking');
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for booking your Diamond Glow treatment! Our team will contact you within 24 hours to confirm your appointment.');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      question: "What should I expect during my Diamond Glow treatment?",
      answer: "During your Diamond Glow treatment, a handheld device with a diamond-tipped wand will gently exfoliate your skin while simultaneously extracting impurities and infusing customized serums. The treatment is relaxing and non-invasive, with most clients reporting a gentle suction sensation that's comfortable and refreshing."
    },
    {
      question: "How long does the treatment take?",
      answer: "A standard Diamond Glow facial treatment takes approximately 30 minutes from start to finish. Including consultation and post-treatment care discussion, you can expect to be with us for about 45-60 minutes total."
    },
    {
      question: "Is there any downtime after the treatment?",
      answer: "There is virtually no downtime with Diamond Glow treatments. Your skin may appear slightly flushed immediately after the treatment, similar to a light flush from exercise, but this typically subsides within a few hours. You can apply makeup and resume normal activities immediately."
    },
    {
      question: "How long do results last?",
      answer: "Many clients notice immediate improvements in skin texture, hydration, and radiance that last 1-2 weeks. For optimal and longer-lasting results, a series of treatments spaced 2-4 weeks apart is recommended, followed by monthly maintenance sessions."
    },
    {
      question: "Who is a good candidate for Diamond Glow?",
      answer: "Diamond Glow is suitable for almost all skin types and conditions. It's particularly effective for addressing dullness, fine lines, mild acne, clogged pores, light hyperpigmentation, and dehydrated skin. Those with active inflammatory acne, rosacea, or sunburn should wait until these conditions resolve before treatment."
    }
  ];

  const testimonials = [
    {
      text: "My skin has never looked so glowy and smooth! After just one Diamond Glow treatment, I saw immediate results. My makeup applies better and my complexion looks healthier overall.",
      author: "Jessica L., 34",
      rating: 5
    },
    {
      text: "I was skeptical at first, but the results were undeniable. The extraction process was so satisfying, and I couldn't believe how much brighter my skin looked immediately after. This is now a monthly must-have in my skincare routine.",
      author: "Michael T., 42",
      rating: 5
    },
    {
      text: "As someone with sensitive skin, I'm always cautious about new treatments. Diamond Glow was gentle yet effective. My redness decreased and my skin felt incredibly soft. The customized serum really made a difference for my skin concerns.",
      author: "Sophia R., 29",
      rating: 4
    }
  ];

  const benefits = [
    {
      title: "EXFOLIATES",
      description: "Diamond-tip precision removes dead skin cells",
      icon: <Sparkles className="h-12 w-12 text-[#efd0b1] mb-4" />
    },
    {
      title: "EXTRACTS",
      description: "Vacuum power removes impurities from pores",
      icon: <Award className="h-12 w-12 text-[#efd0b1] mb-4" />
    },
    {
      title: "INFUSES",
      description: "Delivers customized serums deep into skin",
      icon: <Gift className="h-12 w-12 text-[#efd0b1] mb-4" />
    }
  ];

  return (
    <div className="font-sans relative bg-[#2b3429] text-white">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#efd0b1] z-50 transition-all duration-300 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header className="bg-[#2b3429] shadow-md py-4 px-6 md:px-12 sticky top-0 z-40 border-b border-[#57655d]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Phone number on the left */}
          <a href="tel:5203650841" className="flex items-center text-[#efd0b1] font-semibold text-lg">
            <Phone className="mr-2 h-5 w-5" />
            520-365-0841
          </a>
          
          {/* Book consultation button on the right */}
          <button 
            onClick={() => scrollToSection('booking-form')}
            className="bg-[#efd0b1] hover:bg-[#e7c19d] text-[#2b3429] px-6 py-2.5 rounded-md shadow-lg font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#efd0b1]/20"
          >
            RESERVE YOUR SPOT →
          </button>
        </div>
      </header>

      {/* Hero Section with Parallax Effect */}
      <section className="relative bg-gradient-to-r from-[#57655d] to-[#2b3429] text-white py-14 md:py-20 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollProgress * 0.2}px)`
          }}
        />
        
        {/* Adding depth with overlays and shadows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b3429]/70 to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b3429]/70 to-transparent opacity-60"></div>
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#2b3429] to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2b3429] to-transparent"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <img
            src="https://dev2.brandrapdev.co/greenspringaesthetics/wp-content/uploads/2025/02/3-e1742308946541.png"
            alt="GreenSpring Medical Aesthetics Logo" 
            className="h-28 mx-auto mb-8 animate-fadeIn drop-shadow-2xl"
          />
          <div className="animate-fadeIn bg-[#2b3429]/40 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-[#efd0b1]/20">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#efd0b1] drop-shadow-[0_2px_8px_rgba(239,208,177,0.5)]">DIAMOND GLOW EVENT</h1>
            <h2 className="text-xl md:text-2xl mb-6">Reveal Your Most Radiant Skin</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Join us April 8th for a special one-day event featuring our revolutionary Diamond Glow treatment.
            </p>
          
            {/* Free Facial Badge */}
            <div className="bg-[#efd0b1] w-fit mx-auto px-6 py-3 rounded-full mb-8 animate-pulse shadow-[0_0_15px_rgba(239,208,177,0.7)]">
              <p className="font-bold text-[#2b3429] text-lg">FREE FACIAL ($195 VALUE)</p>
            </div>
            
            {/* Countdown Timer */}
            <div className="bg-[#2b3429]/70 p-6 rounded-lg w-fit mx-auto mb-8 backdrop-blur-sm border border-[#57655d] shadow-xl">
              <p className="text-xl font-semibold mb-3 text-[#efd0b1]">EVENT BEGINS IN:</p>
              <div className="flex justify-center gap-4">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-[#efd0b1] text-[#2b3429] w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold mb-1 shadow-[0_0_15px_rgba(239,208,177,0.6)]">
                      {item.value}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Limited Spots Indicator */}
            <div className="bg-[#57655d] w-fit mx-auto px-4 py-2 rounded-full mb-8 border border-[#efd0b1]/30">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-[#efd0b1]" />
                <p className="font-bold text-white">ONLY {spotsLeft} SPOTS REMAINING!</p>
              </div>
            </div>

            <button 
              onClick={() => scrollToSection('booking-form')} 
              className="bg-[#efd0b1] text-[#2b3429] hover:bg-[#e7c19d] font-bold text-lg px-8 py-3 rounded-md shadow-lg transform transition hover:scale-105 pulse-animation hover:shadow-[0_0_20px_rgba(239,208,177,0.8)]"
            >
              CLAIM YOUR FREE FACIAL
            </button>
          </div>
        </div>
      </section>

      {/* About Diamond Glow Section */}
      <section ref={aboutRef} className="py-12 md:py-16 px-6 bg-[#2b3429] relative border-t border-[#57655d]">
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#efd0b1] mb-4">WHAT IS DIAMOND GLOW?</h2>
            <h3 className="text-xl md:text-2xl text-center mb-8">3-IN-1 ADVANCED TREATMENT</h3>
            
            <div className="bg-[#57655d]/30 p-8 rounded-lg shadow-lg border border-[#efd0b1]/20 mb-12">
              <p className="text-lg text-center mb-8">
                Diamond Glow is a revolutionary skin resurfacing treatment that combines exfoliation, extraction, and infusion of condition-specific serums to improve skin health, function and appearance. This non-invasive treatment is more effective than microdermabrasion and delivers immediate results with no downtime.
              </p>
            
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="bg-[#2b3429]/50 p-6 rounded-lg text-center transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_0_25px_rgba(239,208,177,0.3)] group border border-[#efd0b1]/20"
                  >
                    <div className="flex justify-center">
                      {benefit.icon}
                    </div>
                    <h4 className="text-xl font-bold text-[#efd0b1] mb-2 group-hover:drop-shadow-[0_0_10px_rgba(239,208,177,0.7)]">{benefit.title}</h4>
                    <p className="text-white">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Diamond Glow Treatment" 
                  className="rounded-lg shadow-lg border border-[#efd0b1]/30 w-full h-auto object-cover hover:shadow-[0_0_25px_rgba(239,208,177,0.4)] transition-shadow duration-300"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold text-[#efd0b1] mb-4">WHY CHOOSE DIAMOND GLOW?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start transform transition-all hover:translate-x-2 duration-300 group">
                    <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(239,208,177,0.8)]" />
                    <span className="text-white group-hover:text-[#efd0b1]">Patented technology delivers superior results compared to traditional facials</span>
                  </li>
                  <li className="flex items-start transform transition-all hover:translate-x-2 duration-300 group">
                    <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(239,208,177,0.8)]" />
                    <span className="text-white group-hover:text-[#efd0b1]">Customizable treatment for all skin types and concerns</span>
                  </li>
                  <li className="flex items-start transform transition-all hover:translate-x-2 duration-300 group">
                    <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(239,208,177,0.8)]" />
                    <span className="text-white group-hover:text-[#efd0b1]">No downtime - return to normal activities immediately</span>
                  </li>
                  <li className="flex items-start transform transition-all hover:translate-x-2 duration-300 group">
                    <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(239,208,177,0.8)]" />
                    <span className="text-white group-hover:text-[#efd0b1]">Immediate visible results after just one treatment</span>
                  </li>
                  <li className="flex items-start transform transition-all hover:translate-x-2 duration-300 group">
                    <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(239,208,177,0.8)]" />
                    <span className="text-white group-hover:text-[#efd0b1]">Enhances product absorption for a more effective skincare routine</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section ref={offerRef} className="py-12 md:py-16 px-6 bg-[#2b3429] relative border-t border-[#57655d]">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 delay-300 ${visibleSections.offer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#efd0b1] mb-8">EXCLUSIVE EVENT OFFER</h2>
            
            <div className="bg-[#57655d] p-8 rounded-lg shadow-lg border border-[#efd0b1]/30 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-[#2b3429] rounded-full opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-[#2b3429] rounded-full opacity-20"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">FREE DIAMOND GLOW FACIAL</h3>
                
                <div className="inline-block bg-[#efd0b1] text-[#2b3429] px-6 py-3 rounded-lg text-xl font-bold mb-4 transform -rotate-3 shadow-lg">
                  <span className="line-through opacity-70 mr-2">$195</span>
                  <span>FREE</span>
                </div>
                
                <p className="text-white text-lg mb-6">
                  Experience the revolutionary Diamond Glow treatment at our exclusive one-day event.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#2b3429] p-4 rounded-lg border border-[#efd0b1]/20 flex flex-col items-center transition-transform hover:transform hover:scale-105">
                    <Calendar className="h-8 w-8 text-[#efd0b1] mb-2" />
                    <h4 className="font-semibold text-[#efd0b1]">DATE</h4>
                    <p>April 8th, 2025</p>
                  </div>
                  <div className="bg-[#2b3429] p-4 rounded-lg border border-[#efd0b1]/20 flex flex-col items-center transition-transform hover:transform hover:scale-105">
                    <Clock className="h-8 w-8 text-[#efd0b1] mb-2" />
                    <h4 className="font-semibold text-[#efd0b1]">TIME</h4>
                    <p>By appointment only</p>
                  </div>
                  <div className="bg-[#2b3429] p-4 rounded-lg border border-[#efd0b1]/20 flex flex-col items-center transition-transform hover:transform hover:scale-105">
                    <MapPin className="h-8 w-8 text-[#efd0b1] mb-2" />
                    <h4 className="font-semibold text-[#efd0b1]">LOCATION</h4>
                    <p>GreenSpring Aesthetics</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mb-8 text-[#efd0b1] animate-pulse">
                  <Users className="h-5 w-5 mr-2" />
                  <p className="font-bold">ONLY {spotsLeft} SPOTS REMAINING!</p>
                </div>
                
                <button 
                  onClick={() => scrollToSection('booking-form')}
                  className="bg-[#efd0b1] hover:bg-[#e7c19d] text-[#2b3429] font-bold text-lg px-8 py-3 rounded-md shadow-lg transform transition hover:scale-105 hover:shadow-[0_0_20px_rgba(239,208,177,0.7)]"
                >
                  CLAIM YOUR FREE FACIAL
                </button>
              </div>
            </div>
            
            {/* Additional Benefits */}
            <div className="mt-10 bg-[#2b3429] border border-[#efd0b1]/30 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center text-[#efd0b1] mb-4">EVENT INCLUDES</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Personalized skin assessment with our expert aestheticians</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Customized Diamond Glow treatment for your specific skin concerns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Special pricing on Diamond Glow product add-ons</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Complimentary skincare samples to enhance your results</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#efd0b1] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">20% discount on future Diamond Glow treatments booked during the event</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form with Animation */}
      <section ref={bookingRef} id="booking-form" className="py-12 md:py-16 px-6 bg-[#57655d] relative border-t border-[#2b3429]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#2b3429] rounded-full opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#2b3429] rounded-full opacity-30"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className={`transition-all duration-1000 delay-500 ${visibleSections.booking ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#efd0b1] mb-2">SECURE YOUR SPOT</h2>
            <p className="text-center text-white mb-2">Limited appointments available for this exclusive event</p>
            
            {/* Urgency indicator */}
            <div className="flex items-center justify-center mb-8 text-[#efd0b1]">
              <Clock className="h-5 w-5 mr-2" />
              <p className="font-bold">APRIL 8TH ONLY</p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-[#2b3429] p-8 rounded-lg shadow-md relative border border-[#efd0b1]/30">
              {/* Corner ribbon */}
              <div className="absolute -top-3 -right-3 bg-[#efd0b1] text-[#2b3429] py-1 px-6 rounded-sm shadow-lg transform rotate-6">
                <p className="font-bold text-sm">FREE ($195 VALUE)</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-[#efd0b1] font-medium mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#57655d]/50 border border-[#efd0b1]/30 rounded-md focus:ring-[#efd0b1] focus:border-[#efd0b1] transition-colors text-white placeholder-white/70 focus:shadow-[0_0_10px_rgba(239,208,177,0.5)]"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#efd0b1] font-medium mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#57655d]/50 border border-[#efd0b1]/30 rounded-md focus:ring-[#efd0b1] focus:border-[#efd0b1] transition-colors text-white placeholder-white/70 focus:shadow-[0_0_10px_rgba(239,208,177,0.5)]"
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-[#efd0b1] font-medium mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#57655d]/50 border border-[#efd0b1]/30 rounded-md focus:ring-[#efd0b1] focus:border-[#efd0b1] transition-colors text-white placeholder-white/70 focus:shadow-[0_0_10px_rgba(239,208,177,0.5)]"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="preferredTime" className="block text-[#efd0b1] font-medium mb-1">
                    Preferred Time on 4/8*
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#57655d]/50 border border-[#efd0b1]/30 rounded-md focus:ring-[#efd0b1] focus:border-[#efd0b1] transition-colors text-white focus:shadow-[0_0_10px_rgba(239,208,177,0.5)]"
                  >
                    <option value="">Select time</option>
                    <option value="Morning">Morning (9am-12pm)</option>
                    <option value="Afternoon">Afternoon (12pm-3pm)</option>
                    <option value="Evening">Evening (3pm-6pm)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-[#efd0b1] font-medium mb-1">
                    Special Notes or Questions
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#57655d]/50 border border-[#efd0b1]/30 rounded-md focus:ring-[#efd0b1] focus:border-[#efd0b1] transition-colors text-white placeholder-white/70 focus:shadow-[0_0_10px_rgba(239,208,177,0.5)]"
                    placeholder="Any specific skin concerns or questions?"
                  ></textarea>
                </div>
              </div>
              
              {/* Deposit notice */}
              <div className="mt-6 p-3 bg-[#57655d]/50 border border-[#efd0b1]/30 rounded-md flex items-start">
                <Info className="h-5 w-5 text-[#efd0b1] mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white">
                  <span className="font-semibold text-[#efd0b1]">Booking Note:</span> A $100 refundable deposit is required to secure your appointment. 
                  This deposit will be credited toward any products or services purchased on the day of your appointment or refunded in full if you attend your appointment.
                </p>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-[#efd0b1] hover:bg-[#e7c19d] text-[#2b3429] font-bold py-4 px-4 rounded-md shadow-sm transition-all relative overflow-hidden group hover:shadow-[0_0_20px_rgba(239,208,177,0.7)]"
                >
                  <span className="relative z-10 text-lg">RESERVE MY SPOT NOW</span>
                  <span className="absolute inset-0 bg-[#e7c19d] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </button>
              </div>
              
              <p className="mt-4 text-sm text-white text-center">
                By submitting this form, you agree to our <a href="#" className="text-[#efd0b1] underline">privacy policy</a>. 
                Our team will contact you within 24 hours to confirm your appointment.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section with Animated Accordion */}
      <section className="py-12 md:py-16 px-6 bg-[#2b3429] border-t border-[#57655d]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#efd0b1] mb-10">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-[#57655d] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:border-[#efd0b1]/30 hover:shadow-[0_0_15px_rgba(239,208,177,0.2)]">
                <button
                  className="w-full px-6 py-4 text-left bg-[#2b3429] hover:bg-[#57655d]/30 flex justify-between items-center"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  {activeAccordion === index ? (
                    <ChevronUp className="h-5 w-5 text-[#efd0b1] drop-shadow-[0_0_4px_rgba(239,208,177,0.7)]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#efd0b1] drop-shadow-[0_0_4px_rgba(239,208,177,0.7)]" />
                  )}
                </button>
                <div 
                  className="overflow-hidden transition-all duration-300"
                  style={{ 
                    maxHeight: activeAccordion === index ? '400px' : '0',
                  }}
                >
                  <div className="px-6 py-4 bg-[#57655d]/20 border-t border-[#efd0b1]/20">
                    <p className="text-white">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Questions */}
          <div className="mt-10 text-center">
            <p className="text-white mb-2">Have additional questions about Diamond Glow?</p>
            <a 
              href="tel:5203650841" 
              className="inline-flex items-center text-[#efd0b1] hover:text-[#e7c19d] hover:drop-shadow-[0_0_8px_rgba(239,208,177,0.8)] transition-all"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call us at 520-365-0841
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2b3429] text-white py-10 px-6 border-t border-[#57655d]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <img 
              src="https://dev2.brandrapdev.co/greenspringaesthetics/wp-content/uploads/2025/02/3-e1742308946541.png"
              alt="GreenSpring Medical Aesthetics Logo" 
              className="h-16 mx-auto mb-6 drop-shadow-xl"
            />
            <h3 className="text-xl font-semibold mb-4 text-[#efd0b1]">GreenSpring Medical Aesthetics</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#efd0b1]" />
                <p>Tucson: 6296 E. Grant Rd. #130, Tucson, AZ 85712</p>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#efd0b1]" />
                <p>Oro Valley: 10509 N. Oracle Rd. #141, Oro Valley, AZ 85737</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <Phone className="h-5 w-5 mr-2 text-[#efd0b1]" />
              <a href="tel:5203650841" className="hover:text-[#efd0b1] transition-colors hover:drop-shadow-[0_0_8px_rgba(239,208,177,0.7)]">
                520-365-0841
              </a>
            </div>
          </div>
          <div className="text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} GreenSpring Medical Aesthetics. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Sticky Book Now Button */}
      {isSticky && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <button
            onClick={() => scrollToSection('booking-form')}
            className="bg-[#efd0b1] hover:bg-[#e7c19d] text-[#2b3429] font-bold px-6 py-3 rounded-full shadow-lg flex items-center hover:shadow-[0_0_20px_rgba(239,208,177,0.7)]"
          >
            CLAIM FREE FACIAL <span className="ml-2 bg-[#2b3429] text-[#efd0b1] rounded-full px-2 py-1 text-xs">$195 VALUE</span>
          </button>
        </div>
      )}
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#efd0b1] text-[#2b3429] p-3 rounded-full shadow-lg hover:bg-[#e7c19d] transition-colors z-40 hover:shadow-[0_0_15px_rgba(239,208,177,0.7)]"
        >
          <ArrowUpCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

// Missing ChevronLeft and ChevronRight icons
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default App;