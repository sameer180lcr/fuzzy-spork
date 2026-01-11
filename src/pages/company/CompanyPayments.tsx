import { CreditCard, Download, Plus, ArrowRight, Check, X, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Plan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  current?: boolean;
};

type Transaction = {
  id: string;
  invoice: string;
  date: string;
  description: string;
  paymentMethod: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
};

import { useEffect, useState } from 'react';

const CompanyPayments = () => {
  const [jobCount, setJobCount] = useState(0);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        const data = await response.json();
        setJobCount(data.length);
        setFeaturedCount(data.filter((j: any) => j.featuredListing).length);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$0',
      description: 'Perfect for small teams and startups',
      features: [
        '3 active job postings',
        'Basic applicant tracking',
        'Email support',
        'Standard job visibility',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$99',
      description: 'Best for growing businesses',
      features: [
        'Unlimited job postings',
        'Advanced applicant tracking',
        'Featured listings',
        'Priority support',
        'Analytics dashboard',
        'Custom branding',
      ],
      popular: true,
      current: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299',
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Premium',
        'Dedicated account manager',
        'API access',
        'Custom integrations',
        'SSO authentication',
        'SLA guarantee',
      ],
    },
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      invoice: 'INV-001',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Premium Plan - Monthly',
      paymentMethod: 'Visa **** 4242',
      amount: '$99.00',
      status: 'paid',
    },
    {
      id: '2',
      invoice: 'INV-002',
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Job Boost - Senior Developer',
      paymentMethod: 'Visa **** 4242',
      amount: '$29.00',
      status: 'paid',
    },
    {
      id: '3',
      invoice: 'INV-003',
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Featured Listing - Product Designer',
      paymentMethod: 'Visa **** 4242',
      amount: '$49.00',
      status: 'paid',
    },
  ];

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Payments & Billing</h1>
        <p className="text-gray-500">Manage your subscription and payment methods</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium">Total Spent</CardDescription>
            <CardTitle className="text-2xl">
              ${transactions.reduce((acc, t) => acc + parseFloat(t.amount.replace('$', '')), 0).toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium">Current Plan</CardDescription>
            <CardTitle className="text-2xl">Premium</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium">Next Billing</CardDescription>
            <CardTitle className="text-2xl">
              {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium">Invoices</CardDescription>
            <CardTitle className="text-2xl">{transactions.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Payment Method */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Update your billing details and address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-2 rounded-md">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                    Default
                  </Badge>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Mastercard ending in 8888</p>
                      <p className="text-sm text-gray-500">Expires 08/28</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Set Default
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Billing Address</h3>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold">{localStorage.getItem("userName") || "John Doe"}</p>
                    <p>Talent Forge HQ</p>
                    <p>123 Innovation Drive</p>
                    <p>San Francisco, CA 94105</p>
                    <p>United States</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Update Address
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>Your current usage for this billing period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Job Postings</span>
                  <span className="font-medium">{jobCount} / Unlimited</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min((jobCount / 20) * 100, 100)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Team Members</span>
                  <span className="font-medium">1 / 10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Featured Listings</span>
                  <span className="font-medium">{featuredCount} / 5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(featuredCount / 5) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>API Calls</span>
                  <span className="font-medium">1,420 / 10,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '14.2%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden ${plan.popular ? 'border-blue-500 ring-2 ring-blue-200' : ''
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-bl-md">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">
                    {plan.id === 'starter' ? 'Free forever' : '/month'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full">
                    {plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
                  </Button>
                )}
                {plan.id === 'enterprise' && (
                  <p className="text-xs text-center mt-2 text-gray-500">
                    Custom solutions available for large teams
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.invoice}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default CompanyPayments;
