'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';

export default function Dashboard() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data: contactData } = await supabase.from('contacts').select('*');
    const { data: campaignData } = await supabase.from('campaigns').select('*');

    setContacts(contactData || []);
    setCampaigns(campaignData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  const showOnboarding = contacts.length === 0 && campaigns.length === 0;

  return (
    <main className="min-h-screen pt-24 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {showOnboarding ? (
          <div className="glass-effect p-8 rounded-xl text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome! Let’s get started</h2>
            <p className="text-white/70 mb-6">
              To start using your AI-powered CRM, complete the steps below.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/contacts">
                <div className="feature-item p-6 cursor-pointer hover:shadow-lg">
                  <h3 className="font-bold text-xl mb-2">Add Contacts</h3>
                  <p className="text-white/60 text-sm">Import or manually create your contacts list.</p>
                </div>
              </Link>
              <Link href="/dashboard/campaigns/create">
                <div className="feature-item p-6 cursor-pointer hover:shadow-lg">
                  <h3 className="font-bold text-xl mb-2">Create Campaign</h3>
                  <p className="text-white/60 text-sm">Let AI help you draft your first email flow.</p>
                </div>
              </Link>
              <Link href="/dashboard">
                <div className="feature-item p-6 cursor-pointer hover:shadow-lg">
                  <h3 className="font-bold text-xl mb-2">Explore the Dashboard</h3>
                  <p className="text-white/60 text-sm">See your data in one place as it grows.</p>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Contact Table */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Contacts</h2>
                <Link href="/dashboard/contacts" className="text-blue-400 hover:underline text-sm">
                  View All
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                {contacts.length === 0 ? (
                  <p className="text-white/60">No contacts yet.</p>
                ) : (
                  <ul className="divide-y divide-white/10 text-sm">
                    {contacts.slice(0, 5).map((c) => (
                      <li key={c.id} className="py-2 flex justify-between">
                        <span>{c.first_name} {c.last_name}</span>
                        <span className="text-white/60">{c.email}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* Campaign Table */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Campaigns</h2>
                <Link href="/dashboard/campaigns" className="text-blue-400 hover:underline text-sm">
                  View All
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                {campaigns.length === 0 ? (
                  <p className="text-white/60">No campaigns created yet.</p>
                ) : (
                  <ul className="divide-y divide-white/10 text-sm">
                    {campaigns.slice(0, 5).map((c) => (
                      <li key={c.id} className="py-2">
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-white/60">{c.subject}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
