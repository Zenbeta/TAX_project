
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Calculator, Briefcase, Users, CheckCircle, ArrowRight } from 'lucide-react';

const Services = () => {
  const detailedServices = [
    {
      icon: FileText,
      title: 'Tax Services',
      description: 'Comprehensive tax solutions designed to minimize your liability and maximize your refunds.',
      services: [
        'Individual Tax Preparation',
        'Business Tax Filing',
        'Tax Planning & Strategy',
        'IRS Problem Resolution',
        'Tax Amendment Services',
        'Multi-State Tax Filing',
        'Estate & Trust Tax Returns',
        'Quarterly Tax Estimates'
      ],
      benefits: [
        'Maximize deductions and credits',
        'Ensure compliance with tax laws',
        'Strategic tax planning year-round',
        'Expert IRS representation'
      ]
    },
    {
      icon: Calculator,
      title: 'Accounting Services',
      description: 'Complete financial management to keep your books accurate and your business running smoothly.',
      services: [
        'Monthly Bookkeeping',
        'Financial Statement Preparation',
        'Accounts Payable/Receivable',
        'Bank Reconciliation',
        'Payroll Processing',
        'Sales Tax Management',
        '1099 & W2 Preparation',
        'Property Income Reports'
      ],
      benefits: [
        'Real-time financial insights',
        'Improved cash flow management',
        'Accurate financial reporting',
        'Streamlined operations'
      ]
    },
    {
      icon: Briefcase,
      title: 'Business Consulting',
      description: 'Strategic guidance to help your business grow and thrive in competitive markets.',
      services: [
        'Business Plan Development',
        'Financial Forecasting',
        'Cash Flow Analysis',
        'Budget Creation & Management',
        'Performance Metrics',
        'Process Improvement',
        'Third-Party Reports',
        'Strategic Planning'
      ],
      benefits: [
        'Data-driven decision making',
        'Improved profitability',
        'Enhanced operational efficiency',
        'Strategic growth planning'
      ]
    },
    {
      icon: Users,
      title: 'External CFO Services',
      description: 'Part-time CFO expertise without the full-time cost, perfect for growing businesses.',
      services: [
        'Financial Strategy Development',
        'Board Meeting Preparation',
        'Investor Relations Support',
        'Risk Management',
        'Capital Structure Planning',
        'M&A Support',
        'Financial Controls Implementation',
        'Executive Reporting'
      ],
      benefits: [
        'C-level financial expertise',
        'Cost-effective solution',
        'Strategic financial leadership',
        'Enhanced investor confidence'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-secondary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-5xl mb-6">Our Services</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive financial solutions tailored to your business needs. 
            From tax preparation to strategic CFO services, we've got you covered.
          </p>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {detailedServices.map((service, index) => (
              <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <service.icon className="text-primary-900" size={32} />
                  </div>
                  <h2 className="font-heading font-bold text-3xl text-primary-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-xl text-primary-900 mb-4">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center">
                          <CheckCircle className="text-secondary-600 mr-3" size={20} />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/booking">
                    <Button className="bg-primary-900 hover:bg-primary-800 text-white">
                      Get Started
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="shadow-xl border-0">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary-900">
                        What's Included:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.services.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-secondary-600 mr-3 mt-1">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl text-primary-900 mb-6">
            Ready to Optimize Your Finances?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule a free consultation to discuss your specific needs and learn how we can help your business thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="bg-primary-900 hover:bg-primary-800 text-white">
                Schedule Free Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Services;
