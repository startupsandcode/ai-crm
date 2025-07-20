'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';

type Campaign = {
  id: string;
  title: string;
  subject: string;
  body: string;
  created_at: string;
};

export default function CampaignListPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCampaigns(data);
    } else {
      alert('Error fetching campaigns');
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <main className="min-h-screen pt-24 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Campaigns</h1>
          <Link href="/dashboard/campaigns/create" className="btn-primary px-4 py-2 rounded">
            + New Campaign
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <p className="text-white/60">No campaigns yet. Click “New Campaign” to create one.</p>
        ) : (
          <ul className="space-y-4">
            {campaigns.map((c) => (
              <li key={c.id} className="feature-item p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{c.title}</h2>
                    <p className="text-blue-400 text-sm mb-2">{c.subject}</p>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {c.body}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/campaigns/${c.id}`}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
