'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Heart, Users, Phone, Award, ChevronDown, Home, Briefcase, Book, Coffee, Menu, X, Clock, ArrowRight, Gift, Star } from 'lucide-react'
import Image from 'next/image'

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index])
        setIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [index, text])

  return <span>{displayText}</span>
}

const Section = ({ children, id = '' }: { children: React.ReactNode; id?: string }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.section
      id={id}
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5, delay: 0.3 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      className="py-12 md:py-16"
    >
      {children}
    </motion.section>
  )
}

const springAnimation = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 300, damping: 10 }
}

const StepArrow = () => (
  <svg className="w-16 h-16 text-purple-400 mx-auto my-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const stepsRef = useRef<HTMLDivElement>(null)

  const scrollToSteps = () => {
    stepsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              StreetGuardian
            </Link>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-md">
                {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
              </button>
            </div>
            <ul className="hidden md:flex space-x-6">
              {['About', 'Services', 'Contact', 'Login'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent transition-all duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white shadow-md"
            >
              <ul className="py-2">
                {['About', 'Services', 'Contact', 'Login'].map((item) => (
                  <li key={item} className="px-4 py-2">
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="block text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <Section>
          <div className="container mx-auto px-4 pt-20 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-4 rounded-3xl shadow-xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <TypewriterEffect text="Welcome to StreetGuardian" />
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Empowering communities to support those in need
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.div whileHover={springAnimation}>
                  <Button size="lg" className="w-full sm:w-auto bg-white text-purple-600 hover:bg-purple-100">
                    Get Started
                  </Button>
                </motion.div>
                <motion.div whileHover={springAnimation}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/20" onClick={scrollToSteps}>
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mt-8"
          >
            <ChevronDown size={32} className="text-purple-600" />
          </motion.div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-4">
                  At StreetGuardian, we believe that everyone deserves a safe place to call home. Our mission is to bridge the gap between those experiencing homelessness and the resources they need to rebuild their lives.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Through innovative technology and compassionate community engagement, we aim to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide immediate assistance to those in crisis</li>
                  <li>Connect individuals with long-term support and housing solutions</li>
                  <li>Empower communities to take an active role in addressing homelessness</li>
                  <li>Advocate for systemic changes to prevent homelessness</li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Community support illustration"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">How StreetGuardian Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: 'Locate', description: 'Identify individuals in need of assistance through our user-friendly app' },
                { icon: Heart, title: 'Connect', description: 'Link them with appropriate support services tailored to their specific needs' },
                { icon: Users, title: 'Support', description: 'Provide ongoing community care and resources for sustainable recovery' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md"
                  whileHover={springAnimation}
                >
                  <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-3 rounded-full mb-4">
                    <item.icon size={32} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="steps" ref={stepsRef}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Step-by-Step Approach</h2>
            <div className="space-y-8">
              {[
                { step: 1, title: 'Report', description: 'Users can report individuals in need through our easy-to-use mobile app or website.', icon: Phone },
                { step: 2, title: 'Assess', description: 'Our trained team quickly assesses the situation and determines the most appropriate course of action.', icon: Briefcase },
                { step: 3, title: 'Connect', description: 'We connect the individual with nearby shelters, healthcare providers, or other relevant support services.', icon: MapPin },
                { step: 4, title: 'Follow-up', description: 'Our team conducts regular follow-ups to ensure the individual is receiving the necessary support and care.', icon: Clock },
                { step: 5, title: 'Community Engagement', description: 'We involve local communities in providing long-term support and reintegration assistance.', icon: Users }
              ].map((item, index) => (
                <div key={index}>
                  <motion.div
                    className="flex items-center bg-white p-6 rounded-lg shadow-md"
                    whileHover={springAnimation}
                  >
                    <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-4 rounded-full mr-6">
                      <item.icon size={32} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Step {item.step}: {item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                  {index < 4 && <StepArrow />}
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Services We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Home, title: 'Emergency Shelter Locator', description: 'Find nearby shelters with real-time availability and instant booking options' },
                { icon: Book, title: 'Resource Directory', description: 'Comprehensive list of local support services, including food banks, job training, and healthcare' },
                { icon: Users, title: 'Community Outreach Programs', description: 'Volunteer opportunities and community-led initiatives to support those in need' },
                { icon: Phone, title: 'Mental Health Support', description: 'Connect with mental health professionals and access online counseling services' },
                { icon: Coffee, title: 'Meal Services', description: 'Locate free meal services and food distribution centers in your area' },
                { icon: Briefcase, title: 'Job Placement Assistance', description: 'Access job listings, resume building tools, and career counseling services' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex items-start"
                  whileHover={springAnimation}
                >
                  <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-3 rounded-full mr-4 flex-shrink-0">
                    <item.icon size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Make a Difference Today</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
              Join our community of compassionate individuals working together to support those experiencing homelessness. Your involvement can change lives and create lasting impact in your community.
            </p>
            <motion.div whileHover={springAnimation} className="inline-block">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Volunteer Now</Button>
            </motion.div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'John D.', story: 'Found stable housing and employment through StreetGuardian\'s network. Now works as a peer support specialist.', icon: Home },
                { name: 'Sarah M.', story: 'Reconnected with family and accessed mental health support. Currently pursuing a degree in social work.', icon: Heart },
                { name: 'Michael R.', story: 'Received medical care and transitioned to long-term housing. Now volunteers at a local shelter.', icon: Briefcase }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  whileHover={springAnimation}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-2 rounded-full mr-3">
                      <item.icon size={24} className="text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{item.name}</h3>
                  </div>
                  <p className="text-gray-600">{item.story}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '1000+', description: 'Individuals Helped', icon: Users },
                { number: '50+', description: 'Partner Organizations', icon: Briefcase },
                { number: '5000+', description: 'Volunteer Hours', icon: Clock },
                { number: '20+', description: 'Cities Served', icon: MapPin }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                  whileHover={springAnimation}
                >
                  <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-3 rounded-full inline-block mb-4">
                    <item.icon size={32} className="text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{item.number}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Rewards Program</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Earn Points, Make a Difference</h3>
                  <p className="text-gray-600 mb-4">
                    Our rewards program recognizes and incentivizes your contributions to the community. Earn points for various activities and redeem them for exclusive benefits or donate them to causes you care about.
                  </p>
                  <ul className="space-y-2">
                    {[
                      { text: 'Volunteer hours', icon: Clock },
                      { text: 'Donations', icon: Gift },
                      { text: 'Referrals', icon: Users },
                      { text: 'Community engagement', icon: Heart }
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <item.icon size={20} className="text-purple-600 mr-2" />
                        <span className="text-gray-600">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Rewards program illustration"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full">
                    <Star size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { question: 'How can I volunteer?', answer: 'Sign up through our website or contact our volunteer coordinator for various opportunities.' },
                { question: 'What donations do you accept?', answer: 'We accept monetary donations, clothing, non-perishable food, and hygiene products.' },
                { question: 'How do you protect user privacy?', answer: 'We use encryption and strict data protection policies to safeguard all user information.' },
                { question: 'Can businesses partner with you?', answer: 'Yes! We offer partnership programs for businesses looking to make a social impact.' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  whileHover={springAnimation}
                >
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Join Our Community</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg mb-6 text-center text-gray-600">
                Stay updated with our latest initiatives, success stories, and volunteer opportunities. Together, we can make a lasting difference in the lives of those experiencing homelessness.
              </p>
              <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <motion.div whileHover={springAnimation}>
                  <Button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Subscribe
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center"
                  whileHover={springAnimation}
                >
                  <Image
                    src={`/placeholder.svg?height=100&width=200`}
                    alt={`Partner ${item}`}
                    width={200}
                    height={100}
                    className="max-w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <footer className="bg-gradient-to-r from-purple-800 to-pink-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">StreetGuardian</h3>
              <p className="text-purple-200">Empowering communities to support those in need</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About', 'Services', 'Contact', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-purple-200 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-purple-200 not-italic">
                <p>123 Compassion Street</p>
                <p>Kindness City, KC 12345</p>
                <p>contact@streetguardian.org</p>
              </address>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((item) => (
                  <Link key={item} href="#" className="text-purple-200 hover:text-white transition-colors duration-200">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-700 text-center text-purple-200">
            <p>&copy; {new Date().getFullYear()} StreetGuardian. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}