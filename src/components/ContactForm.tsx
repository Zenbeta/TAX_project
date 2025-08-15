
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const { toast } = useToast();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // return (
  //   <section className="py-20 bg-gray-50">
  //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  //       <div className="text-center mb-12">
  //         <h2 className="font-heading font-bold text-4xl text-primary-900 mb-4">
  //           Get In Touch
  //         </h2>
  //         <p className="text-xl text-gray-600">
  //           Ready to optimize your finances? Let's discuss your needs.
  //         </p>
  //       </div>

  //       <Card className="shadow-xl border-0">
  //         <CardHeader>
  //           <CardTitle className="text-center text-2xl text-primary-900">
  //             Schedule Your Free Consultation
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <form onSubmit={handleSubmit} className="space-y-6">
  //             <div className="grid md:grid-cols-2 gap-6">
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700 mb-2">
  //                   Full Name *
  //                 </label>
  //                 <Input
  //                   type="text"
  //                   name="name"
  //                   value={formData.name}
  //                   onChange={handleChange}
  //                   required
  //                   className="w-full"
  //                   placeholder="Your full name"
  //                 />
  //               </div>
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700 mb-2">
  //                   Email Address *
  //                 </label>
  //                 <Input
  //                   type="email"
  //                   name="email"
  //                   value={formData.email}
  //                   onChange={handleChange}
  //                   required
  //                   className="w-full"
  //                   placeholder="your@email.com"
  //                 />
  //               </div>
  //             </div>

  //             <div className="grid md:grid-cols-2 gap-6">
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700 mb-2">
  //                   Phone Number
  //                 </label>
  //                 <Input
  //                   type="tel"
  //                   name="phone"
  //                   value={formData.phone}
  //                   onChange={handleChange}
  //                   className="w-full"
  //                   placeholder="(555) 123-4567"
  //                 />
  //               </div>
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700 mb-2">
  //                   Company Name
  //                 </label>
  //                 <Input
  //                   type="text"
  //                   name="company"
  //                   value={formData.company}
  //                   onChange={handleChange}
  //                   className="w-full"
  //                   placeholder="Your company name"
  //                 />
  //               </div>
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-2">
  //                 Service Interest
  //               </label>
  //               <select
  //                 name="service"
  //                 value={formData.service}
  //                 onChange={handleChange}
  //                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  //               >
  //                 <option value="">Select a service</option>
  //                 <option value="tax-services">Tax Services</option>
  //                 <option value="accounting">Accounting Services</option>
  //                 <option value="business-consulting">Business Consulting</option>
  //                 <option value="software-implementation">Software Implementation</option>
  //                 <option value="cfo-services">External CFO Services</option>
  //                 <option value="administrative-services">Administrative Services</option>
  //                 <option value="other">Other</option>
  //               </select>
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-2">
  //                 Message
  //               </label>
  //               <Textarea
  //                 name="message"
  //                 value={formData.message}
  //                 onChange={handleChange}
  //                 rows={4}
  //                 className="w-full"
  //                 placeholder="Tell us about your needs..."
  //               />
  //             </div>

  //             <Button 
  //               type="submit" 
  //               className="w-full bg-primary-900 hover:bg-primary-800 text-white text-lg py-3"
  //             >
  //               Send Message
  //             </Button>
  //           </form>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </section>
  // );
};

export default ContactForm;
