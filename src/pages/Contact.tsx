import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageCircle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const { toast } = useToast();

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
 
   try {
     const plainData = JSON.stringify({
       formType: "contactForm",
       ...formData
     });
 
     const response = await fetch( 'https://script.google.com/macros/s/AKfycbz6CggoQmNdhL-z9HeHW2i8r1YOf6nbVscQIwFyAlbCR-Dzm69yOpPelpvzttkIm5gBXg/exec', {
       method: 'POST',
       headers: {
         'Content-Type': 'text/plain;charset=utf-8'  // ✅ No preflight triggered!
       },
       body: plainData
     });
 const responseText = await response.text();
 console.log("Raw Response:", responseText);
 
 let result;
 try {
   result = JSON.parse(responseText);
 } catch (err) {
   console.error("Failed to parse JSON:", err);
   toast({
     title: "Error!",
     description: "Invalid server response. Check console.",
   });
   return;
 }
 
 
     if (result.result === 'success') {
       toast({
         title: "Message Sent!",
         description: "We'll get back to you within 24 hours.",
       });
       setFormData({
         name: '',
         email: '',
         phone: '',
         company: '',
         service: '',
         message: ''
       });
     } else {
       toast({
         title: "Error!",
         description: "Failed to submit form. Try again.",
       });
     }
   } catch (error) {
     console.error('Submission Error:', error);
     toast({
       title: "Network Error!",
       description: "Unable to submit form. Please try again later.",
     });
   }
 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      content: '(475) 529-6839',
      description: 'Call us during business hours'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'protaxbykc@gmail.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      content: 'Chat Assistant',
      description: 'Available 24/7 on our website'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: '123 Main Street, Kansas City, MO 64111',
      description: 'Visit us by appointment'
    }
    // {
    //   icon: MapPin,
    //   title: 'Location',
    //   content: 'Connecticut, USA',
    //   description: 'Serving clients nationwide'
    // },
    // {
    //   icon: Users,
    //   title: 'Social Media',
    //   content: '@ProTaxKC',
    //   description: 'Connect with us on LinkedIn'
    // }
  ];

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We provide comprehensive tax services, accounting, business consulting, and external CFO services for businesses and individuals.'
    },
    {
      question: 'How much do your services cost?',
      answer: 'Our pricing varies based on the complexity and scope of services needed. We offer free consultations to discuss your specific needs and provide transparent pricing.'
    },
    {
      question: 'Do you work with small businesses?',
      answer: 'Absolutely! We specialize in working with entrepreneurial businesses of all sizes, from startups to established companies.'
    },
    {
      question: 'Can you help with IRS issues?',
      answer: 'Yes, we provide tax problem consulting and can help resolve IRS and state tax inquiries and issues.'
    },
    {
      question: 'Do you offer virtual consultations?',
      answer: 'Yes, we offer both in-person and virtual consultations to accommodate your preferences and schedule.'
    },
    {
      question: 'How quickly can you respond to urgent matters?',
      answer: 'For urgent tax or financial matters, we typically respond within 4-6 hours during business hours. Contact us directly for immediate assistance.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-secondary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-5xl mb-6">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ready to take control of your finances? Get in touch with our expert team 
            and discover how we can help you achieve your financial goals.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-primary-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Multiple ways to reach us - choose what works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <method.icon className="text-primary-900" size={32} />
                  </div>
                  <h3 className="font-semibold text-xl text-primary-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-900 font-medium mb-2">{method.content}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Hours & Location */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Clock className="text-primary-900 mr-3" size={32} />
                  <h3 className="font-heading font-bold text-2xl text-primary-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Monday - Friday</span>
                    <span className="text-primary-900 font-semibold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Saturday</span>
                    <span className="text-primary-900 font-semibold">By Appointment</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> During tax season (January - April), we offer extended hours and weekend appointments to better serve our clients.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <MapPin className="text-primary-900 mr-3" size={32} />
                  <h3 className="font-heading font-bold text-2xl text-primary-900">
                    Visit Our Office
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                    <p className="text-gray-700">
                      123 Main Street<br />
                      Suite 200<br />
                      Kansas City, MO 64111
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Parking</h4>
                    <p className="text-gray-700">
                      Free parking available in the building garage. 
                      Visitor spaces are located on the second level.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Public Transit</h4>
                    <p className="text-gray-700">
                      Conveniently located near bus routes 15 and 23. 
                      The Main Street Trolley stops directly in front of the building.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Moved Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl text-primary-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to optimize your finances? Let's discuss your needs.
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-primary-900">
                Schedule Your Free Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="tax-services">Tax Services</option>
                    <option value="accounting">Accounting Services</option>
                    <option value="business-consulting">Business Consulting</option>
                    <option value="software-implementation">Software Implementation</option>
                    <option value="cfo-services">External CFO Services</option>
                    <option value="administrative-services">Administrative Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary-900 hover:bg-primary-800 text-white text-lg py-3"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section - Moved after Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-primary-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see your question answered?
            </p>
            <Card className="inline-block bg-primary-50 border-primary-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Users className="text-primary-900" size={24} />
                  <span className="text-primary-900 font-medium">
                    Contact us directly for personalized assistance
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
